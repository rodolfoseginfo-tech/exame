export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f7f7fb",
        color: "#25243a",
        textAlign: "center",
      }}
    >
      <section style={{ width: "min(420px, 100%)" }}>
        <div
          aria-hidden="true"
          style={{
            width: 56,
            height: 56,
            margin: "0 auto 18px",
            borderRadius: 18,
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(145deg, #8c80f0, #5e51d6)",
            color: "white",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          S
        </div>
        <h1 style={{ margin: 0, fontSize: 24 }}>Preparando o StudySim</h1>
        <p style={{ margin: "10px 0 0", color: "#77758c", lineHeight: 1.5 }}>
          Carregando suas provas, histórico e dados salvos neste dispositivo.
        </p>
      </section>
    </main>
  );
}
