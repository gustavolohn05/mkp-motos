export interface Moto {
  id: string
  marca: string
  modelo: string
  ano: number
  motor: string
  potencia: string
  zero100: string
  categoria: 'Sport/Superbike' | 'Street Naked' | 'Trail/Adventure' | 'Scooter' | 'Crossover'
  preco: number
  slogan: string
  fotos: string[]
  status: 'Disponivel' | 'Vendida'
  destaque: boolean
  km?: number
}

export interface Depoimento {
  id: string
  nome: string
  modelo: string
  texto: string
  estrelas: number
  avatar?: string
}

export interface SiteData {
  logo: string
  hero: {
    subtitulo: string
    btnVerDetalhes: string
    btnSolicitarProposta: string
  }
  sobre: {
    historia: string
    diferenciais: string[]
    numeros: { label: string; valor: string }[]
  }
  contato: {
    endereco: string
    telefone: string
    instagramUrl: string
    horarios: string
  }
  footer: {
    slogan: string
    instagramUrl: string
    youtubeUrl: string
    facebookUrl: string
  }
  categorias: {
    nome: string
    slogan: string
    imagem: string
  }[]
  marcas: string[]
  motos: Moto[]
  depoimentos: Depoimento[]
}

export const initialData: SiteData = {
  logo: '/logo-mkp.png',
  hero: {
    subtitulo: 'AS MELHORES MOTOS DO MERCADO ESTÃO AQUI NA MKP MOTOS',
    btnVerDetalhes: 'Ver Detalhes',
    btnSolicitarProposta: 'Solicitar Proposta',
  },
  sobre: {
    historia:
      'Fundada com a paixão pela velocidade e o compromisso com a excelência, a MKP Motos nasceu para transformar o sonho de cada motociclista em realidade. Com mais de uma década de mercado, somos referência em Palhoça e região Santa Catarina, oferecendo as melhores marcas e um atendimento que vai além da venda.',
    diferenciais: [
      'Estoque com as principais marcas do mercado nacional e importado',
      'Equipe especializada e apaixonada por motociclismo',
      'Financiamento facilitado com as melhores condições',
      'Pós-venda dedicado e suporte completo ao cliente',
    ],
    numeros: [
      { label: 'Anos de Experiência', valor: '12+' },
      { label: 'Motos Vendidas', valor: '3.500+' },
      { label: 'Clientes Satisfeitos', valor: '2.800+' },
      { label: 'Marcas Parceiras', valor: '15' },
    ],
  },
  contato: {
    endereco: 'Av. Elza Lucchi, 980 - Pte. do Imaruim, Palhoça - SC, 88130-601',
    telefone: '(48) 99915-2309',
    instagramUrl: 'https://www.instagram.com/mkp_motos/',
    horarios: 'Seg–Sex: 8h–18h  |  Sáb: 8h–13h',
  },
  footer: {
    slogan: 'Velocidade é paixão. MKP é destino.',
    instagramUrl: 'https://www.instagram.com/mkp_motos/',
    youtubeUrl: 'https://www.youtube.com',
    facebookUrl: 'https://www.facebook.com',
  },
  categorias: [
    {
      nome: 'Sport / Superbike',
      slogan: 'Adrenalina pura em cada curva',
      imagem: 'https://images.unsplash.com/photo-1623756005690-55dff6465ed5?w=800&q=85&fit=crop',
    },
    {
      nome: 'Street Naked',
      slogan: 'Poder sem fronteiras nas ruas',
      imagem: 'https://images.unsplash.com/photo-1638289394195-64e572399560?w=800&q=85&fit=crop',
    },
    {
      nome: 'Trail / Adventure',
      slogan: 'Sem destino. Sem limites.',
      imagem: 'https://images.unsplash.com/photo-1778693885834-87668850413e?w=800&q=85&fit=crop',
    },
    {
      nome: 'Scooter',
      slogan: 'Agilidade e estilo no dia a dia',
      imagem: 'https://images.unsplash.com/photo-1653609545903-d3a2c64daba4?w=800&q=85&fit=crop',
    },
    {
      nome: 'Crossover',
      slogan: 'Versatilidade para qualquer terreno',
      imagem: 'https://images.unsplash.com/photo-1670995982270-b892c06054c5?w=800&q=85&fit=crop',
    },
  ],
  marcas: [
    'Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'Ducati',
    'BMW Motorrad', 'Harley-Davidson', 'KTM', 'Triumph', 'Royal Enfield',
    'Aprilia', 'MV Agusta', 'Husqvarna', 'Indian Motorcycle', 'Benelli',
  ],
  motos: [
    {
      id: '1',
      marca: 'Honda',
      modelo: 'CB 1000R',
      ano: 2023,
      motor: '999cc',
      potencia: '145cv',
      zero100: '3.2s',
      categoria: 'Street Naked',
      preco: 89900,
      slogan: 'O naked que redefine o conceito de potência urbana',
      fotos: [
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85',
      ],
      status: 'Disponivel',
      destaque: true,
      km: 0,
    },
    {
      id: '2',
      marca: 'Yamaha',
      modelo: 'MT-09',
      ano: 2023,
      motor: '890cc',
      potencia: '119cv',
      zero100: '3.5s',
      categoria: 'Street Naked',
      preco: 74900,
      slogan: 'A besta de três cilindros que domina as ruas',
      fotos: [
        'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=85',
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
      ],
      status: 'Disponivel',
      destaque: true,
      km: 8500,
    },
    {
      id: '3',
      marca: 'Kawasaki',
      modelo: 'Ninja ZX-10R',
      ano: 2022,
      motor: '998cc',
      potencia: '200cv',
      zero100: '2.9s',
      categoria: 'Sport/Superbike',
      preco: 139900,
      slogan: 'Tecnologia de MotoGP para as ruas',
      fotos: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85',
        'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=85',
      ],
      status: 'Disponivel',
      destaque: true,
      km: 12500,
    },
    {
      id: '4',
      marca: 'Ducati',
      modelo: 'Panigale V4',
      ano: 2023,
      motor: '1103cc',
      potencia: '215cv',
      zero100: '2.7s',
      categoria: 'Sport/Superbike',
      preco: 249900,
      slogan: 'A arte italiana em forma de velocidade',
      fotos: [
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85',
      ],
      status: 'Disponivel',
      destaque: true,
      km: 0,
    },
    {
      id: '5',
      marca: 'BMW',
      modelo: 'R 1250 GS',
      ano: 2023,
      motor: '1254cc',
      potencia: '136cv',
      zero100: '3.8s',
      categoria: 'Trail/Adventure',
      preco: 119900,
      slogan: 'Onde a estrada termina, a aventura começa',
      fotos: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=85',
        'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=85',
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85',
      ],
      status: 'Disponivel',
      destaque: false,
      km: 21000,
    },
    {
      id: '6',
      marca: 'Harley-Davidson',
      modelo: 'Fat Boy 114',
      ano: 2022,
      motor: '1868cc',
      potencia: '94cv',
      zero100: '4.5s',
      categoria: 'Crossover',
      preco: 149900,
      slogan: 'Lendário. Inconfundível. Americano.',
      fotos: [
        'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&q=85',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=85',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85',
      ],
      status: 'Disponivel',
      destaque: false,
      km: 5300,
    },
    {
      id: '7',
      marca: 'KTM',
      modelo: '890 Duke R',
      ano: 2023,
      motor: '889cc',
      potencia: '121cv',
      zero100: '3.3s',
      categoria: 'Street Naked',
      preco: 82900,
      slogan: 'Ready to Race. Sempre.',
      fotos: [
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85',
      ],
      status: 'Vendida',
      destaque: false,
      km: 18700,
    },
    {
      id: '8',
      marca: 'Triumph',
      modelo: 'Tiger 900',
      ano: 2023,
      motor: '888cc',
      potencia: '94cv',
      zero100: '4.0s',
      categoria: 'Trail/Adventure',
      preco: 98900,
      slogan: 'A aventura não espera. Vá mais longe.',
      fotos: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=85',
        'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=85',
        'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&q=85',
      ],
      status: 'Disponivel',
      destaque: false,
      km: 0,
    },
  ],
  depoimentos: [
    {
      id: '1',
      nome: 'Carlos Mendes',
      modelo: 'Honda CB 1000R',
      texto: 'Atendimento impecável do começo ao fim. Encontrei a moto dos meus sonhos na MKP e o processo foi simples e transparente. Recomendo demais!',
      estrelas: 5,
    },
    {
      id: '2',
      nome: 'Fernanda Lima',
      modelo: 'Yamaha MT-09',
      texto: 'A equipe da MKP Motos é fantástica. Fui bem atendida, tiraram todas as minhas dúvidas e me ajudaram a escolher a moto perfeita para o meu perfil.',
      estrelas: 5,
    },
    {
      id: '3',
      nome: 'Rafael Torres',
      modelo: 'Kawasaki Ninja ZX-10R',
      texto: 'Melhor concessionária da região! Estoque sempre atualizado, preços justos e o pessoal é muito profissional. Minha terceira compra aqui.',
      estrelas: 5,
    },
    {
      id: '4',
      nome: 'João Oliveira',
      modelo: 'BMW R 1250 GS',
      texto: 'Processo de financiamento muito facilitado. Em menos de uma semana já estava com a minha GS em mãos. Equipe nota 10!',
      estrelas: 5,
    },
    {
      id: '5',
      nome: 'Ana Souza',
      modelo: 'Triumph Tiger 900',
      texto: 'Nunca pensei que comprar uma moto seria tão agradável. A MKP transformou o que poderia ser estressante numa experiência incrível.',
      estrelas: 5,
    },
  ],
}
