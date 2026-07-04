"use server";

import {createHmac} from "crypto";
import nodemailer from "nodemailer";
import {z} from "zod";

const inquirySchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  country: z.string().min(2),
  whatsapp: z.string().optional(),
  originPort: z.string().min(2),
  destinationPort: z.string().min(2),
  cargoType: z.string().min(2),
  volume: z.string().optional(),
  expectedTransit: z.string().optional(),
  notes: z.string().optional(),
  source: z.string().optional()
});

type InquiryData = z.infer<typeof inquirySchema> & {
  submittedAt: string;
};

export type InquiryState = {
  success: boolean;
  message: string;
};

export async function submitInquiry(_: InquiryState, formData: FormData): Promise<InquiryState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = inquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please complete the required inquiry fields and use a valid email address."
    };
  }

  const inquiry: InquiryData = {
    ...parsed.data,
    submittedAt: new Date().toISOString()
  };

  // TODO: 客户提供 FEISHU_*/SMTP_* 环境变量后自动接通 3 路
  if (!isRealDeliveryConfigured()) {
    console.log("[inquiry:mock]", inquiry);
    return {
      success: true,
      message: "Your inquiry has been received. This site is currently in notification mock mode."
    };
  }

  const [feishuResult, emailResult, botResult] = await Promise.allSettled([
    writeToFeishuBitable(inquiry),
    sendEmailNotification(inquiry),
    sendFeishuBotNotification(inquiry)
  ]);

  if (feishuResult.status === "rejected") {
    console.error("[inquiry:feishu:error]", feishuResult.reason);
    return {
      success: false,
      message: "We could not submit your inquiry. Please try again or email us."
    };
  }

  if (emailResult.status === "rejected") {
    console.error("[inquiry:email:error]", emailResult.reason);
  }
  if (botResult.status === "rejected") {
    console.error("[inquiry:bot:error]", botResult.reason);
  }

  return {
    success: true,
    message: "Your inquiry has been received. Our team will review it and reply soon."
  };
}

function isRealDeliveryConfigured() {
  return Boolean(
    process.env.FEISHU_APP_ID &&
      process.env.FEISHU_APP_SECRET &&
      process.env.FEISHU_APP_TOKEN &&
      process.env.FEISHU_TABLE_ID &&
      process.env.FEISHU_BOT_WEBHOOK_URL &&
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.NOTIFY_EMAIL
  );
}

async function writeToFeishuBitable(inquiry: InquiryData) {
  const tokenResponse = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET
    })
  });
  const tokenJson = (await tokenResponse.json()) as {tenant_access_token?: string; code?: number; msg?: string};

  if (!tokenResponse.ok || !tokenJson.tenant_access_token) {
    throw new Error(`Feishu token failed: ${tokenJson.msg || tokenResponse.statusText}`);
  }

  const recordResponse = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_APP_TOKEN}/tables/${process.env.FEISHU_TABLE_ID}/records`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${tokenJson.tenant_access_token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          Name: inquiry.name,
          Company: inquiry.company || "",
          Email: inquiry.email,
          Country: inquiry.country,
          WhatsApp: inquiry.whatsapp || "",
          "Origin port": inquiry.originPort,
          "Destination port": inquiry.destinationPort,
          "Cargo type": inquiry.cargoType,
          "Container or weight": inquiry.volume || "",
          "Expected transit time": inquiry.expectedTransit || "",
          Notes: inquiry.notes || "",
          Source: inquiry.source || "website",
          Status: "New",
          "Submitted at": inquiry.submittedAt
        }
      })
    }
  );

  const recordJson = (await recordResponse.json()) as {code?: number; msg?: string};
  if (!recordResponse.ok || recordJson.code !== 0) {
    throw new Error(`Feishu record failed: ${recordJson.msg || recordResponse.statusText}`);
  }
}

async function sendEmailNotification(inquiry: InquiryData) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.NOTIFY_EMAIL,
    cc: process.env.NOTIFY_EMAIL_CC || undefined,
    subject: `New freight inquiry from ${inquiry.company || inquiry.name}`,
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

  if (!response.ok) {
    throw new Error(`Feishu bot failed: ${response.statusText}`);
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
    `Country: ${inquiry.country}`,
    `WhatsApp: ${inquiry.whatsapp || "Not provided"}`,
    `Origin port: ${inquiry.originPort}`,
    `Destination port: ${inquiry.destinationPort}`,
    `Cargo type: ${inquiry.cargoType}`,
    `Container or weight: ${inquiry.volume || "Not provided"}`,
    `Expected transit time: ${inquiry.expectedTransit || "Not provided"}`,
    `Source: ${inquiry.source || "website"}`,
    `Submitted at: ${inquiry.submittedAt}`,
    "",
    `Notes: ${inquiry.notes || "Not provided"}`
  ].join("\n");
}
