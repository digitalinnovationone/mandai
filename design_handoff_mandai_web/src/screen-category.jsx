// Tela 2 — Restaurantes por categoria (Pizza)
function ScreenCategory() {
  const cat = "Pizza";
  return (
    <div className="screen" data-screen-label="02 Categoria">
      <AppHeader cartCount={0}/>

      {/* Breadcrumb + header */}
      <section className="container" style={{ paddingTop: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)" }}>
          <a href="#" style={{ color: "var(--fg-2)" }}>Início</a>
          <Icon name="chevron-right" size={12}/>
          <span style={{ color: "var(--ink-800)", fontWeight: 600 }}>{cat}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 16, gap: 24 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 800, letterSpacing: "-0.035em", color: "var(--ink-800)", lineHeight: 1 }}>
              {cat} pertinho de você
            </h1>
            <div style={{ color: "var(--fg-2)", marginTop: 10, fontSize: 15 }}>
              <span style={{ fontWeight: 600, color: "var(--ink-700)" }}>32 restaurantes</span> em Vila Madalena · prontos pra retirada
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary" style={{ padding: "12px 18px", fontSize: 14 }}>
              <Icon name="filter" size={14}/> Filtros
            </button>
            <button className="btn btn-secondary" style={{ padding: "12px 18px", fontSize: 14 }}>
              Ordenar: Distância <Icon name="chevron-down" size={14}/>
            </button>
          </div>
        </div>
      </section>

      {/* Sub-filters */}
      <section className="container" style={{ paddingTop: 24 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "Todos", active: true },
            { label: "Aberto agora" },
            { label: "Retirada grátis" },
            { label: "Avaliação 4,5+" },
            { label: "Promoções" },
            { label: "Pronto em 20 min" },
            { label: "R$ até 50" },
            { label: "Forno a lenha" },
          ].map((f, i) => (
            <button key={i} className={`cat-chip ${f.active ? "active" : ""}`}>
              {f.active && <Icon name="check" size={13}/>}
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured promo banner */}
      <section className="container" style={{ paddingTop: 28 }}>
        <div style={{ background: "var(--tomate-500)", borderRadius: "var(--r-xl)", padding: "24px 32px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "var(--shadow-2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "grid", placeItems: "center" }}>
              <Icon name="ticket" size={26}/>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>Compre 1, leve 2 nas grandes</div>
              <div style={{ opacity: 0.9, fontSize: 14, marginTop: 4 }}>Promo válida em 4 pizzarias do bairro · só hoje</div>
            </div>
          </div>
          <button className="btn" style={{ background: "#fff", color: "var(--tomate-600)", fontWeight: 700 }}>
            Ver pizzarias <Icon name="arrow-right" size={14}/>
          </button>
        </div>
      </section>

      {/* Restaurants grid */}
      <section className="container" style={{ paddingTop: 36 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { ...DATA.restaurants[6], name: "Napoli Pizza Bar" },
            { id: "pizz2", name: "Bráz Pizzaria", tags: "Pizza · Forno a lenha", rating: "4,8", eta: "30–40 min", distance: "1,1 km", fee: "Pronto em 25 min", cover: U("1571407970349-bc81e7e96d47") },
            { id: "pizz3", name: "Capricciosa", tags: "Pizza · Italiana", rating: "4,7", eta: "35–45 min", distance: "1,8 km", fee: "Retirada grátis", cover: U("1565299624946-b28f40a0ae38"), promo: { label: "Retirada grátis", color: "folha" } },
            { id: "pizz4", name: "Pizzaria do Bigode", tags: "Pizza · Brasileira", rating: "4,6", eta: "25–35 min", distance: "0,7 km", fee: "Pronto em 20 min", cover: U("1593560708920-61dd98c46a4e"), promo: { label: "Compre 1, leve 2", color: "manga", icon: "ticket" } },
            { id: "pizz5", name: "Mamma Mia", tags: "Pizza · Massas", rating: "4,5", eta: "30–40 min", distance: "1,4 km", fee: "Pronto em 28 min", cover: U("1574071318508-1cdbab80d002") },
            { id: "pizz6", name: "Forneria 900", tags: "Pizza · Napolitana", rating: "4,9", eta: "35–45 min", distance: "2,0 km", fee: "Pronto em 30 min", cover: U("1542834369-f10ebf06d3e0"), promo: { label: "Top do mês", color: "manga", icon: "flame" } },
          ].map((r) => <RestaurantCard key={r.id} r={r}/>)}
        </div>
      </section>

      <section className="container" style={{ paddingTop: 24 }}>
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <button className="btn btn-secondary" style={{ padding: "14px 28px" }}>Carregar mais pizzarias</button>
        </div>
      </section>

      <AppFooter/>
    </div>
  );
}
window.ScreenCategory = ScreenCategory;
