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
    <section className="relative overflow-hidden bg-slate-800">
      <div className="absolute inset-0">
        <Image src={image} alt={alt} fill priority className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <div className="mb-6 inline-block rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            {eyebrow}
          </div>
          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-white lg:text-5xl xl:text-6xl">{title}</h1>
          <p className="text-lg leading-relaxed text-slate-300">{text}</p>
          {caption ? (
            <p className="caption-over-image mt-10 inline-flex rounded-lg px-3 py-2 text-xs">{caption}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
