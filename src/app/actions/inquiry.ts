"use server";

import {createHmac} from "crypto";
import {Resend} from "resend";
import {z} from "zod";

const inquirySchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(10),
  source: z.string().optional(),
  locale: z.string().optional()
});

type InquiryData = z.infer<typeof inquirySchema> & {
  submittedAt: string;
};

export type InquiryState = {
  success: boolean;
  messageKey?: "validation" | "success" | "error";
};

const INQUIRY_TO = "qianhao001@toponelog.com";
const INQUIRY_FROM = "inquiry@qdworking.com";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitInquiry(_: InquiryState, formData: FormData): Promise<InquiryState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = inquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      messageKey: "validation"
    };
  }

  const inquiry: InquiryData = {
    ...parsed.data,
    submittedAt: new Date().toISOString()
  };

  if (!isRealDeliveryConfigured()) {
    console.log("[inquiry:mock]", inquiry);
    return {
      success: true,
      messageKey: "success"
    };
  }

  try {
    // await（不 void）——避免 Vercel function return 后截断 webhook
    await sendLeadNotifications(inquiry);
    return {
      success: true,
      messageKey: "success"
    };
  } catch (error) {
    console.error("[inquiry:error]", error);
    return {
      success: false,
      messageKey: "error"
    };
  }
}

function isRealDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

async function sendLeadNotifications(inquiry: InquiryData) {
  const [emailResult, botResult] = await Promise.allSettled([
    sendEmailNotification(inquiry),
    sendFeishuBotNotification(inquiry)
  ]);

  if (emailResult.status === "rejected") {
    console.error("[inquiry:email:error]", emailResult.reason);
    throw emailResult.reason;
  }
  if (botResult.status === "rejected") {
    console.error("[inquiry:bot:error]", botResult.reason);
  }
}

async function sendEmailNotification(inquiry: InquiryData) {
  if (!resend) return;

  await resend.emails.send({
    from: INQUIRY_FROM,
    to: INQUIRY_TO,
    subject: `[TopOne Logistics] New freight inquiry - ${inquiry.company || inquiry.name}`,
    text: formatInquiryText(inquiry)
  });
}

async function sendFeishuBotNotification(inquiry: InquiryData) {
  const webhook = process.env.FEISHU_BOT_WEBHOOK_URL;
  if (!webhook) return;

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const secret = process.env.FEISHU_BOT_SECRET;
  const sign = secret ? buildFeishuBotSign(timestamp, secret) : undefined;

  const response = await fetch(webhook, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      ...(secret ? {timestamp, sign} : {}),
      msg_type: "text",
      content: {
        text: ["New freight inquiry", "", formatInquiryText(inquiry)].join("\n")
      }
    })
  });

  const result = (await response.json().catch(() => null)) as {code?: number; msg?: string} | null;
  if (!response.ok || (result && typeof result.code === "number" && result.code !== 0)) {
    throw new Error(`Feishu bot failed: ${result?.msg || response.statusText}`);
  }
}

function buildFeishuBotSign(timestamp: string, secret: string) {
  return createHmac("sha256", `${timestamp}\n${secret}`).update("").digest("base64");
}

function formatInquiryText(inquiry: InquiryData) {
  return [
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company || "Not provided"}`,
    `Email: ${inquiry.email}`,
    `Source: ${inquiry.source || "website"}`,
    `Locale: ${inquiry.locale || "en"}`,
    `Submitted at: ${inquiry.submittedAt}`,
    "",
    inquiry.message
  ].join("\n");
}
