// Tela 4 — Modal de adicionar item ao cardápio (sobreposto à tela do restaurante)
function ScreenAddItem() {
  return (
    <div className="screen" data-screen-label="04 Adicionar item" style={{ position: "relative" }}>
      <AppHeader cartCount={2}/>

      {/* Backdrop: a faded version of the restaurant page */}
      <div style={{ filter: "blur(2px) brightness(0.92)", pointerEvents: "none" }}>
        <section style={{ position: "relative" }}>
          <div style={{ height: 220, backgroundImage: `linear-gradient(180deg, rgba(28,24,18,0.05) 0%, rgba(28,24,18,0.45) 100%), url(${U("1509440159596-0249088772ff", 1600)})`, backgroundSize: "cover", backgroundPosition: "center" }}/>
          <div className="container" style={{ position: "relative" }}>
            <div style={{ background: "#fff", borderRadius: "var(--r-lg)", padding: "20px 28px", marginTop: -56, boxShadow: "var(--shadow-2)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "var(--ink-800)" }}>Padaria do Zé</div>
              <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 4 }}>Padaria · Café · Brunch · 4,8 ★</div>
            </div>
          </div>
        </section>
        <div className="container" style={{ paddingTop: 32, paddingBottom: 120 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ background: "#fff", borderRadius: "var(--r-md)", height: 130, boxShadow: "var(--shadow-1)" }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Scrim */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(20, 16, 10, 0.45)", zIndex: 50 }}/>

      {/* Modal */}
      <div style={{
        position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)",
        width: 760, background: "#fff", borderRadius: "var(--r-xl)",
        boxShadow: "var(--shadow-pop)", overflow: "hidden", zIndex: 60,
        display: "flex", flexDirection: "column"
      }}>
        {/* Hero image */}
        <div style={{ position: "relative" }}>
          <div style={{ height: 280, backgroundImage: `url(${U("1639024471283-03518883512d", 1200)})`, backgroundSize: "cover", backgroundPosition: "center" }}/>
          <button style={{
            position: "absolute", top: 16, right: 16,
            width: 40, height: 40, borderRadius: 999,
            background: "#fff", border: 0, cursor: "pointer",
            boxShadow: "var(--shadow-2)", display: "grid", placeItems: "center"
          }}>
            <Icon name="x" size={18} color="var(--ink-800)"/>
          </button>
          <span style={{ position: "absolute", top: 16, left: 16, background: "var(--manga-400)", color: "var(--ink-900)", fontWeight: 700, fontSize: 12, padding: "6px 11px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 5 }}>
            <Icon name="flame" size={12}/> Mais pedido da casa
          </span>
        </div>

        <div style={{ padding: "28px 32px 0" }}>
          {/* Title + price */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.025em" }}>Tapioca de queijo coalho</h2>
              <p style={{ fontSize: 15, color: "var(--fg-2)", marginTop: 8, lineHeight: 1.5, maxWidth: 520 }}>
                Tapioca feita na hora, recheada com queijo coalho derretido. Acompanha potinho de mel da casa pra você regar do jeito que gosta.
              </p>
            </div>
            <div className="price" style={{ fontSize: 24, color: "var(--ink-800)", whiteSpace: "nowrap" }}>R$ 18,90</div>
          </div>

          <hr className="divider"/>

          {/* Adicionais — pick one */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink-800)" }}>Escolha o acompanhamento</div>
                <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>Escolha 1 opção</div>
              </div>
              <span style={{ background: "var(--ink-100)", color: "var(--ink-700)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Obrigatório</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
              {[
                { lbl: "Mel da casa", price: "Grátis", sel: true },
                { lbl: "Geléia de pimenta artesanal", price: "+ R$ 3,00" },
                { lbl: "Doce de leite cremoso", price: "+ R$ 4,00" },
              ].map((o, i) => (
                <label key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 14px",
                  border: o.sel ? "1.5px solid var(--tomate-500)" : "1px solid var(--border-2)",
                  background: o.sel ? "var(--tomate-50)" : "var(--bg-surface)",
                  borderRadius: "var(--r-sm)", cursor: "pointer"
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 999,
                    border: o.sel ? "6px solid var(--tomate-500)" : "1.5px solid var(--border-2)",
                    background: "#fff", flexShrink: 0
                  }}/>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: o.sel ? 600 : 500, color: "var(--ink-800)" }}>{o.lbl}</span>
                  <span className="price" style={{ fontSize: 13, color: o.price === "Grátis" ? "var(--folha-600)" : "var(--fg-2)", fontWeight: 600 }}>{o.price}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="divider"/>

          {/* Extras — multi */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink-800)" }}>Adicionais</div>
                <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>Quantos quiser</div>
              </div>
              <span style={{ background: "var(--folha-50)", color: "var(--folha-700)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Opcional</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
              {[
                { lbl: "Queijo coalho extra", price: "+ R$ 5,00", sel: true },
                { lbl: "Manteiga da terra", price: "+ R$ 2,50" },
                { lbl: "Carne de sol desfiada", price: "+ R$ 9,00" },
                { lbl: "Coco ralado", price: "+ R$ 1,50" },
              ].map((o, i) => (
                <label key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px",
                  border: o.sel ? "1.5px solid var(--tomate-500)" : "1px solid var(--border-2)",
                  background: o.sel ? "var(--tomate-50)" : "var(--bg-surface)",
                  borderRadius: "var(--r-sm)", cursor: "pointer"
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 6,
                    border: o.sel ? 0 : "1.5px solid var(--border-2)",
                    background: o.sel ? "var(--tomate-500)" : "#fff",
                    display: "grid", placeItems: "center", flexShrink: 0
                  }}>
                    {o.sel && <Icon name="check" size={13} color="#fff" strokeWidth={3}/>}
                  </span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: o.sel ? 600 : 500, color: "var(--ink-800)" }}>{o.lbl}</span>
                  <span className="price" style={{ fontSize: 12, color: "var(--fg-2)" }}>{o.price}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="divider"/>

          {/* Observações */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink-800)" }}>Algum recado pro restaurante?</div>
              <span style={{ fontSize: 12, color: "var(--fg-3)" }}>0/140</span>
            </div>
            <textarea
              placeholder="Ex: sem cebola, ponto da carne, etc."
              style={{
                width: "100%", marginTop: 12,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-2)",
                borderRadius: "var(--r-sm)",
                padding: "12px 14px",
                fontFamily: "var(--font-body)", fontSize: 14,
                color: "var(--ink-800)", resize: "none",
                minHeight: 64, outline: "none"
              }}
            />
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div style={{
          padding: "20px 32px", marginTop: 24,
          borderTop: "1px solid var(--border-1)",
          background: "var(--bg-page)",
          display: "flex", alignItems: "center", gap: 16
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            background: "var(--bg-surface)", borderRadius: 999,
            padding: 4, boxShadow: "var(--shadow-inner)",
            border: "1px solid var(--border-2)"
          }}>
            <button style={{ width: 38, height: 38, borderRadius: "50%", background: "transparent", border: 0, color: "var(--ink-700)", cursor: "pointer", display: "grid", placeItems: "center" }}>
              <Icon name="minus" size={16}/>
            </button>
            <span style={{ minWidth: 28, textAlign: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, color: "var(--ink-800)" }}>1</span>
            <button style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--tomate-500)", border: 0, color: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}>
              <Icon name="plus" size={16} color="#fff" strokeWidth={2.5}/>
            </button>
          </div>
          <button className="btn btn-primary" style={{ flex: 1, padding: "16px 24px", fontSize: 15, justifyContent: "space-between" }}>
            <span>Adicionar à sacola</span>
            <span className="price" style={{ fontSize: 16 }}>R$ 23,90</span>
          </button>
        </div>
      </div>
    </div>
  );
}
window.ScreenAddItem = ScreenAddItem;
