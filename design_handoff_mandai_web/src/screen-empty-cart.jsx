// Tela 5b — Sacola vazia
function ScreenEmptyCart() {
  const suggestions = [
    { id: "1", name: "Padaria do Zé", tag: "Padaria · Café da manhã", time: "15-25 min", img: "1509440159596-0249088772ff", price: "R$ · R$" },
    { id: "2", name: "Pizzaria Bráz", tag: "Pizza · Forno a lenha", time: "30-40 min", img: "1565299624946-b28f40a0ae38", price: "R$ R$" },
    { id: "3", name: "Tapioca da Vila", tag: "Lanches · Vegano", time: "20-30 min", img: "1639024471283-03518883512d", price: "R$" },
    { id: "4", name: "Açaí do Bairro", tag: "Açaí · Sobremesa", time: "10-20 min", img: "1490474418585-ba9bad8fd0ea", price: "R$ ·R$" },
  ];
  const recent = [
    { name: "Sushi do Tio Kazu", last: "Pediu na semana passada" },
    { name: "Burger da Esquina", last: "Pediu há 12 dias" },
  ];
  return (
    <div className="screen" data-screen-label="05b Sacola vazia">
      <AppHeader cartCount={0}/>

      <section className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)", marginBottom: 14 }}>
          <a href="#" style={{ color: "var(--fg-2)", display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="chevron-left" size={13}/> Voltar pra home
          </a>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.03em", lineHeight: 1 }}>
          Sua sacola
        </h1>
        <div style={{ fontSize: 15, color: "var(--fg-2)", marginTop: 8 }}>
          Nada por aqui ainda
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, marginTop: 32, alignItems: "flex-start" }}>

          {/* Empty state hero + suggestions */}
          <div>
            <div className="card" style={{ padding: "56px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              {/* Soft folha leaf in the background */}
              <svg viewBox="0 0 200 200" style={{ position: "absolute", left: -40, bottom: -60, width: 260, height: 260, opacity: 0.07 }} aria-hidden="true">
                <path d="M100 20 C60 60 30 110 30 150 C30 170 50 180 80 175 C130 165 170 110 170 60 C170 35 140 25 100 20 Z" fill="var(--folha-600)"/>
                <path d="M95 30 Q90 120 60 165" stroke="var(--folha-700)" strokeWidth="2" fill="none"/>
              </svg>
              <svg viewBox="0 0 200 200" style={{ position: "absolute", right: -50, top: -40, width: 200, height: 200, opacity: 0.08 }} aria-hidden="true">
                <path d="M100 30 C70 60 60 100 80 140 C95 170 130 170 145 140 C170 95 145 50 100 30 Z" fill="var(--tomate-500)"/>
              </svg>

              {/* Big empty bag illustration */}
              <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                <div style={{
                  width: 140, height: 140, borderRadius: "50%",
                  background: "var(--tomate-50)",
                  display: "grid", placeItems: "center"
                }}>
                  <Icon name="shopping-bag" size={64} color="var(--tomate-500)" strokeWidth={1.5}/>
                </div>
                {/* Tiny floating tomato glyph */}
                <div style={{
                  position: "absolute", top: -6, right: -6,
                  width: 36, height: 36, borderRadius: "50%",
                  background: "var(--manga-400)", color: "#fff",
                  display: "grid", placeItems: "center",
                  fontSize: 18, fontWeight: 800,
                  boxShadow: "var(--shadow-2)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.04em"
                }}>!</div>
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.025em", lineHeight: 1.05, margin: 0 }}>
                Carrinho vazio que nem<br/>geladeira de domingo
              </h2>
              <p style={{ fontSize: 15, color: "var(--fg-2)", marginTop: 12, maxWidth: 440, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
                Bora escolher um rango? Tem mais de 800 restaurantes prontos pra mandar comida boa pra você.
              </p>
              <div style={{ display: "inline-flex", gap: 10, marginTop: 26 }}>
                <a href="#" className="btn btn-primary" style={{ padding: "14px 26px", fontSize: 15 }}>
                  Explorar restaurantes <Icon name="arrow-right" size={15}/>
                </a>
                <a href="#" className="btn btn-secondary" style={{ padding: "14px 22px", fontSize: 14 }}>
                  Ver categorias
                </a>
              </div>
            </div>

            {/* Suggestions */}
            <div style={{ marginTop: 36 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.02em" }}>
                  Que tal começar por aqui?
                </h3>
                <a href="#" style={{ fontSize: 13, color: "var(--tomate-600)", fontWeight: 600 }}>Ver todos →</a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {suggestions.map(r => (
                  <a key={r.id} href="#" className="card" style={{
                    padding: 0, overflow: "hidden", display: "flex", textDecoration: "none", color: "inherit"
                  }}>
                    <div style={{
                      width: 120, flexShrink: 0,
                      backgroundImage: `url(${U(r.img, 400)})`,
                      backgroundSize: "cover", backgroundPosition: "center"
                    }}/>
                    <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.01em" }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-2)" }}>{r.tag}</div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: "auto", paddingTop: 8 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--folha-700)", fontWeight: 600 }}>
                          <Icon name="clock" size={11} color="var(--folha-600)"/> {r.time}
                        </span>
                        <span style={{ fontSize: 12, color: "var(--ink-500)", fontFamily: "var(--font-mono)" }}>{r.price}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Side: pickup reminder + recent (if any) */}
          <aside style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--folha-50)", color: "var(--folha-700)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Icon name="store" size={20}/>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.015em" }}>Tudo pra retirada</div>
                  <div style={{ fontSize: 12, color: "var(--fg-2)" }}>Sem taxa de entrega, sem espera longa</div>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Você pede pelo site",
                  "A gente gera um código pra você",
                  "Mostra o código no balcão e pega seu rango",
                ].map((s, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--ink-700)", lineHeight: 1.45 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "var(--tomate-50)", color: "var(--tomate-600)",
                      fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
                      display: "grid", placeItems: "center", flexShrink: 0, marginTop: 1
                    }}>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.01em", margin: 0, marginBottom: 12 }}>
                Você já pediu aqui
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {recent.map((r, i) => (
                  <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i === 0 ? 0 : "1px solid var(--border-1)" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-800)" }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{r.last}</div>
                    </div>
                    <button className="btn btn-secondary" style={{ padding: "7px 12px", fontSize: 12 }}>
                      Pedir de novo
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              padding: "14px 16px",
              background: "var(--manga-50)",
              borderRadius: "var(--r-md)",
              display: "flex", gap: 10, alignItems: "flex-start"
            }}>
              <div style={{ color: "var(--manga-500)", marginTop: 1 }}>
                <Icon name="ticket" size={16}/>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-800)", lineHeight: 1.45 }}>
                <strong>Cupom MANDA20</strong> tá ativo até 21h. 20% off no primeiro pedido do dia.
              </div>
            </div>
          </aside>
        </div>
      </section>

      <AppFooter/>
    </div>
  );
}

window.ScreenEmptyCart = ScreenEmptyCart;
