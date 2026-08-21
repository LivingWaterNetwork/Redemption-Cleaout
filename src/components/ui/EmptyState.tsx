export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-steel-gray/40 bg-warm-concrete/30 p-10 text-center">
      <h3 className="font-display text-xl font-semibold text-heritage-black">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-steel-gray">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
