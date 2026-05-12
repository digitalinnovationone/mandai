// Tela 5 — Sacola com totais
function ScreenCart() {
  const items = [
    { id: 1, qty: 1, name: "Tapioca de queijo coalho", img: U("1639024471283-03518883512d", 300),
      mods: ["Acompanha: mel da casa", "+ Queijo coalho extra"], price: "R$ 23,90" },
    { id: 2, qty: 2, name: "Pão na chapa com manteiga", img: U("1509440159596-0249088772ff", 300),
      mods: [], price: "R$ 13,00", note: "Bem tostado, por favor." },
    { id: 3, qty: 1, name: "Café com leite e pão na chapa", img: U("1495474472287-4d71bcdd2085", 300),
      mods: ["Leite zero lactose"], price: "R$ 14,90" },
  ];
  return (
    <div className="screen" data-screen-label="05 Sacola">
      <AppHeader cartCount={4}/>

      <section className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        {/* Page head */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)", marginBottom: 14 }}>
          <a href="#" style={{ color: "var(--fg-2)", display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="chevron-left" size={13}/> Continuar comprando
          </a>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.03em", lineHeight: 1 }}>
          Sua sacola
        </h1>
        <div style={{ fontSize: 15, color: "var(--fg-2)", marginTop: 8 }}>
          4 itens da <span style={{ color: "var(--ink-700)", fontWeight: 600 }}>Padaria do Zé</span> · Vila Madalena
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, marginTop: 32, alignItems: "flex-start" }}>

          {/* Items column */}
          <div>
            {/* Pickup info banner */}
            <div className="card" style={{ padding: "16px 20px", marginBottom: 18, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--folha-50)", color: "var(--folha-700)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name="store" size={20}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "var(--ink-800)", fontSize: 15 }}>Retirada no balcão da Padaria do Zé</div>
                <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>
                  R. Wisard, 348 — Vila Madalena · Pronto em <span style={{ color: "var(--folha-600)", fontWeight: 600 }}>~18 min</span>
                </div>
              </div>
              <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>Ver mapa</button>
            </div>

            <div className="card" style={{ padding: 0 }}>
              {items.map((it, i) => (
                <div key={it.id} style={{
                  padding: "20px 24px",
                  borderBottom: i < items.length - 1 ? "1px solid var(--border-1)" : 0,
                  display: "flex", gap: 18, alignItems: "flex-start"
                }}>
                  <div style={{
                    width: 84, height: 84, borderRadius: "var(--r-md)",
                    backgroundImage: `url(${it.img})`, backgroundSize: "cover", backgroundPosition: "center",
                    flexShrink: 0
                  }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.01em" }}>{it.name}</div>
                        {it.mods.length > 0 && (
                          <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0", display: "flex", flexDirection: "column", gap: 2 }}>
                            {it.mods.map((m, mi) => (
                              <li key={mi} style={{ fontSize: 13, color: "var(--fg-2)" }}>{m}</li>
                            ))}
                          </ul>
                        )}
                        {it.note && (
                          <div style={{ fontSize: 13, color: "var(--ink-600)", marginTop: 6, fontStyle: "italic", display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <Icon name="info" size={12} color="var(--fg-3)"/> {it.note}
                          </div>
                        )}
                        <button style={{
                          background: "transparent", border: 0, padding: 0, marginTop: 10,
                          color: "var(--tomate-600)", fontSize: 13, fontWeight: 600,
                          cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5
                        }}>
                          Editar item
                        </button>
                      </div>
                      <button style={{
                        background: "transparent", border: 0, color: "var(--ink-500)",
                        cursor: "pointer", padding: 6
                      }}>
                        <Icon name="trash" size={16}/>
                      </button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        background: "var(--bg-page)", borderRadius: 999,
                        padding: 3, border: "1px solid var(--border-2)"
                      }}>
                        <button style={{ width: 30, height: 30, borderRadius: "50%", background: "transparent", border: 0, color: "var(--ink-700)", cursor: "pointer", display: "grid", placeItems: "center" }}>
                          <Icon name="minus" size={14}/>
                        </button>
                        <span style={{ minWidth: 22, textAlign: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: "var(--ink-800)" }}>{it.qty}</span>
                        <button style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--tomate-500)", border: 0, color: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}>
                          <Icon name="plus" size={14} color="#fff" strokeWidth={2.5}/>
                        </button>
                      </div>
                      <span className="price" style={{ fontSize: 16, color: "var(--ink-800)" }}>{it.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add more */}
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
              <button className="btn btn-secondary" style={{ padding: "12px 22px", fontSize: 14 }}>
                <Icon name="plus" size={14}/> Adicionar mais itens
              </button>
            </div>
          </div>

          {/* Summary column */}
          <aside style={{ position: "sticky", top: 100 }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.02em" }}>Resumo do pedido</h3>

              {/* Cupom */}
              <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--manga-400)" }}>
                    <Icon name="ticket" size={16}/>
                  </span>
                  <input
                    placeholder="Cupom de desconto"
                    style={{
                      width: "100%", boxSizing: "border-box",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-2)",
                      borderRadius: "var(--r-sm)",
                      padding: "11px 14px 11px 38px",
                      fontFamily: "var(--font-body)", fontSize: 13,
                      color: "var(--ink-800)", outline: "none"
                    }}
                  />
                </div>
                <button className="btn btn-secondary" style={{ padding: "11px 18px", fontSize: 13 }}>Aplicar</button>
              </div>

              <hr className="divider"/>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Row label="Subtotal" value="R$ 64,80"/>
                <Row label="Taxa de retirada" value="Grátis" valueColor="var(--folha-600)" valueWeight={600}/>
                <Row label={<span>Cupom <span style={{ background: "var(--manga-50)", color: "var(--manga-500)", padding: "1px 6px", borderRadius: 4, fontSize: 11, fontWeight: 700, marginLeft: 4 }}>MANDA20</span></span>} value="− R$ 12,96" valueColor="var(--tomate-600)" valueWeight={600}/>
              </div>

              <hr className="divider"/>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink-800)" }}>Total</span>
                <span className="price" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink-800)" }}>R$ 51,84</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--fg-2)", textAlign: "right", marginTop: 4 }}>
                Pagamento direto no balcão
              </div>

              <button className="btn btn-primary btn-block" style={{ marginTop: 20 }}>
                Finalizar pedido <Icon name="arrow-right" size={15}/>
              </button>

              <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--folha-50)", borderRadius: "var(--r-sm)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ color: "var(--folha-700)", marginTop: 1 }}>
                  <Icon name="info" size={16}/>
                </div>
                <div style={{ fontSize: 12, color: "var(--folha-800)", lineHeight: 1.45 }}>
                  <strong>Sem cadastro.</strong> A gente só vai pedir seu nome pra gerar o código que você apresenta no balcão.
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

function Row({ label, value, valueColor, valueWeight }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontSize: 14, color: "var(--fg-2)" }}>{label}</span>
      <span className="price" style={{ fontSize: 15, color: valueColor || "var(--ink-800)", fontWeight: valueWeight || 600 }}>{value}</span>
    </div>
  );
}
window.ScreenCart = ScreenCart;
