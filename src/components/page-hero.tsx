import Image from "next/image";
import {useTranslations} from "next-intl";

type PageHeroProps = {
  title: string;
  eyebrow: string;
  text: string;
  image: string;
  alt?: string;
};

export function PageHero({title, eyebrow, text, image, alt = "China-origin freight forwarding operations"}: PageHeroProps) {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Image src={image} alt={alt} fill priority className="object-cover opacity-42" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/84 to-navy/40" />
      <div className="container relative py-16 md:py-20">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">{text}</p>
        <p className="caption-over-image mt-10 inline-flex rounded-md px-3 py-2 text-xs">
          {t("common.representative")}
        </p>
      </div>
    </section>
  );
}
