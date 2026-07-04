type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
};

export function SectionHeading({eyebrow, title, text, light}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? (
        <p className={`mb-3 text-sm font-bold uppercase tracking-[0.18em] ${light ? "text-gold" : "text-steel"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-3xl font-black leading-tight md:text-5xl ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {text ? <p className={`mt-4 text-base leading-8 ${light ? "text-white/68" : "text-slate-600"}`}>{text}</p> : null}
    </div>
  );
}
