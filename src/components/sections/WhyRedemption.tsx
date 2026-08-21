const pillars = [
  {
    title: "Real-Estate Understanding",
    body: "Dante's experience means the team understands closings, listing preparation, distressed properties, investor timelines, and professional communication.",
  },
  {
    title: "Capable Execution",
    body: "Redemption is structured for complete-property projects — not merely isolated pickups.",
  },
  {
    title: "Clear Communication",
    body: "Clients and professional partners know what happens next, what is included, and who is accountable.",
  },
  {
    title: "Respect for People and Property",
    body: "Sensitive situations are handled without judgment or unnecessary exposure.",
  },
  {
    title: "Ready for What Comes Next",
    body: "The objective is not just removal. The property should be positioned for its next use, sale, renovation, occupancy, or transition.",
  },
];

export function WhyRedemption() {
  return (
    <section className="bg-warm-concrete/30 py-16">
      <div className="container-page">
        <p className="eyebrow">Why Redemption</p>
        <h2 className="mt-1 font-display text-3xl font-bold text-heritage-black">
          More than removal
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="font-display text-lg font-semibold text-heritage-black">{pillar.title}</h3>
              <p className="mt-2 text-sm text-steel-gray">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
