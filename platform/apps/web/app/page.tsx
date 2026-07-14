export default function Home() {
  return (
    <main style={{ display: "grid", placeItems: "center", minHeight: "100svh" }}>
      <div style={{ textAlign: "center", maxWidth: 560, padding: 24 }}>
        <p style={{ color: "var(--gold-500)", letterSpacing: "0.3em", fontSize: 12 }}>
          GLOBAL FOOTBALL ECOSYSTEM
        </p>
        <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: "16px 0" }}>
          From unseen to seen.
        </h1>
        <p style={{ color: "var(--ink-mid)" }}>
          Platform scaffold - see /docs for the architecture this grows into.
        </p>
      </div>
    </main>
  );
}
