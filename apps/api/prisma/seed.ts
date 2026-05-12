import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data in dependency order
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuSection.deleteMany();
  await prisma.restaurant.deleteMany();

  // Helper: Unsplash URL builder (same pattern as handoff U(id, w))
  const U = (id: string, w = 800) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

  // ─── RESTAURANTS ──────────────────────────────────────────────────────────

  const pizzaria = await prisma.restaurant.create({
    data: {
      name: 'Napoletana',
      slug: 'napoletana',
      category: 'pizza',
      rating: 4.8,
      distanceMeters: 480,
      coverUrl: U('1513104890138-f7adad644bde'),
      isOpen: true,
      address: 'R. Wisard, 348',
      neighborhood: 'Vila Madalena',
      phone: '(11) 2389-0042',
    },
  });

  const hamburgueria = await prisma.restaurant.create({
    data: {
      name: 'Smash Bros Burgers',
      slug: 'smash-bros-burgers',
      category: 'hamburger',
      rating: 4.6,
      distanceMeters: 720,
      coverUrl: U('1568901346375-8e075b5ab12e'),
      isOpen: true,
      address: 'Av. Brigadeiro Faria Lima, 1752',
      neighborhood: 'Pinheiros',
      phone: '(11) 3031-5544',
    },
  });

  const japonesa = await prisma.restaurant.create({
    data: {
      name: 'Sakura Sushi Bar',
      slug: 'sakura-sushi-bar',
      category: 'japonesa',
      rating: 4.9,
      distanceMeters: 1100,
      coverUrl: U('1617196034183-421b4040ed20'),
      isOpen: true,
      address: 'R. Haddock Lobo, 595',
      neighborhood: 'Jardins',
      phone: '(11) 3062-8890',
    },
  });

  const mexicana = await prisma.restaurant.create({
    data: {
      name: 'El Taco Loco',
      slug: 'el-taco-loco',
      category: 'mexicana',
      rating: 4.5,
      distanceMeters: 950,
      coverUrl: U('1565299585323-38d6b0865b47'),
      isOpen: false,
      address: 'R. Amauri, 255',
      neighborhood: 'Itaim Bibi',
      phone: '(11) 3079-1133',
    },
  });

  const padaria = await prisma.restaurant.create({
    data: {
      name: 'Pão & Cia',
      slug: 'pao-e-cia',
      category: 'padaria',
      rating: 4.3,
      distanceMeters: 320,
      coverUrl: U('1509440159596-0249088772ff'),
      isOpen: true,
      address: 'R. dos Pinheiros, 1001',
      neighborhood: 'Pinheiros',
      phone: '(11) 3088-2244',
    },
  });

  const brasileira = await prisma.restaurant.create({
    data: {
      name: 'Tempero da Vó',
      slug: 'tempero-da-vo',
      category: 'brasileira',
      rating: 4.7,
      distanceMeters: 660,
      coverUrl: U('1555939594-58d7cb561ad6'),
      isOpen: true,
      address: 'R. Mateus Grou, 148',
      neighborhood: 'Pinheiros',
      phone: '(11) 3031-9977',
    },
  });

  const acaiteria = await prisma.restaurant.create({
    data: {
      name: 'Açaí do Paraíso',
      slug: 'acai-do-paraiso',
      category: 'acaiteria',
      rating: 4.4,
      distanceMeters: 410,
      coverUrl: U('1547592166-23ac88d45388'),
      isOpen: true,
      address: 'R. Cardeal Arcoverde, 2368',
      neighborhood: 'Pinheiros',
      phone: '(11) 3032-7788',
    },
  });

  const saudavel = await prisma.restaurant.create({
    data: {
      name: 'Green Bowl',
      slug: 'green-bowl',
      category: 'saudavel',
      rating: 4.6,
      distanceMeters: 800,
      coverUrl: U('1512621776951-a57ef51aec59'),
      isOpen: true,
      address: 'Al. Lorena, 1748',
      neighborhood: 'Jardins',
      phone: '(11) 3064-1122',
    },
  });

  // ─── MENUS ────────────────────────────────────────────────────────────────

  // Napoletana
  const pizzaTrads = await prisma.menuSection.create({
    data: {
      restaurantId: pizzaria.id,
      name: 'Tradicionais',
      order: 1,
    },
  });
  const pizzaEspeciais = await prisma.menuSection.create({
    data: {
      restaurantId: pizzaria.id,
      name: 'Especiais da casa',
      order: 2,
    },
  });
  const pizzaBebidas = await prisma.menuSection.create({
    data: {
      restaurantId: pizzaria.id,
      name: 'Bebidas',
      order: 3,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        sectionId: pizzaTrads.id,
        name: 'Margherita',
        description: 'Molho de tomate San Marzano, mussarela de búfala, manjericão fresco e azeite extravirgem.',
        priceCents: 5290,
        imageUrl: U('1574071318508-1cdbab80d002', 400),
        available: true,
      },
      {
        sectionId: pizzaTrads.id,
        name: 'Pepperoni',
        description: 'Molho de tomate, mussarela, rodelas generosas de pepperoni importado.',
        priceCents: 5890,
        imageUrl: U('1628840042759-356c25776959', 400),
        available: true,
      },
      {
        sectionId: pizzaTrads.id,
        name: 'Quatro Queijos',
        description: 'Mussarela, provolone, gorgonzola e parmesão sobre molho branco.',
        priceCents: 6190,
        imageUrl: U('1548369937-47519962c11a', 400),
        available: true,
      },
      {
        sectionId: pizzaEspeciais.id,
        name: 'Burrata & Rúcula',
        description: 'Molho de tomate assado, burrata fresca, rúcula, raspas de limão-siciliano.',
        priceCents: 7490,
        imageUrl: U('1565299624596-05b3e9ead3ae', 400),
        available: true,
      },
      {
        sectionId: pizzaEspeciais.id,
        name: 'Nduja Calabresa',
        description: 'Embutido picante calabrês, mussarela defumada e mel da casa.',
        priceCents: 7990,
        imageUrl: U('1590947132387-155cc02f3212', 400),
        available: false,
      },
      {
        sectionId: pizzaBebidas.id,
        name: 'Limonada Siciliana',
        description: 'Limão-siciliano, leite condensado, água com gás. 500 ml.',
        priceCents: 1590,
        imageUrl: U('1621263343409-35bda4b5c325', 400),
        available: true,
      },
      {
        sectionId: pizzaBebidas.id,
        name: 'Água Mineral',
        description: 'Sem gás ou com gás. 500 ml.',
        priceCents: 590,
        imageUrl: U('1548839271-9853b1ba2093', 400),
        available: true,
      },
    ],
  });

  // Smash Bros Burgers
  const burguerClassicos = await prisma.menuSection.create({
    data: {
      restaurantId: hamburgueria.id,
      name: 'Clássicos',
      order: 1,
    },
  });
  const burguerEspeciais = await prisma.menuSection.create({
    data: {
      restaurantId: hamburgueria.id,
      name: 'Especiais',
      order: 2,
    },
  });
  const burguerAcompanhamentos = await prisma.menuSection.create({
    data: {
      restaurantId: hamburgueria.id,
      name: 'Acompanhamentos',
      order: 3,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        sectionId: burguerClassicos.id,
        name: 'Classic Smash',
        description: 'Blend 170g smashed, queijo americano, pickles, cebola caramelizada, molho especial, brioche.',
        priceCents: 3290,
        imageUrl: U('1568901346375-8e075b5ab12e', 400),
        available: true,
      },
      {
        sectionId: burguerClassicos.id,
        name: 'Double Smash',
        description: 'Dois blends 170g smashed, queijo cheddar duplo, alface, tomate, pickles, brioche.',
        priceCents: 4490,
        imageUrl: U('1551782045-0c5b9b4c1b7f', 400),
        available: true,
      },
      {
        sectionId: burguerEspeciais.id,
        name: 'Truffle Shroom',
        description: 'Blend 200g, cogumelos salteados, queijo gruyère, aioli de trufa, rúcula, brioche artesanal.',
        priceCents: 5290,
        imageUrl: U('1547592180-85f173990554', 400),
        available: true,
      },
      {
        sectionId: burguerEspeciais.id,
        name: 'BBQ Bacon Crush',
        description: 'Blend 200g, bacon crocante, molho BBQ defumado, queijo gouda, cebola crispy.',
        priceCents: 4990,
        imageUrl: U('1565299624596-05b3e9ead3ae', 400),
        available: true,
      },
      {
        sectionId: burguerAcompanhamentos.id,
        name: 'Batata Frita Clássica',
        description: 'Batata frita crocante com flor de sal. Porção 200g.',
        priceCents: 1590,
        imageUrl: U('1573080496219-a04dcab47aa7', 400),
        available: true,
      },
      {
        sectionId: burguerAcompanhamentos.id,
        name: 'Onion Rings',
        description: 'Anéis de cebola empanados na panko com molho ranch.',
        priceCents: 1890,
        imageUrl: U('1598679253544-4a6c9c4d3a6c', 400),
        available: true,
      },
    ],
  });

  // Sakura Sushi Bar
  const sushiEntradas = await prisma.menuSection.create({
    data: {
      restaurantId: japonesa.id,
      name: 'Entradas',
      order: 1,
    },
  });
  const sushiCombos = await prisma.menuSection.create({
    data: {
      restaurantId: japonesa.id,
      name: 'Combos',
      order: 2,
    },
  });
  const sushiHot = await prisma.menuSection.create({
    data: {
      restaurantId: japonesa.id,
      name: 'Hot Rolls',
      order: 3,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        sectionId: sushiEntradas.id,
        name: 'Edamame no Shoyu',
        description: 'Soja cozida no vapor com molho shoyu e sal marinho.',
        priceCents: 1490,
        imageUrl: U('1617196034183-421b4040ed20', 400),
        available: true,
      },
      {
        sectionId: sushiEntradas.id,
        name: 'Gyoza Grelhado (6 un)',
        description: 'Gyoza de carne suína e repolho, grelhado na chapa, molho ponzu.',
        priceCents: 2290,
        imageUrl: U('1552611052-33e04de567d2', 400),
        available: true,
      },
      {
        sectionId: sushiCombos.id,
        name: 'Combo Sakura (20 un)',
        description: '8 niguiris variados + 8 uramaki Filadélfia + 4 temaki mini.',
        priceCents: 8990,
        imageUrl: U('1611143669185-af224c5e3252', 400),
        available: true,
      },
      {
        sectionId: sushiCombos.id,
        name: 'Combo Premium (30 un)',
        description: '10 niguiris premium (atum e salmão) + 10 uramaki tropical + 10 hot rolls.',
        priceCents: 12990,
        imageUrl: U('1617196034873-878e5e680e09', 400),
        available: true,
      },
      {
        sectionId: sushiHot.id,
        name: 'Volcano Roll (8 un)',
        description: 'Uramaki recheado com salmão, cream cheese, empanado e flambado com maionese picante.',
        priceCents: 3990,
        imageUrl: U('1562802378-efda6b9e8c48', 400),
        available: true,
      },
      {
        sectionId: sushiHot.id,
        name: 'Dragon Roll (8 un)',
        description: 'Camarão empanado, pepino, abacate fatiado por cima, molho teriyaki.',
        priceCents: 4490,
        imageUrl: U('1569050467447-ce54b3bbc37d', 400),
        available: false,
      },
    ],
  });

  // El Taco Loco (isOpen: false — tela 07)
  const tacoSalgados = await prisma.menuSection.create({
    data: {
      restaurantId: mexicana.id,
      name: 'Tacos',
      order: 1,
    },
  });
  const tacoBurritos = await prisma.menuSection.create({
    data: {
      restaurantId: mexicana.id,
      name: 'Burritos',
      order: 2,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        sectionId: tacoSalgados.id,
        name: 'Taco al Pastor',
        description: 'Carne suína marinada com achiote, abacaxi, cebola, coentro, tortilla de milho artesanal.',
        priceCents: 2290,
        imageUrl: U('1565299585323-38d6b0865b47', 400),
        available: true,
      },
      {
        sectionId: tacoSalgados.id,
        name: 'Taco de Camarão',
        description: 'Camarão grelhado com pimenta chipotle, repolho roxo, creme azedo, tortilla de farinha.',
        priceCents: 2890,
        imageUrl: U('1599974733899-97b42c01d9fc', 400),
        available: true,
      },
      {
        sectionId: tacoBurritos.id,
        name: 'Burrito Clásico',
        description: 'Arroz mexicano, feijão preto, carne moída temperada, queijo cheddar, guacamole, creme azedo.',
        priceCents: 3490,
        imageUrl: U('1626700051175-7a90de36e86d', 400),
        available: true,
      },
    ],
  });

  // Pão & Cia
  const padariaSalgados = await prisma.menuSection.create({
    data: {
      restaurantId: padaria.id,
      name: 'Salgados',
      order: 1,
    },
  });
  const padariaDoces = await prisma.menuSection.create({
    data: {
      restaurantId: padaria.id,
      name: 'Doces & Pães',
      order: 2,
    },
  });
  const padariaBebidas = await prisma.menuSection.create({
    data: {
      restaurantId: padaria.id,
      name: 'Bebidas',
      order: 3,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        sectionId: padariaSalgados.id,
        name: 'Coxinha de Frango',
        description: 'Recheio cremoso de frango desfiado com catupiry, massa crocante.',
        priceCents: 890,
        imageUrl: U('1599565395855-47e7f0e4f1b8', 400),
        available: true,
      },
      {
        sectionId: padariaSalgados.id,
        name: 'Esfiha de Carne',
        description: 'Massa fofinha recheada com carne bovina temperada com cebola e salsa.',
        priceCents: 790,
        imageUrl: U('1536304929831-ee8ca855de08', 400),
        available: true,
      },
      {
        sectionId: padariaSalgados.id,
        name: 'Croissant Presunto e Queijo',
        description: 'Croissant folhado amanteigado recheado com presunto cozido e queijo suíço.',
        priceCents: 1290,
        imageUrl: U('1509440159596-0249088772ff', 400),
        available: true,
      },
      {
        sectionId: padariaDoces.id,
        name: 'Pão de Mel',
        description: 'Pão de especiarias coberto com chocolate belga 70%.',
        priceCents: 790,
        imageUrl: U('1481391319987-6a0744a4c851', 400),
        available: true,
      },
      {
        sectionId: padariaDoces.id,
        name: 'Bolo de Cenoura com Cobertura de Chocolate',
        description: 'Fatia generosa do bolo caseiro mais querido da cidade.',
        priceCents: 1290,
        imageUrl: U('1621303837174-89db416e5c6c', 400),
        available: true,
      },
      {
        sectionId: padariaBebidas.id,
        name: 'Café Coado (grande)',
        description: 'Café especial blend da casa, coado na hora. 400 ml.',
        priceCents: 990,
        imageUrl: U('1447933601428-94ebccb5b09e', 400),
        available: true,
      },
      {
        sectionId: padariaBebidas.id,
        name: 'Cappuccino',
        description: 'Espresso duplo com leite vaporizado e espuma grossa. 300 ml.',
        priceCents: 1190,
        imageUrl: U('1572442388790-116fc2a85b0f', 400),
        available: true,
      },
    ],
  });

  // Tempero da Vó
  const brasilPratos = await prisma.menuSection.create({
    data: {
      restaurantId: brasileira.id,
      name: 'Pratos',
      order: 1,
    },
  });
  const brasilAcomp = await prisma.menuSection.create({
    data: {
      restaurantId: brasileira.id,
      name: 'Acompanhamentos',
      order: 2,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        sectionId: brasilPratos.id,
        name: 'Frango à Parmegiana',
        description: 'Filé de frango empanado, molho de tomate caseiro, mussarela gratinada. Acompanha arroz e fritas.',
        priceCents: 4490,
        imageUrl: U('1555939594-58d7cb561ad6', 400),
        available: true,
      },
      {
        sectionId: brasilPratos.id,
        name: 'Picanha na Chapa',
        description: '300g de picanha grelhada, vinagrete, farinha de mandioca, arroz e feijão.',
        priceCents: 6990,
        imageUrl: U('1544025132-083b98f4c1a4', 400),
        available: true,
      },
      {
        sectionId: brasilPratos.id,
        name: 'Moqueca de Camarão',
        description: 'Camarão médio no leite de coco, dendê, pimentões coloridos e coentro. Acompanha arroz.',
        priceCents: 5990,
        imageUrl: U('1546069901-d5bfd2cbfb1f', 400),
        available: true,
      },
      {
        sectionId: brasilAcomp.id,
        name: 'Arroz e Feijão',
        description: 'Arroz branco e feijão carioca temperado. Porção individual.',
        priceCents: 890,
        imageUrl: U('1536304929831-ee8ca855de08', 400),
        available: true,
      },
    ],
  });

  // Açaí do Paraíso
  const acaiPotinhos = await prisma.menuSection.create({
    data: {
      restaurantId: acaiteria.id,
      name: 'Potinhos',
      order: 1,
    },
  });
  const acaiBowls = await prisma.menuSection.create({
    data: {
      restaurantId: acaiteria.id,
      name: 'Smoothie Bowls',
      order: 2,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        sectionId: acaiPotinhos.id,
        name: 'Açaí 300 ml',
        description: 'Açaí puro do Pará, granola artesanal, banana, morango e mel.',
        priceCents: 1890,
        imageUrl: U('1547592166-23ac88d45388', 400),
        available: true,
      },
      {
        sectionId: acaiPotinhos.id,
        name: 'Açaí 500 ml',
        description: 'Açaí puro do Pará, granola artesanal, banana, morango, kiwi e leite condensado.',
        priceCents: 2690,
        imageUrl: U('1553361371-9b09f4098b56', 400),
        available: true,
      },
      {
        sectionId: acaiBowls.id,
        name: 'Tropical Bowl',
        description: 'Base de açaí, manga, abacaxi, granola, coco ralado e mel de abelha.',
        priceCents: 3290,
        imageUrl: U('1490474418585-ba9bad8fd0ea', 400),
        available: true,
      },
    ],
  });

  // Green Bowl
  const greenBowls = await prisma.menuSection.create({
    data: {
      restaurantId: saudavel.id,
      name: 'Bowls',
      order: 1,
    },
  });
  const greenSaladas = await prisma.menuSection.create({
    data: {
      restaurantId: saudavel.id,
      name: 'Saladas',
      order: 2,
    },
  });
  const greenJuices = await prisma.menuSection.create({
    data: {
      restaurantId: saudavel.id,
      name: 'Sucos',
      order: 3,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        sectionId: greenBowls.id,
        name: 'Power Bowl',
        description: 'Quinoa, grão-de-bico assado, kale, abacate, tomate-cereja, pepino, molho tahine.',
        priceCents: 3990,
        imageUrl: U('1512621776951-a57ef51aec59', 400),
        available: true,
      },
      {
        sectionId: greenBowls.id,
        name: 'Buddha Bowl',
        description: 'Arroz integral, edamame, cenoura ralada, beterraba, hummus e sementes mistas.',
        priceCents: 3590,
        imageUrl: U('1490474418585-ba9bad8fd0ea', 400),
        available: true,
      },
      {
        sectionId: greenSaladas.id,
        name: 'Caesar com Grilled Chicken',
        description: 'Alface romana, croutons artesanais, parmesão lascado, frango grelhado, molho Caesar.',
        priceCents: 3290,
        imageUrl: U('1546069901-d5bfd2cbfb1f', 400),
        available: true,
      },
      {
        sectionId: greenJuices.id,
        name: 'Suco Verde Detox',
        description: 'Couve, maçã verde, gengibre, limão e água de coco. 400 ml.',
        priceCents: 1490,
        imageUrl: U('1589733955941-96eeea1a2ccd', 400),
        available: true,
      },
    ],
  });

  console.log('Seeding completed!');
  console.log(`Created ${await prisma.restaurant.count()} restaurants`);
  console.log(`Created ${await prisma.menuSection.count()} menu sections`);
  console.log(`Created ${await prisma.menuItem.count()} menu items`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
