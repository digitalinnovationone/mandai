import Link from "next/link";

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="cols">
        <div>
          <div className="word-lg">mandaí</div>
          <p className="tag">
            A comida boa do bairro chega rapidinho. Retire no balcão e leva pra
            casa quentinho.
          </p>
        </div>
        <div>
          <h4>Mandaí</h4>
          <ul>
            <li>
              <Link href="#">Sobre a gente</Link>
            </li>
            <li>
              <Link href="#">Como funciona</Link>
            </li>
            <li>
              <Link href="#">Carreiras</Link>
            </li>
            <li>
              <Link href="#">Imprensa</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Restaurantes</h4>
          <ul>
            <li>
              <Link href="#">Cadastrar restaurante</Link>
            </li>
            <li>
              <Link href="#">Portal do parceiro</Link>
            </li>
            <li>
              <Link href="#">Boas práticas</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Ajuda</h4>
          <ul>
            <li>
              <Link href="#">Central de ajuda</Link>
            </li>
            <li>
              <Link href="#">Termos de uso</Link>
            </li>
            <li>
              <Link href="#">Política de privacidade</Link>
            </li>
            <li>
              <Link href="#">Fale com a gente</Link>
            </li>
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
