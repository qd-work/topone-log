type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  centered?: boolean;
};

export function SectionHeading({eyebrow, title, text, light, centered}: SectionHeadingProps) {
  return (
    <div className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            light ? "text-amber-400" : "text-amber-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-heading text-3xl font-bold leading-tight lg:text-4xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-4 text-base leading-relaxed lg:text-lg ${light ? "text-slate-300" : "text-slate-600"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
