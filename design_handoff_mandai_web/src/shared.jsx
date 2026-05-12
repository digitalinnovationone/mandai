// Shared UI for the Mandaí web mockups.
// Exposed on window so each screen-*.jsx can use them.

// ─── Icon (Lucide via stroke SVG paths) ────────────────────────
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75 }) {
  const paths = {
    "search": <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    "shopping-bag": <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    "map-pin": <><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
    "star": <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>,
    "clock": <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    "chevron-right": <polyline points="9 18 15 12 9 6"/>,
    "chevron-down": <polyline points="6 9 12 15 18 9"/>,
    "chevron-left": <polyline points="15 18 9 12 15 6"/>,
    "heart": <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>,
    "x": <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    "plus": <><path d="M5 12h14"/><path d="M12 5v14"/></>,
    "minus": <path d="M5 12h14"/>,
    "trash": <><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    "user": <><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></>,
    "package": <><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></>,
    "check": <polyline points="20 6 9 17 4 12"/>,
    "check-circle": <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    "copy": <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    "download": <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    "share-2": <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    "info": <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    "ticket": <path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>,
    "flame": <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
    "filter": <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
    "arrow-right": <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    "phone": <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    "store": <><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-2.6-1.8 1.3 1.3 0 0 0-2.5 0A2.7 2.7 0 0 1 12 12v0a2.7 2.7 0 0 1-2.6-1.8 1.3 1.3 0 0 0-2.5 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></>,
    "bell": <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    "repeat": <><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></>,
    "eye": <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
    "wifi": <><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
    "credit-card": <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    "alert-triangle": <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

// ─── Header ────────────────────────────────────────────────────
function AppHeader({ cartCount = 0, query = "", showSearch = true }) {
  return (
    <header className="app-header">
      <div className="inner">
        <a className="brand" href="#">
          <span className="mark">M</span>
          <span className="word">mandaí</span>
        </a>
        <button className="pickup-pill">
          <span className="ico"><Icon name="store" size={14}/></span>
          <span className="txt">
            <span className="lbl">Retirar em</span>
            <span className="val">Padaria do Zé · Vila Madalena ▾</span>
          </span>
        </button>
        {showSearch && (
          <div className="search-bar">
            <span className="ico"><Icon name="search" size={16}/></span>
            <input placeholder="Busca restaurante, prato ou cozinha…" defaultValue={query}/>
          </div>
        )}
        <button className="bag-btn">
          <Icon name="shopping-bag" size={16}/>
          <span>Sacola</span>
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

// ─── Footer ────────────────────────────────────────────────────
function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="cols">
        <div>
          <div className="word-lg">mandaí</div>
          <p className="tag">A comida boa do bairro chega rapidinho. Retire no balcão e leva pra casa quentinho.</p>
        </div>
        <div>
          <h4>Mandaí</h4>
          <ul>
            <li>Sobre a gente</li>
            <li>Como funciona</li>
            <li>Carreiras</li>
            <li>Imprensa</li>
          </ul>
        </div>
        <div>
          <h4>Restaurantes</h4>
          <ul>
            <li>Cadastrar restaurante</li>
            <li>Portal do parceiro</li>
            <li>Boas práticas</li>
          </ul>
        </div>
        <div>
          <h4>Ajuda</h4>
          <ul>
            <li>Central de ajuda</li>
            <li>Termos de uso</li>
            <li>Política de privacidade</li>
            <li>Fale com a gente</li>
          </ul>
        </div>
      </div>
      <div className="legal">
        <span>© 2026 Mandaí Tecnologia LTDA · CNPJ 00.000.000/0001-00</span>
        <span>São Paulo · Rio · BH · Curitiba</span>
      </div>
    </footer>
  );
}

// ─── Restaurant card ───────────────────────────────────────────
function RestaurantCard({ r }) {
  return (
    <div className="r-card">
      <div className="cover" style={{ backgroundImage: `url(${r.cover})` }}>
        {r.promo && (
          <span className={`promo-badge ${r.promo.color || ""}`}>
            {r.promo.icon && <Icon name={r.promo.icon} size={12}/>}
            {r.promo.label}
          </span>
        )}
        <button className="fav"><Icon name="heart" size={16}/></button>
      </div>
      <div className="body">
        <div className="row">
          <div className="name">{r.name}</div>
          <div className="rating"><Icon name="star" size={11} color="var(--folha-600)"/> {r.rating}</div>
        </div>
        <div className="tags">{r.tags}</div>
        <div className="meta">
          <span><Icon name="clock" size={12}/> {r.eta}</span>
          <span className="dot">·</span>
          <span>{r.distance}</span>
          <span className="dot">·</span>
          <span className={r.fee === "Retirada grátis" ? "free" : ""}>{r.fee}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Sample data (Unsplash imagery) ────────────────────────────
const U = (id, w=800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const DATA = {
  categories: [
    { id: "pizza",    label: "Pizza",        emoji: "🍕", bg: "var(--tomate-50)" },
    { id: "japa",     label: "Japonesa",     emoji: "🍱", bg: "var(--folha-50)" },
    { id: "burger",   label: "Hambúrguer",   emoji: "🍔", bg: "var(--manga-50)" },
    { id: "acai",     label: "Açaí",         emoji: "🥭", bg: "#F6E9F2" },
    { id: "saudavel", label: "Saudável",     emoji: "🥗", bg: "var(--folha-50)" },
    { id: "doces",    label: "Doces",        emoji: "🍰", bg: "var(--manga-50)" },
    { id: "bebidas",  label: "Bebidas",      emoji: "🥤", bg: "#E0EEF0" },
    { id: "brasileira", label: "Brasileira", emoji: "🌶️", bg: "var(--tomate-50)" },
  ],
  restaurants: [
    { id: "ze",     name: "Padaria do Zé",     tags: "Padaria · Café · Brunch",  rating: "4,8", eta: "20–30 min", distance: "1,2 km", fee: "Retirada grátis", cover: U("1509440159596-0249088772ff"), promo: { label: "Retirada grátis", color: "folha" } },
    { id: "tomie",  name: "Tomie Sushi",       tags: "Japonesa · Combinados",    rating: "4,7", eta: "35–45 min", distance: "2,4 km", fee: "Pronto em 25 min", cover: U("1579871494447-9811cf80d66c") },
    { id: "vovo",   name: "Comida da Vovó",    tags: "Brasileira · Caseira",     rating: "4,9", eta: "25–35 min", distance: "0,8 km", fee: "Pronto em 18 min", cover: U("1604329760661-e71dc83f8f26"), promo: { label: "30% off no almoço", color: "manga", icon: "flame" } },
    { id: "burgao", name: "Burgão da Esquina", tags: "Hambúrguer · Batata frita", rating: "4,6", eta: "30–40 min", distance: "1,8 km", fee: "Pronto em 22 min", cover: U("1568901346375-23c9450c58cd") },
    { id: "manga",  name: "Açaí da Manga",     tags: "Açaí · Sucos · Tigelas",   rating: "4,8", eta: "15–25 min", distance: "0,6 km", fee: "Retirada grátis", cover: U("1490474418585-ba9bad8fd0ea"), promo: { label: "Retirada grátis", color: "folha" } },
    { id: "horta",  name: "Hortaliça Bistrô",  tags: "Saudável · Veggie",        rating: "4,7", eta: "30–40 min", distance: "2,1 km", fee: "Pronto em 28 min", cover: U("1546069901-ba9599a7e63c") },
    { id: "napoli", name: "Napoli Pizza Bar",  tags: "Pizza · Italiana",         rating: "4,9", eta: "30–40 min", distance: "1,5 km", fee: "Pronto em 25 min", cover: U("1513104890138-7c749659a591"), promo: { label: "Compre 1, leve 2", color: "manga", icon: "ticket" } },
    { id: "donapao", name: "Dona Paola",       tags: "Massas · Italiana",        rating: "4,7", eta: "35–45 min", distance: "1,9 km", fee: "Pronto em 30 min", cover: U("1551183053-bf91a1d81141") },
    { id: "cantina", name: "Cantina da Praça", tags: "Brasileira · Bar",         rating: "4,6", eta: "25–35 min", distance: "1,1 km", fee: "Pronto em 22 min", cover: U("1467003909585-2f8a72700288") },
  ],
};

Object.assign(window, { Icon, AppHeader, AppFooter, RestaurantCard, DATA, U });
