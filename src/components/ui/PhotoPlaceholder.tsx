/**
 * Used wherever authentic photography is not yet available. Per the
 * placeholder policy, we never substitute stock or fabricated imagery —
 * this renders an honest, on-brand placeholder instead. Swap for a real
 * <Image> once photography lands (see IMAGE_REQUIREMENTS.md).
 */
export function PhotoPlaceholder({
  label,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} flex flex-col items-center justify-center gap-2 border border-warm-concrete bg-heritage-black/95 p-6 text-center text-clean-white/70`}
    >
      <span aria-hidden="true" className="text-3xl">
        ✳
      </span>
      <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
    </div>
  );
}
