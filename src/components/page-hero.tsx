import Image from "next/image";

type PageHeroProps = {
  title: string;
  eyebrow: string;
  text: string;
  image: string;
  alt?: string;
  caption?: string;
};

export function PageHero({
  title,
  eyebrow,
  text,
  image,
  alt = "China-origin freight forwarding operations",
  caption
}: PageHeroProps) {
  return (
    <section data-motion-static className="relative flex min-h-[clamp(520px,68vh,760px)] items-end overflow-hidden bg-[#002a35] text-white">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#002a35]/52" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#002a35] via-[#002a35]/64 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-2 bg-[#ffda00]" />

      <div className="relative w-full px-[clamp(16px,3vw,48px)] pb-[clamp(48px,7vw,100px)] pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
          <div>
            <p className="mb-7 text-xs font-bold uppercase tracking-[0.22em] text-[#ffda00]">{eyebrow}</p>
            <h1 className="cargo-display zh-display zh-display-xl max-w-5xl text-[clamp(64px,10vw,160px)]">{title}</h1>
          </div>
          <div className="border-t border-white/50 pt-5">
            <p className="max-w-md text-base leading-relaxed text-white/75 lg:text-lg">{text}</p>
            {caption ? <p className="mt-8 text-xs uppercase tracking-[0.12em] text-white/40">{caption}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
