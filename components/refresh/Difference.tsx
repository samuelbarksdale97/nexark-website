"use client";

/**
 * THE DIFFERENCE — the shelf.
 *
 * Content type: ARGUMENT. Second attempt; the first one shipped and was wrong.
 *
 * WHAT FAILED. The previous version staged the argument rhetorically — steelman in a card, a
 * turn, then a dissolve — and read as two screens of paragraphs on an empty ground. Sam: "it
 * looks very lacking... it's just not selling me." Both true, and they are the same failure:
 * the argument was made in SENTENCES, so the only way to receive it was to read all of it. A
 * visitor who reads nothing should still get the point.
 *
 * WHAT THIS DOES INSTEAD. The argument is carried by the cards themselves, before a word is
 * read. Three identical muted cards, tagged ON THE SHELF — deliberately interchangeable, because
 * that IS the point about bought software: your competitor gets the same one. Then a fourth card
 * that breaks the set: cream on black, taller, tagged NOT FOR SALE.
 *
 * The shape says "these three are commodities and this one is not" at a glance. The copy only
 * has to confirm what the layout already said. That is the difference between an argument you
 * read and an argument you SEE — and it is why the claim now lands at the end as a conclusion
 * rather than sitting at the top as an assertion.
 *
 * Not a triptych (PATTERNS.md anti-pattern): the fourth card is deliberately unequal, and the
 * three that ARE equal are equal on purpose — their interchangeability is the argument.
 */

const SHELF = [
  { name: "Reservations platform", note: "Every venue in your city can license it this week." },
  { name: "Scheduling software", note: "Same features, same setup, same vendor onboarding call." },
  { name: "Point of sale", note: "Whatever it reports to you, it reports to them too." },
];

export function Difference() {
  return (
    <section className="band shelf-band" data-nav="dark">
      <span className="connector" />
      <div className="wrap">
        <div className="sec-head wide reveal">
          <h2>Your competitors can buy every tool you use.</h2>
        </div>

        <div className="shelf">
          {SHELF.map((s) => (
            <article key={s.name} className="shelf-card reveal">
              <span className="shelf-tag">On the shelf</span>
              <h3>{s.name}</h3>
              <p>{s.note}</p>
            </article>
          ))}

          <article className="shelf-card own reveal">
            <span className="shelf-tag">Not for sale</span>
            <h3>The way your business actually runs</h3>
            <p>
              Your workflow, your rules, your data — engineered into one system that fits nothing
              else. It is the only part of your operation a competitor cannot purchase, because
              it was never a product.
            </p>
            <span className="shelf-mark" aria-hidden="true" />
          </article>
        </div>

        <p className="shelf-claim reveal">
          A tool is something everyone can have. <em>An advantage is something only you have.</em>
        </p>
      </div>
    </section>
  );
}
