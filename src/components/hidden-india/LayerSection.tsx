import type { StoryLayer } from "@/lib/types";

export function LayerSection({
  layer,
  index,
}: {
  layer: StoryLayer;
  index: number;
}) {
  return (
    <section className="border-t border-jungle/10 py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[160px_1fr] md:px-8">
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-coral">
          {String(index).padStart(2, "0")} · {layer.headline}
        </p>
        <div>
          <h2 className="font-display text-3xl md:text-4xl">{layer.headline}</h2>
          <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-jungle/85">
            {layer.body}
          </p>
          {layer.tips?.length ? (
            <ul className="mt-6 max-w-2xl space-y-2 font-sans text-sm text-jungle/70">
              {layer.tips.map((tip) => (
                <li key={tip}>— {tip}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
