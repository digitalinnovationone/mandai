// Tela 3 — Cardápio do restaurante
function ScreenRestaurant() {
  const sections = [
    {
      title: "Mais pedidos da casa",
      items: [
        { id: "ze-1", name: "Tapioca de queijo coalho", desc: "Recheio de queijo coalho derretido, mel da casa pra acompanhar.", price: "R$ 18,90", img: U("1639024471283-03518883512d", 400), pop: true },
        { id: "ze-2", name: "Pão na chapa com manteiga", desc: "Pão francês fresquinho, manteiga derretida na chapa quente.", price: "R$ 6,50", img: U("1509440159596-0249088772ff", 400) },
        { id: "ze-3", name: "Misto quente clássico", desc: "Pão de forma, presunto, queijo prato. Do jeito que tem que ser.", price: "R$ 12,90", img: U("1528735602780-2552fd46c7af", 400) },
      ],
    },
    {
      title: "Cafés da manhã",
      items: [
        { id: "ze-4", name: "Café com leite e pão na chapa", desc: "O combo da padaria. Café coado, leite quentinho.", price: "R$ 14,90", img: U("1495474472287-4d71bcdd2085", 400) },
        { id: "ze-5", name: "Suco de laranja 400ml", desc: "Espremido na hora, sem açúcar, sem nada.", price: "R$ 10,00", img: U("1613478223719-2ab802602423", 400) },
        { id: "ze-6", name: "Croissant da casa", desc: "Manteiga francesa, massa folhada feita aqui.", price: "R$ 9,90", img: U("1555507036-ab1f4038808a", 400) },
      ],
    },
    {
      title: "Brunch",
      items: [
        { id: "ze-7", name: "Açaí 500ml na tigela", desc: "Banana, granola crocante, leite condensado.", price: "R$ 22,90", img: U("1490474418585-ba9bad8fd0ea", 400), promo: "10% off" },
        { id: "ze-8", name: "Ovos mexidos com bacon", desc: "Ovos cremosos, bacon crocante, torrada.", price: "R$ 26,50", img: U("1525351484163-7529414344d8", 400) },
      ],
    },
  ];
  const menuNav = ["Mais pedidos", "Cafés da manhã", "Brunch", "Salgados", "Doces", "Bebidas"];

  return (
    <div className="screen" data-screen-label="03 Restaurante">
      <AppHeader cartCount={2}/>

      {/* Restaurant hero */}
      <section style={{ position: "relative" }}>
        <div style={{ height: 260, backgroundImage: `linear-gradient(180deg, rgba(28,24,18,0.05) 0%, rgba(28,24,18,0.45) 100%), url(${U("1509440159596-0249088772ff", 1600)})`, backgroundSize: "cover", backgroundPosition: "center" }}/>
        <div className="container" style={{ position: "relative" }}>
          <div style={{ background: "#fff", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-3)", padding: "24px 28px", marginTop: -64, display: "flex", gap: 24, alignItems: "center", position: "relative", zIndex: 2 }}>
            <div style={{ width: 88, height: 88, borderRadius: 18, background: `url(${U("1509440159596-0249088772ff", 300)}) center/cover`, flexShrink: 0, boxShadow: "var(--shadow-1)", border: "3px solid #fff" }}/>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.025em" }}>Padaria do Zé</h1>
                <span style={{ background: "var(--folha-50)", color: "var(--folha-700)", fontSize: 12, fontWeight: 700, padding: "5px 9px", borderRadius: "var(--r-xs)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Icon name="check" size={11}/> Aberto agora
                </span>
              </div>
              <div style={{ display: "flex", gap: 18, marginTop: 8, alignItems: "center", color: "var(--fg-2)", fontSize: 14 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 600, color: "var(--ink-700)" }}>
                  <Icon name="star" size={14} color="var(--manga-400)"/> 4,8 · 1.247 avaliações
                </span>
                <span>·</span>
                <span>Padaria · Café · Brunch</span>
                <span>·</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Icon name="map-pin" size={13}/> R. Wisard, 348 — Vila Madalena
                </span>
              </div>
            </div>
            <div style={{ background: "var(--folha-50)", padding: "14px 18px", borderRadius: "var(--r-md)", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--folha-700)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pronto em</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 700, color: "var(--folha-700)", marginTop: 2 }}>~18 min</div>
            </div>
          </div>
        </div>
      </section>

      {/* Body: menu nav + sections */}
      <section className="container" style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 340px", gap: 32, alignItems: "flex-start" }}>

          {/* Menu nav sticky */}
          <aside>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-500)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Cardápio</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              {menuNav.map((m, i) => (
                <li key={i}>
                  <a href="#" style={{
                    display: "block", padding: "10px 14px",
                    color: i === 0 ? "var(--ink-800)" : "var(--ink-600)",
                    fontWeight: i === 0 ? 600 : 500, fontSize: 14,
                    background: i === 0 ? "var(--tomate-50)" : "transparent",
                    borderLeft: i === 0 ? "3px solid var(--tomate-500)" : "3px solid transparent",
                    borderRadius: 6,
                    textDecoration: "none",
                  }}>{m}</a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Items */}
          <div>
            {sections.map((sec, si) => (
              <div key={si} style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.02em", marginBottom: 18 }}>{sec.title}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
                  {sec.items.map((it) => (
                    <div key={it.id} style={{
                      background: "var(--bg-surface)", borderRadius: "var(--r-md)",
                      padding: 16, boxShadow: "var(--shadow-1)",
                      display: "flex", gap: 18, alignItems: "stretch",
                      cursor: "pointer",
                    }}>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                          {it.pop && <span style={{ background: "var(--manga-50)", color: "var(--manga-500)", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="flame" size={11}/> Mais pedido</span>}
                          {it.promo && <span style={{ background: "var(--tomate-50)", color: "var(--tomate-600)", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{it.promo}</span>}
                        </div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.01em" }}>{it.name}</div>
                        <p style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.4, marginTop: 4, flex: 1 }}>{it.desc}</p>
                        <div className="price" style={{ fontSize: 17, color: "var(--ink-800)", marginTop: 10 }}>{it.price}</div>
                      </div>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <div style={{ width: 130, height: 130, borderRadius: "var(--r-md)", backgroundImage: `url(${it.img})`, backgroundSize: "cover", backgroundPosition: "center" }}/>
                        <button style={{
                          position: "absolute", bottom: -10, right: -10,
                          width: 40, height: 40, borderRadius: "50%",
                          background: "var(--tomate-500)", color: "#fff",
                          border: "3px solid #fff", boxShadow: "var(--shadow-2)",
                          cursor: "pointer", display: "grid", placeItems: "center"
                        }}>
                          <Icon name="plus" size={18} color="#fff" strokeWidth={2.5}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart preview (right rail) */}
          <aside>
            <div style={{ position: "sticky", top: 100 }}>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink-800)" }}>Sua sacola</h3>
                  <span style={{ fontSize: 13, color: "var(--fg-2)" }}>2 itens</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ background: "var(--ink-100)", color: "var(--ink-700)", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 600, minWidth: 24, textAlign: "center" }}>1×</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-800)" }}>Tapioca de queijo coalho</div>
                      <div className="price" style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>R$ 18,90</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ background: "var(--ink-100)", color: "var(--ink-700)", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 600, minWidth: 24, textAlign: "center" }}>1×</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-800)" }}>Pão na chapa com manteiga</div>
                      <div className="price" style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>R$ 6,50</div>
                    </div>
                  </div>
                </div>
                <hr className="divider"/>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, color: "var(--fg-2)" }}>Subtotal</span>
                  <span className="price" style={{ fontSize: 18, color: "var(--ink-800)" }}>R$ 25,40</span>
                </div>
                <button className="btn btn-primary btn-block" style={{ marginTop: 16 }}>
                  Ver sacola <Icon name="arrow-right" size={14}/>
                </button>
                <div style={{ fontSize: 12, color: "var(--fg-2)", textAlign: "center", marginTop: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%" }}>
                  <Icon name="store" size={12}/> Retirada no balcão · sem taxa
                </div>
              </div>
            </div>
          </aside>

        </div>
      </section>

      <AppFooter/>
    </div>
  );
}
window.ScreenRestaurant = ScreenRestaurant;
