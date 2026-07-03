type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverse = false
}: SectionHeadingProps) {
  return (
    <div
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <p
        className={`mb-3 text-sm font-extrabold uppercase tracking-[0.18em] ${
          inverse ? "text-gold-200" : "text-royal-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-balance text-3xl font-bold leading-[1.18] sm:text-4xl ${
          inverse ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-7 sm:text-lg sm:leading-8 ${
            inverse ? "text-white/78" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
