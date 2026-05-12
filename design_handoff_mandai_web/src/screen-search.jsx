// Tela 11 — Resultados de busca por texto
function ScreenSearch() {
  const query = "pizza";

  const filters = ["Tudo", "Restaurantes", "Pratos", "Cozinhas"];
  const activeFilter = "Tudo";

  const restaurants = [
    { id: "r1", name: "Pizzaria Bráz", tag: "Pizza · Forno a lenha", rating: 4.8, reviews: 1240, time: "30-40 min", price: "R$ R$", dist: "0,4 km", img: "1565299624946-b28f40a0ae38", match: "pizza" },
    { id: "r2", name: "Pizza do Lorenzo", tag: "Pizza · Italiana", rating: 4.6, reviews: 880, time: "25-35 min", price: "R$ R$", dist: "0,8 km", img: "1513104890138-7c749659a591", match: "pizza" },
    { id: "r3", name: "Forneria San Paolo", tag: "Pizza · Massa fresca", rating: 4.7, reviews: 620, time: "35-45 min", price: "R$ R$ R$", dist: "1,2 km", img: "1574071318508-1cdbab80d002", match: "pizza" },
  ];

  const dishes = [
    { id: "d1", name: "Pizza Margherita", restaurant: "Pizzaria Bráz", price: "R$ 64,90", img: "1574071318508-1cdbab80d002" },
    { id: "d2", name: "Pizza de Calabresa Artesanal", restaurant: "Pizza do Lorenzo", price: "R$ 58,00", img: "1513104890138-7c749659a591" },
    { id: "d3", name: "Pizza Quatro Queijos", restaurant: "Forneria San Paolo", price: "R$ 72,50", img: "1604382354936-07c5d9983bd3" },
    { id: "d4", name: "Mini-pizza de Pepperoni", restaurant: "Pizza do Lorenzo", price: "R$ 28,00", img: "1565299624946-b28f40a0ae38" },
  ];

  const related = ["pizza vegana", "pizza doce", "pizza sem glúten", "pizzaria aberta agora"];

  // Highlight matched substring in a name.
  function Highlight({ text, match }) {
    const i = text.toLowerCase().indexOf(match.toLowerCase());
    if (i < 0) return <>{text}</>;
    return (
      <>
        {text.slice(0, i)}
        <mark style={{ background: "var(--manga-100)", color: "var(--ink-800)", padding: "0 2px", borderRadius: 3 }}>
          {text.slice(i, i + match.length)}
        </mark>
        {text.slice(i + match.length)}
      </>
    );
  }

  return (
    <div className="screen" data-screen-label="11 Busca">
      <AppHeader cartCount={0} query={query}/>

      <section className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)", marginBottom: 12 }}>
          <a href="#" style={{ color: "var(--fg-2)", display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="chevron-left" size={13}/> Voltar
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 22 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--fg-2)" }}>Resultados da busca</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.03em", lineHeight: 1, marginTop: 6 }}>
              "pizza" em Vila Madalena
            </h1>
            <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 8 }}>
              <span style={{ color: "var(--ink-700)", fontWeight: 600 }}>{restaurants.length} restaurantes</span> e <span style={{ color: "var(--ink-700)", fontWeight: 600 }}>{dishes.length} pratos</span> num raio de 1,5 km
            </div>
          </div>
          <button className="btn btn-secondary" style={{ padding: "10px 14px", fontSize: 13 }}>
            <Icon name="filter" size={13}/> Ordenar e filtrar
          </button>
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {filters.map(f => {
            const active = f === activeFilter;
            return (
              <button key={f} style={{
                padding: "9px 16px",
                fontSize: 13, fontWeight: 600,
                borderRadius: 999,
                cursor: "pointer",
                border: active ? "1.5px solid var(--ink-800)" : "1px solid var(--border-2)",
                background: active ? "var(--ink-800)" : "var(--bg-surface)",
                color: active ? "#fff" : "var(--ink-700)",
              }}>
                {f}
                {active && <span style={{ marginLeft: 6, fontFamily: "var(--font-mono)", fontWeight: 700, opacity: 0.7 }}>· {restaurants.length + dishes.length}</span>}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 32, alignItems: "flex-start" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

            {/* Restaurantes */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.02em" }}>
                  Restaurantes <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--fg-2)", fontWeight: 500, marginLeft: 6 }}>{restaurants.length}</span>
                </h2>
                <a href="#" style={{ fontSize: 13, color: "var(--tomate-600)", fontWeight: 600 }}>Ver todos →</a>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {restaurants.map(r => (
                  <a key={r.id} href="#" className="card" style={{
                    padding: 0, overflow: "hidden", display: "flex", textDecoration: "none", color: "inherit"
                  }}>
                    <div style={{
                      width: 180, flexShrink: 0,
                      backgroundImage: `url(${U(r.img, 500)})`,
                      backgroundSize: "cover", backgroundPosition: "center"
                    }}/>
                    <div style={{ padding: "18px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                        <div>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.015em" }}>
                            <Highlight text={r.name} match={r.match}/>
                          </div>
                          <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>{r.tag}</div>
                        </div>
                        <span style={{
                          background: "var(--folha-50)", color: "var(--folha-700)",
                          fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 999,
                          letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0
                        }}>Aberto</span>
                      </div>

                      <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--ink-700)", fontWeight: 600 }}>
                          <span style={{ color: "var(--manga-500)" }}>★</span>
                          <span className="price">{r.rating.toFixed(1)}</span>
                          <span style={{ color: "var(--fg-3)", fontWeight: 500, fontSize: 12 }}>({r.reviews})</span>
                        </span>
                        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--fg-3)" }}/>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--folha-700)", fontWeight: 600 }}>
                          <Icon name="clock" size={12} color="var(--folha-600)"/> {r.time}
                        </span>
                        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--fg-3)" }}/>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--ink-600)" }}>
                          <Icon name="map-pin" size={12} color="var(--fg-3)"/> {r.dist}
                        </span>
                        <span style={{ fontSize: 13, color: "var(--ink-500)", fontFamily: "var(--font-mono)", marginLeft: "auto" }}>{r.price}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Pratos */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.02em" }}>
                  Pratos <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--fg-2)", fontWeight: 500, marginLeft: 6 }}>{dishes.length}</span>
                </h2>
                <a href="#" style={{ fontSize: 13, color: "var(--tomate-600)", fontWeight: 600 }}>Ver todos →</a>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                {dishes.map(d => (
                  <div key={d.id} className="card" style={{ padding: 0, overflow: "hidden", display: "flex" }}>
                    <div style={{
                      width: 120, flexShrink: 0,
                      backgroundImage: `url(${U(d.img, 400)})`,
                      backgroundSize: "cover", backgroundPosition: "center"
                    }}/>
                    <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                        <Highlight text={d.name} match="pizza"/>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4, display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <Icon name="store" size={11} color="var(--fg-3)"/> {d.restaurant}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 10 }}>
                        <span className="price" style={{ fontSize: 14, color: "var(--ink-800)" }}>{d.price}</span>
                        <button className="btn btn-primary" style={{ padding: "7px 12px", fontSize: 12 }}>
                          <Icon name="plus" size={11} color="#fff" strokeWidth={2.5}/> Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — refine */}
          <aside style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ padding: 22 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.01em", margin: 0, marginBottom: 14 }}>
                Refinar
              </h3>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-700)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Aberto agora</div>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, color: "var(--ink-700)" }}>
                  <span style={{
                    width: 36, height: 22, borderRadius: 999,
                    background: "var(--tomate-500)", position: "relative", flexShrink: 0
                  }}>
                    <span style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, background: "#fff", borderRadius: "50%", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}/>
                  </span>
                  Só restaurantes abertos
                </label>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-700)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Tempo de preparo</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    ["até 20 min", false],
                    ["20–35 min", true],
                    ["35–50 min", false],
                  ].map(([lbl, on]) => (
                    <label key={lbl} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-700)", cursor: "pointer" }}>
                      <span style={{
                        width: 16, height: 16, borderRadius: 4,
                        border: on ? "1.5px solid var(--tomate-500)" : "1.5px solid var(--border-2)",
                        background: on ? "var(--tomate-500)" : "transparent",
                        display: "grid", placeItems: "center"
                      }}>
                        {on && <Icon name="check" size={11} color="#fff" strokeWidth={3}/>}
                      </span>
                      {lbl}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-700)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Faixa de preço</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["R$", "R$ R$", "R$ R$ R$"].map((p, i) => {
                    const on = i === 1;
                    return (
                      <button key={p} style={{
                        flex: 1, padding: "9px 0",
                        border: on ? "1.5px solid var(--ink-800)" : "1px solid var(--border-2)",
                        background: on ? "var(--ink-800)" : "transparent",
                        color: on ? "#fff" : "var(--ink-700)",
                        borderRadius: 8, fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 700, cursor: "pointer"
                      }}>{p}</button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-700)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Distância</div>
                <input type="range" min={0} max={5} step={0.1} defaultValue={1.5} style={{ width: "100%", accentColor: "var(--tomate-500)" }}/>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)", marginTop: 2 }}>
                  <span>0 km</span><span style={{ color: "var(--ink-800)", fontWeight: 700 }}>1,5 km</span><span>5 km</span>
                </div>
              </div>

              <hr className="divider"/>
              <button style={{
                width: "100%", padding: 0, background: "transparent", border: 0,
                color: "var(--tomate-600)", fontSize: 13, fontWeight: 600, cursor: "pointer"
              }}>
                Limpar filtros
              </button>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--ink-800)", margin: 0, marginBottom: 12 }}>
                Buscas relacionadas
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {related.map(r => (
                  <a key={r} href="#" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: 13, color: "var(--ink-700)", textDecoration: "none",
                    padding: "8px 10px", borderRadius: 8,
                    background: "var(--bg-page)"
                  }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <Icon name="search" size={12} color="var(--fg-3)"/>
                      {r}
                    </span>
                    <Icon name="arrow-right" size={12} color="var(--fg-3)"/>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <AppFooter/>
    </div>
  );
}

// Tela 11b — Estado vazio da busca
function ScreenSearchEmpty() {
  const query = "esfiha de chocolate";
  const suggestions = [
    { name: "esfiha de carne", time: "20-30 min", count: 14 },
    { name: "doce no bairro", time: "15-25 min", count: 32 },
    { name: "padaria aberta agora", time: "10-20 min", count: 8 },
  ];
  const nearby = [
    { name: "Padaria do Zé", tag: "Padaria · Doces", time: "15-25 min", img: "1509440159596-0249088772ff" },
    { name: "Confeitaria da Lú", tag: "Doces · Bolos", time: "25-35 min", img: "1486427944299-d1955d23e34d" },
    { name: "Doceria Açúcar", tag: "Sobremesa · Vegano", time: "20-30 min", img: "1488477181946-6428a0291777" },
  ];

  return (
    <div className="screen" data-screen-label="11b Busca vazia">
      <AppHeader cartCount={0} query={query}/>

      <section className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)", marginBottom: 12 }}>
          <a href="#" style={{ color: "var(--fg-2)", display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="chevron-left" size={13}/> Voltar
          </a>
        </div>

        <div style={{ marginBottom: 30 }}>
          <div className="eyebrow" style={{ color: "var(--fg-2)" }}>Resultados da busca</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.03em", lineHeight: 1, marginTop: 6 }}>
            "esfiha de chocolate" em Vila Madalena
          </h1>
          <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 8 }}>
            Nenhum restaurante ou prato bateu por aqui — mas a gente tem ideia.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 32, alignItems: "flex-start" }}>
          <div>
            {/* Empty hero */}
            <div className="card" style={{ padding: "48px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <svg viewBox="0 0 200 200" style={{ position: "absolute", right: -50, top: -40, width: 200, height: 200, opacity: 0.08 }} aria-hidden="true">
                <path d="M100 30 C70 60 60 100 80 140 C95 170 130 170 145 140 C170 95 145 50 100 30 Z" fill="var(--tomate-500)"/>
              </svg>

              <div style={{
                width: 110, height: 110, borderRadius: "50%",
                background: "var(--tomate-50)", margin: "0 auto",
                display: "grid", placeItems: "center", position: "relative"
              }}>
                <Icon name="search" size={48} color="var(--tomate-500)" strokeWidth={1.5}/>
                <span style={{
                  position: "absolute", bottom: -4, right: -4,
                  width: 36, height: 36, borderRadius: "50%",
                  background: "#fff", color: "var(--ink-800)",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800,
                  boxShadow: "var(--shadow-2)"
                }}>?</span>
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.025em", lineHeight: 1.05, margin: 0, marginTop: 22 }}>
                Esse rango não tá no bairro<br/>(ainda!)
              </h2>
              <p style={{ fontSize: 15, color: "var(--fg-2)", marginTop: 12, maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
                Não achei nada com <strong style={{ color: "var(--ink-800)" }}>"esfiha de chocolate"</strong> num raio de 1,5 km. Tenta uma busca mais ampla ou olha o que tem perto.
              </p>

              {/* Suggestion chips */}
              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-500)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Tenta isso</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  {suggestions.map(s => (
                    <a key={s.name} href="#" style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "10px 14px",
                      background: "var(--bg-page)",
                      border: "1px solid var(--border-2)",
                      borderRadius: 999,
                      fontSize: 13, color: "var(--ink-800)", fontWeight: 600,
                      textDecoration: "none"
                    }}>
                      <Icon name="search" size={12} color="var(--fg-3)"/>
                      {s.name}
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-2)", fontWeight: 500 }}>{s.count}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Nearby */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.02em", marginBottom: 14 }}>
                Aberto perto de você
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {nearby.map(r => (
                  <a key={r.name} href="#" className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit" }}>
                    <div style={{
                      height: 120,
                      backgroundImage: `url(${U(r.img, 500)})`,
                      backgroundSize: "cover", backgroundPosition: "center"
                    }}/>
                    <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.01em" }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-2)" }}>{r.tag}</div>
                      <span style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--folha-700)", fontWeight: 600 }}>
                        <Icon name="clock" size={11} color="var(--folha-600)"/> {r.time}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card" style={{ padding: 22 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--ink-800)", margin: 0, marginBottom: 12 }}>
                Buscas recentes
              </h4>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {["pizza", "burguer artesanal", "açaí 500ml", "café da manhã"].map((r, i) => (
                  <a key={r} href="#" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: 13, color: "var(--ink-700)", textDecoration: "none",
                    padding: "10px 0",
                    borderTop: i === 0 ? 0 : "1px solid var(--border-1)"
                  }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <Icon name="clock" size={12} color="var(--fg-3)"/>
                      {r}
                    </span>
                    <Icon name="arrow-right" size={12} color="var(--fg-3)"/>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ padding: "14px 16px", background: "var(--manga-50)", borderRadius: "var(--r-md)", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ color: "var(--manga-500)", marginTop: 1 }}>
                <Icon name="info" size={16}/>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-800)", lineHeight: 1.45 }}>
                Sentiu falta de algum lugar? <a href="#" style={{ color: "var(--tomate-600)", fontWeight: 600 }}>Indica um restaurante</a> que a gente corre atrás.
              </div>
            </div>
          </aside>
        </div>
      </section>

      <AppFooter/>
    </div>
  );
}

window.ScreenSearch = ScreenSearch;
window.ScreenSearchEmpty = ScreenSearchEmpty;
