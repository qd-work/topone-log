type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  centered?: boolean;
};

export function SectionHeading({eyebrow, title, text, light, centered}: SectionHeadingProps) {
  return (
    <div className={`mb-12 max-w-4xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`mb-5 text-xs font-bold uppercase tracking-[0.2em] ${
            light ? "text-[#ffda00]" : "text-[#4b6298]"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`cargo-display zh-display zh-display-lg text-[clamp(48px,7vw,104px)] ${
          light ? "text-white" : "text-[#002a35]"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-6 max-w-2xl text-base leading-relaxed lg:text-lg ${light ? "text-white/70" : "text-[#002a35]/65"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
