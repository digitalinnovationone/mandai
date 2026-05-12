// Estados auxiliares — fluxos de exceção e tela de login (preparação v2).

// =========================================================================
// A. Restaurante fechado / fora do horário
// =========================================================================
function ScreenClosedRestaurant() {
  const sections = [
    { title: "Pães e bolos", items: [
      { name: "Pão de queijo (un.)", desc: "Massa de queijo da serra, assado na hora.", price: "R$ 4,50", img: "1509440159596-0249088772ff" },
      { name: "Pão na chapa com manteiga", desc: "Pão francês cortado e tostado na chapa.", price: "R$ 6,50", img: "1509440159596-0249088772ff" },
    ]},
    { title: "Café da manhã", items: [
      { name: "Tapioca de queijo coalho", desc: "Tapioca leve com queijo coalho derretido.", price: "R$ 18,90", img: "1639024471283-03518883512d" },
    ]},
  ];
  return (
    <div className="screen" data-screen-label="07 Restaurante fechado">
      <AppHeader cartCount={0}/>

      {/* Closed banner */}
      <div style={{ background: "var(--ink-800)", color: "#fff" }}>
        <div className="container" style={{ padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "grid", placeItems: "center" }}>
              <Icon name="clock" size={16} color="var(--manga-300)"/>
            </div>
            <div style={{ fontSize: 14 }}>
              <strong style={{ color: "var(--manga-300)" }}>Fechado agora.</strong>
              <span style={{ marginLeft: 8, color: "var(--ink-200)" }}>A Padaria do Zé abre amanhã às 7h.</span>
            </div>
          </div>
          <button className="btn btn-ghost" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.18)", padding: "8px 14px", fontSize: 13 }}>
            <Icon name="bell" size={13}/> Me avisa quando abrir
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: "relative", height: 280, overflow: "hidden",
        backgroundImage: `linear-gradient(180deg, rgba(28,24,18,0.1) 0%, rgba(28,24,18,0.55) 100%), url(${U("1509440159596-0249088772ff", 1600)})`,
        backgroundSize: "cover", backgroundPosition: "center", filter: "saturate(0.7)"
      }}>
        <div className="container" style={{ height: "100%", display: "flex", alignItems: "flex-end", paddingBottom: 28 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(28,24,18,0.7)", backdropFilter: "blur(4px)", padding: "6px 12px", borderRadius: 999, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--manga-400)" }}/>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>Fechado · Abre amanhã 7h</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>Padaria do Zé</h1>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginTop: 8 }}>
              Café da manhã · Padaria · R. Wisard, 348 — Vila Madalena
            </div>
          </div>
        </div>
      </div>

      <section className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        {/* Hours card */}
        <div className="card" style={{ padding: "20px 24px", marginBottom: 28, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--tomate-50)", color: "var(--tomate-600)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Icon name="clock" size={22}/>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.015em" }}>Horário de funcionamento</div>
              <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>
                Hoje fechou às 13h · Volta amanhã às 7h
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 13, color: "var(--ink-700)" }}>
            {[
              ["Seg–Sex", "7h – 13h"],
              ["Sábado", "7h – 14h"],
              ["Domingo", "Fechado", true],
            ].map(([day, hours, off], i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--fg-2)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{day}</span>
                <span className="price" style={{ fontSize: 14, color: off ? "var(--fg-3)" : "var(--ink-800)", fontWeight: 600 }}>{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu (read-only) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.02em", marginBottom: 4 }}>Cardápio</h2>
            <p style={{ fontSize: 13, color: "var(--fg-2)", marginBottom: 18 }}>
              Você pode ver o cardápio agora e fazer o pedido quando a padaria abrir.
            </p>
            {sections.map((s, si) => (
              <div key={si} style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink-800)", letterSpacing: "-0.01em", marginBottom: 12 }}>{s.title}</h3>
                <div className="card" style={{ padding: 0 }}>
                  {s.items.map((it, i) => (
                    <div key={i} style={{
                      padding: "18px 22px",
                      borderBottom: i < s.items.length - 1 ? "1px solid var(--border-1)" : 0,
                      display: "flex", gap: 18, alignItems: "center",
                      opacity: 0.6,
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink-800)" }}>{it.name}</div>
                        <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{it.desc}</div>
                        <div className="price" style={{ fontSize: 15, color: "var(--ink-700)", marginTop: 8 }}>{it.price}</div>
                      </div>
                      <div style={{
                        width: 96, height: 96, borderRadius: "var(--r-md)",
                        backgroundImage: `url(${U(it.img, 400)})`,
                        backgroundSize: "cover", backgroundPosition: "center",
                        filter: "grayscale(0.4)"
                      }}/>
                      <button disabled style={{
                        background: "var(--ink-100)", color: "var(--ink-500)",
                        border: 0, padding: "10px 18px", borderRadius: "var(--r-pill)",
                        fontSize: 13, fontWeight: 600, cursor: "not-allowed"
                      }}>
                        Indisponível
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ padding: 22, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--manga-50)", color: "var(--manga-500)", display: "grid", placeItems: "center", margin: "0 auto 12px" }}>
                <Icon name="bell" size={28}/>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.015em" }}>
                Avisa quando abrir?
              </div>
              <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 6, lineHeight: 1.45 }}>
                A gente te manda um zap às 7h amanhã pra você não esquecer do pão fresquinho.
              </p>
              <button className="btn btn-primary btn-block" style={{ marginTop: 14 }}>
                Quero ser avisada
              </button>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--ink-800)", margin: 0, marginBottom: 12 }}>
                Abertos agora pertinho
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { name: "Café da Esquina", time: "Aberto até 22h" },
                  { name: "Tapioca da Vila", time: "Aberto até 23h" },
                  { name: "Padaria União", time: "24h" },
                ].map((r, i) => (
                  <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-800)" }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "var(--folha-700)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--folha-500)" }}/>{r.time}
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} color="var(--fg-3)"/>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <AppFooter/>
    </div>
  );
}

// =========================================================================
// B. Item esgotado (cardápio + modal indisponível)
// =========================================================================
function ScreenOutOfStock() {
  return (
    <div className="screen" data-screen-label="08 Item esgotado" style={{ position: "relative" }}>
      <AppHeader cartCount={2}/>

      <section className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)", marginBottom: 14 }}>
          <a href="#" style={{ color: "var(--fg-2)" }}>Home</a> ›
          <a href="#" style={{ color: "var(--fg-2)" }}>Padarias</a> ›
          <span style={{ color: "var(--ink-700)" }}>Padaria do Zé</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.03em", marginBottom: 6 }}>Padaria do Zé</h1>
        <div style={{ fontSize: 14, color: "var(--fg-2)", marginBottom: 24 }}>
          Café da manhã · <span style={{ color: "var(--folha-700)", fontWeight: 600 }}>Aberto agora</span> · Pronto em ~18 min
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.02em", marginBottom: 14 }}>Pães e bolos</h2>

        <div className="card" style={{ padding: 0, marginBottom: 28 }}>
          {[
            { name: "Pão de queijo (un.)", desc: "Massa de queijo da serra, assado na hora.", price: "R$ 4,50", img: "1509440159596-0249088772ff", stock: "ok" },
            { name: "Pão na chapa com manteiga", desc: "Pão francês cortado e tostado na chapa.", price: "R$ 6,50", img: "1509440159596-0249088772ff", stock: "out" },
            { name: "Bolo de fubá", desc: "Fofinho, com casquinha de açúcar e erva-doce.", price: "R$ 8,90", img: "1639024471283-03518883512d", stock: "low" },
            { name: "Croissant de manteiga", desc: "Massa folhada francesa, assada de manhã cedinho.", price: "R$ 12,00", img: "1565299624946-b28f40a0ae38", stock: "ok" },
          ].map((it, i, arr) => {
            const out = it.stock === "out";
            const low = it.stock === "low";
            return (
              <div key={i} style={{
                padding: "18px 22px",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border-1)" : 0,
                display: "flex", gap: 18, alignItems: "center"
              }}>
                <div style={{ flex: 1, opacity: out ? 0.45 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink-800)" }}>{it.name}</span>
                    {out && (
                      <span style={{ background: "var(--ink-100)", color: "var(--ink-600)", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase" }}>Esgotado</span>
                    )}
                    {low && (
                      <span style={{ background: "var(--manga-50)", color: "var(--manga-500)", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase" }}>Últimas unidades</span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{it.desc}</div>
                  <div className="price" style={{ fontSize: 15, color: "var(--ink-700)", marginTop: 8 }}>{it.price}</div>
                </div>
                <div style={{
                  width: 96, height: 96, borderRadius: "var(--r-md)",
                  backgroundImage: `url(${U(it.img, 400)})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  filter: out ? "grayscale(1) brightness(0.95)" : "none",
                  opacity: out ? 0.5 : 1,
                  position: "relative"
                }}>
                  {out && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(28,24,18,0.25)", borderRadius: "var(--r-md)", display: "grid", placeItems: "center" }}>
                      <Icon name="x" size={26} color="#fff" strokeWidth={2.5}/>
                    </div>
                  )}
                </div>
                {out ? (
                  <button className="btn btn-secondary" style={{ padding: "10px 16px", fontSize: 12 }}>
                    <Icon name="bell" size={12}/> Me avisa
                  </button>
                ) : (
                  <button className="btn" style={{
                    background: "var(--tomate-500)", color: "#fff",
                    padding: "10px 18px", fontSize: 13, fontWeight: 600
                  }}>
                    <Icon name="plus" size={14} color="#fff" strokeWidth={2.5}/> Adicionar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Out-of-stock modal overlay */}
      <div style={{
        position: "absolute", inset: 0, background: "rgba(28,24,18,0.45)",
        display: "grid", placeItems: "center", paddingTop: 200
      }}>
        <div style={{
          width: 440, background: "var(--bg-surface)",
          borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-pop)",
          padding: 28, textAlign: "center", position: "relative"
        }}>
          <button style={{
            position: "absolute", top: 14, right: 14,
            background: "transparent", border: 0, color: "var(--fg-3)", cursor: "pointer", padding: 6
          }}>
            <Icon name="x" size={18}/>
          </button>

          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "var(--manga-50)", color: "var(--manga-500)",
            display: "grid", placeItems: "center", margin: "0 auto 14px"
          }}>
            <Icon name="package" size={32}/>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.02em", marginBottom: 8 }}>
            Esgotou agora mesmo, viu
          </h3>
          <p style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.5, marginBottom: 20 }}>
            O <strong style={{ color: "var(--ink-800)" }}>Pão na chapa com manteiga</strong> acabou na Padaria do Zé. A gente pode te avisar quando voltar a ter.
          </p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn btn-secondary" style={{ padding: "12px 18px", fontSize: 14 }}>
              Escolher outro
            </button>
            <button className="btn btn-primary" style={{ padding: "12px 18px", fontSize: 14 }}>
              <Icon name="bell" size={14}/> Me avisa quando voltar
            </button>
          </div>
        </div>
      </div>

      <AppFooter/>
    </div>
  );
}

// =========================================================================
// C. Login (preparação v2 — opcional, pula direto pra pedido)
// =========================================================================
function ScreenLogin() {
  return (
    <div className="screen" data-screen-label="09 Login" style={{ minHeight: "100%", background: "var(--bg-page)" }}>
      <AppHeader cartCount={0}/>

      <section style={{ padding: "56px 0 80px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>

          {/* Visual side */}
          <div style={{
            position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden",
            background: "var(--ink-800)", color: "#fff",
            padding: "44px 36px", minHeight: 460,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            boxShadow: "var(--shadow-3)"
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "rgba(255,255,255,0.08)", borderRadius: 999, marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--folha-400)" }}/>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Em breve · v2</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff" }}>
                Entra na sua conta<br/>e pede mais rápido.
              </h2>
              <p style={{ fontSize: 15, color: "var(--ink-200)", marginTop: 14, lineHeight: 1.5, maxWidth: 340 }}>
                Seus pedidos favoritos salvos, restaurantes que você curtiu e cupons só pra você.
              </p>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["repeat", "Reordenar em 2 cliques"],
                ["heart", "Restaurantes favoritos"],
                ["ticket", "Cupons exclusivos"],
              ].map(([ic, txt], i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", color: "var(--tomate-300)", display: "grid", placeItems: "center" }}>
                    <Icon name={ic} size={16} color="var(--tomate-300)"/>
                  </span>
                  <span style={{ fontSize: 14, color: "#fff" }}>{txt}</span>
                </li>
              ))}
            </ul>

            {/* Decoration */}
            <svg viewBox="0 0 200 200" style={{ position: "absolute", right: -50, top: -40, width: 220, height: 220, opacity: 0.08 }} aria-hidden="true">
              <circle cx="100" cy="100" r="90" fill="var(--tomate-500)"/>
            </svg>
          </div>

          {/* Form side */}
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Bem-vinda de volta
            </h1>
            <p style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 8 }}>
              Entra com seu celular ou e-mail.
            </p>

            <div style={{ marginTop: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-700)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Celular ou e-mail</label>
              <input defaultValue="marina@mandai.app" style={{
                display: "block", width: "100%", boxSizing: "border-box",
                background: "var(--bg-surface)",
                border: "1.5px solid var(--tomate-500)",
                borderRadius: "var(--r-sm)",
                padding: "14px 16px", marginTop: 8,
                fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500,
                color: "var(--ink-800)", outline: "none",
                boxShadow: "0 0 0 3px var(--tomate-50)"
              }}/>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-700)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Senha</label>
                <a href="#" style={{ fontSize: 12, color: "var(--tomate-600)", fontWeight: 600 }}>Esqueci a senha</a>
              </div>
              <div style={{ position: "relative", marginTop: 8 }}>
                <input type="password" defaultValue="••••••••••" style={{
                  display: "block", width: "100%", boxSizing: "border-box",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-2)",
                  borderRadius: "var(--r-sm)",
                  padding: "14px 44px 14px 16px",
                  fontFamily: "var(--font-body)", fontSize: 15,
                  color: "var(--ink-800)", outline: "none"
                }}/>
                <button style={{
                  position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                  background: "transparent", border: 0, color: "var(--fg-3)", cursor: "pointer", padding: 8
                }}>
                  <Icon name="eye" size={16}/>
                </button>
              </div>
            </div>

            <button className="btn btn-primary btn-block" style={{ marginTop: 24, padding: "14px 24px", fontSize: 15 }}>
              Entrar <Icon name="arrow-right" size={15}/>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
              <hr style={{ flex: 1, border: 0, borderTop: "1px solid var(--border-1)" }}/>
              <span style={{ fontSize: 11, color: "var(--fg-3)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>ou continue com</span>
              <hr style={{ flex: 1, border: 0, borderTop: "1px solid var(--border-1)" }}/>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button className="btn btn-secondary" style={{ padding: "12px 14px", fontSize: 13, justifyContent: "center" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", display: "inline-grid", placeItems: "center", border: "1px solid var(--border-1)", fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 800, color: "#4285F4" }}>G</span>
                Google
              </button>
              <button className="btn btn-secondary" style={{ padding: "12px 14px", fontSize: 13, justifyContent: "center" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--folha-500)", display: "inline-grid", placeItems: "center", color: "#fff" }}>
                  <Icon name="phone" size={10} color="#fff" strokeWidth={2.5}/>
                </span>
                WhatsApp
              </button>
            </div>

            <div style={{ marginTop: 28, padding: "14px 16px", background: "var(--manga-50)", borderRadius: "var(--r-sm)", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon name="info" size={14} color="var(--manga-500)"/>
              <div style={{ fontSize: 12, color: "var(--ink-800)", lineHeight: 1.45 }}>
                <strong>Não tem conta?</strong> Na v1 você nem precisa — <a href="#" style={{ color: "var(--tomate-600)", fontWeight: 700 }}>continua sem cadastro</a> e a gente pede só seu nome no balcão.
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppFooter/>
    </div>
  );
}

// =========================================================================
// D. Erro — falha ao confirmar o pedido
// =========================================================================
function ScreenError() {
  return (
    <div className="screen" data-screen-label="10 Erro">
      <AppHeader cartCount={4}/>

      <section style={{ padding: "64px 0 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>

          <div className="card" style={{ padding: "48px 56px", position: "relative", overflow: "hidden" }}>

            {/* decoration */}
            <svg viewBox="0 0 200 200" style={{ position: "absolute", right: -40, bottom: -50, width: 240, height: 240, opacity: 0.06 }} aria-hidden="true">
              <path d="M40 100 L100 30 L160 100 L100 170 Z" fill="var(--tomate-500)"/>
            </svg>

            <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
              <div style={{
                width: 96, height: 96, borderRadius: "50%",
                background: "var(--tomate-50)", color: "var(--tomate-500)",
                display: "grid", placeItems: "center", flexShrink: 0
              }}>
                <Icon name="alert-triangle" size={44} strokeWidth={2}/>
              </div>
              <div style={{ flex: 1 }}>
                <div className="eyebrow" style={{ color: "var(--tomate-600)" }}>Algo deu errado</div>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "var(--ink-800)", letterSpacing: "-0.03em", lineHeight: 1.05, marginTop: 6 }}>
                  Ih, deu ruim aqui.
                </h1>
                <p style={{ fontSize: 15, color: "var(--fg-2)", marginTop: 10, maxWidth: 520, lineHeight: 1.5 }}>
                  A gente não conseguiu enviar seu pedido pra Padaria do Zé agora. Pode ser a internet ou o restaurante teve um problema rápido. <strong style={{ color: "var(--ink-800)" }}>Seu rango tá salvo</strong> — só tentar de novo.
                </p>

                <div style={{ marginTop: 22, padding: "14px 18px", background: "var(--bg-page)", borderRadius: "var(--r-sm)", border: "1px solid var(--border-1)", display: "flex", alignItems: "center", gap: 14 }}>
                  <Icon name="info" size={16} color="var(--fg-3)"/>
                  <div style={{ flex: 1, fontSize: 13, color: "var(--ink-700)" }}>
                    <span style={{ fontWeight: 600 }}>Código do erro:</span>{" "}
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-800)" }}>NET_504_GW_TIMEOUT</span>
                  </div>
                  <button style={{ background: "transparent", border: 0, color: "var(--tomate-600)", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
                    Copiar
                  </button>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
                  <button className="btn btn-primary" style={{ padding: "14px 26px", fontSize: 15 }}>
                    <Icon name="repeat" size={15}/> Tentar de novo
                  </button>
                  <button className="btn btn-secondary" style={{ padding: "14px 22px", fontSize: 14 }}>
                    Voltar pra sacola
                  </button>
                  <button className="btn btn-ghost" style={{ padding: "14px 18px", fontSize: 14, color: "var(--fg-2)" }}>
                    Falar com a gente
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status checks */}
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { ic: "wifi", label: "Sua conexão", val: "Conectada", color: "folha" },
              { ic: "store", label: "Padaria do Zé", val: "Verificando…", color: "manga" },
              { ic: "credit-card", label: "Pedido salvo", val: "OK, sem perda", color: "folha" },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `var(--${s.color}-50)`, color: `var(--${s.color}-600)`,
                  display: "grid", placeItems: "center"
                }}>
                  <Icon name={s.ic} size={16}/>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: `var(--${s.color}-700)`, fontWeight: 600, marginTop: 2 }}>{s.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppFooter/>
    </div>
  );
}

window.ScreenClosedRestaurant = ScreenClosedRestaurant;
window.ScreenOutOfStock = ScreenOutOfStock;
window.ScreenLogin = ScreenLogin;
window.ScreenError = ScreenError;
