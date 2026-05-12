// Tela 1 — Home
function ScreenHome() {
  return (
    <div className="screen" data-screen-label="01 Home">
      <AppHeader cartCount={0}/>

      {/* Hero band */}
      <section style={{ background: "var(--ink-800)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, padding: "72px 24px", alignItems: "center", position: "relative", zIndex: 2 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--manga-300)" }}>Manda aí, retira e leva</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, color: "#fff", marginTop: 14 }}>
              A comida boa do bairro<br/>
              <span style={{ color: "var(--tomate-300)" }}>pronta quando você chega</span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--ink-200)", marginTop: 18, maxWidth: 480, lineHeight: 1.5 }}>
              Pede pelo Mandaí, retira no balcão do restaurante. Sem fila, sem taxa de entrega, sem espera de motoboy.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button className="btn btn-primary" style={{ padding: "16px 28px", fontSize: 16 }}>
                Pedir agora <Icon name="arrow-right" size={16}/>
              </button>
              <button className="btn btn-ghost" style={{ color: "#fff", padding: "16px 24px", fontSize: 16 }}>
                Como funciona
              </button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 36, fontSize: 13, color: "var(--ink-300)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Icon name="check" size={14} color="var(--folha-300)"/> Sem taxa de entrega
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Icon name="check" size={14} color="var(--folha-300)"/> Código no balcão
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Icon name="check" size={14} color="var(--folha-300)"/> Pagamento no local
              </span>
            </div>
          </div>
          <div style={{ position: "relative", height: 380 }}>
            {/* Stacked food photos */}
            <div style={{ position: "absolute", top: 0, right: 60, width: 240, height: 240, borderRadius: "50%", overflow: "hidden", boxShadow: "var(--shadow-pop)", border: "6px solid var(--ink-800)",
                          background: `url(${U("1513104890138-7c749659a591", 600)}) center/cover` }}/>
            <div style={{ position: "absolute", top: 130, right: 220, width: 200, height: 200, borderRadius: "50%", overflow: "hidden", boxShadow: "var(--shadow-pop)", border: "6px solid var(--ink-800)",
                          background: `url(${U("1568901346375-23c9450c58cd", 600)}) center/cover` }}/>
            <div style={{ position: "absolute", top: 60, right: 320, width: 140, height: 140, borderRadius: "50%", overflow: "hidden", boxShadow: "var(--shadow-pop)", border: "6px solid var(--ink-800)",
                          background: `url(${U("1490474418585-ba9bad8fd0ea", 500)}) center/cover` }}/>
            <span style={{ position: "absolute", top: 290, right: 0, background: "var(--manga-400)", color: "var(--ink-900)", padding: "10px 16px", borderRadius: 999, fontWeight: 700, fontSize: 13, boxShadow: "var(--shadow-2)", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-display)" }}>
              <Icon name="flame" size={14}/> 800+ restaurantes
            </span>
          </div>
        </div>
        {/* Faint pattern bg */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle, #fff 1.2px, transparent 1.5px)`, backgroundSize: "18px 18px", pointerEvents: "none" }}/>
      </section>

      {/* Categories tiles */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 8 }}>
        <div className="section-head">
          <div>
            <h2>O que vai ser hoje?</h2>
            <div className="sub">Mais de 800 restaurantes a poucos minutos de você.</div>
          </div>
          <a className="more" href="#">Ver tudo <Icon name="chevron-right" size={14}/></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 14 }}>
          {DATA.categories.map((c) => (
            <button key={c.id} className="cat-tile">
              <span className="blob" style={{ background: c.bg }}>{c.emoji}</span>
              <span className="lbl">{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Promo strip */}
      <section className="container" style={{ paddingTop: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 18 }}>
          <div style={{ background: "var(--tomate-500)", borderRadius: "var(--r-xl)", padding: "32px 36px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220, position: "relative", overflow: "hidden", boxShadow: "var(--shadow-2)" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85 }}>Cupom da semana</span>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginTop: 6 }}>
                Tá com fome? <br/>Manda <span style={{ background: "#fff", color: "var(--tomate-600)", padding: "0 12px", borderRadius: 8 }}>20%</span> off
              </h3>
              <p style={{ marginTop: 10, opacity: 0.9, fontSize: 15 }}>Use <span style={{ fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.18)", padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>MANDA20</span> no carrinho. Válido até domingo.</p>
            </div>
            <div style={{ position: "absolute", right: -40, bottom: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}/>
            <div style={{ position: "absolute", right: 30, bottom: 30, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }}/>
          </div>
          <div style={{ background: "var(--folha-500)", borderRadius: "var(--r-xl)", padding: "28px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220, boxShadow: "var(--shadow-2)" }}>
            <Icon name="package" size={28}/>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Retirada em 15 min</h3>
              <p style={{ marginTop: 6, opacity: 0.92, fontSize: 14 }}>Pratos prontos pra você buscar sem fila.</p>
            </div>
          </div>
          <div style={{ background: "var(--manga-400)", borderRadius: "var(--r-xl)", padding: "28px", color: "var(--ink-900)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220, boxShadow: "var(--shadow-2)" }}>
            <Icon name="ticket" size={28}/>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>Cupons quentinhos 🌶️</h3>
              <p style={{ marginTop: 6, fontSize: 14, color: "var(--ink-800)" }}>Ofertas dos restaurantes da sua região.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants near you */}
      <section className="container" style={{ paddingTop: 56 }}>
        <div className="section-head">
          <div>
            <h2>Pertinho de você</h2>
            <div className="sub">Em Vila Madalena · ordenado por distância</div>
          </div>
          <a className="more" href="#">Ver todos <Icon name="chevron-right" size={14}/></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {DATA.restaurants.slice(0, 6).map((r) => <RestaurantCard key={r.id} r={r}/>)}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container" style={{ paddingTop: 56 }}>
        <div className="section-head">
          <div>
            <h2>Mais pedidos no bairro</h2>
            <div className="sub">O que tá saindo do balcão essa semana</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {DATA.restaurants.slice(6, 9).map((r) => <RestaurantCard key={r.id} r={r}/>)}
        </div>
      </section>

      <AppFooter/>
    </div>
  );
}
window.ScreenHome = ScreenHome;
