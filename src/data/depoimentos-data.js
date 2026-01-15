/**
 * DEPOIMENTOS - Base de dados estruturada
 * 12 depoimentos distribuídos em 4 páginas (3 cada)
 * Escola Natus - Janeiro 2026
 */

export const depoimentos = [
  // HOMEPAGE - 3 depoimentos focados em conversão e confiança geral
  {
    id: 1,
    nome: "Ana Paula Ferreira",
    papel: "Mãe do Lucas (6 anos)",
    foto: "/assets/images/depoimentos/ana-paula.webp", // Placeholder - aguardando cliente
    texto: "A Escola Natus transformou a vida do meu filho. Ele era tímido e inseguro, hoje é uma criança confiante que ama aprender. Os valores cristãos ensinados aqui são os mesmos que praticamos em casa. É uma extensão da nossa família!",
    destaque: "Transformou a vida do meu filho",
    estrelas: 5,
    pagina: "homepage"
  },
  {
    id: 2,
    nome: "Mariana Costa",
    papel: "Mãe da Sofia (4 anos)",
    foto: "/assets/images/depoimentos/mariana-costa.webp",
    texto: "Visitei 7 escolas em Goiânia antes de escolher a Natus. A diferença é gritante: turmas pequenas, professoras que conhecem cada criança pelo nome, e um ambiente que respira amor e cuidado. Aqui minha filha não é só mais um número.",
    destaque: "Turmas pequenas fazem toda a diferença",
    estrelas: 5,
    pagina: "homepage"
  },
  {
    id: 3,
    nome: "Juliana Santos",
    papel: "Mãe do Pedro (5 anos)",
    foto: "/assets/images/depoimentos/juliana-santos.webp",
    texto: "Como mãe cristã, eu buscava uma escola que não apenas educasse, mas também formasse o caráter do meu filho. Na Natus encontrei isso e muito mais. Pedro aprendeu a orar, compartilhar e respeitar o próximo. Estou em paz sabendo que ele está no lugar certo.",
    destaque: "Forma caráter além de educar",
    estrelas: 5,
    pagina: "homepage"
  },

  // SOBRE - 3 depoimentos focados em identidade, valores e comunidade
  {
    id: 4,
    nome: "Fernanda Almeida",
    papel: "Mãe da Laura (7 anos)",
    foto: "/assets/images/depoimentos/fernanda-almeida.webp",
    texto: "A Escola Natus é mais que uma instituição de ensino, é uma comunidade. Os pais se conhecem, as famílias se apoiam, e todos compartilham os mesmos valores. Encontrei aqui um ambiente seguro onde minha filha cresce cercada de amor e fé.",
    destaque: "Uma verdadeira comunidade cristã",
    estrelas: 5,
    pagina: "sobre"
  },
  {
    id: 5,
    nome: "Patricia Oliveira",
    papel: "Mãe do Gabriel (6 anos)",
    foto: "/assets/images/depoimentos/patricia-oliveira.webp",
    texto: "Escolhi a Natus pelo compromisso com a educação confessional. Aqui meu filho aprende que Deus é a base de tudo. As histórias bíblicas, os momentos de oração, a formação de valores... tudo isso faz parte do dia a dia. É exatamente o que eu queria para ele.",
    destaque: "Educação confessional de verdade",
    estrelas: 5,
    pagina: "sobre"
  },
  {
    id: 6,
    nome: "Camila Rodrigues",
    papel: "Mãe da Isabela (5 anos)",
    foto: "/assets/images/depoimentos/camila-rodrigues.webp",
    texto: "A coordenação da Natus tem uma atenção especial com cada família. Sempre que preciso, tenho acesso rápido para conversar sobre qualquer assunto. Sinto que minha filha está em um lugar onde ela é conhecida, cuidada e amada. Isso não tem preço!",
    destaque: "Atenção individualizada que tranquiliza",
    estrelas: 5,
    pagina: "sobre"
  },

  // METODOLOGIA - 3 depoimentos focados em excelência acadêmica e desenvolvimento
  {
    id: 7,
    nome: "Beatriz Martins",
    papel: "Mãe do Matheus (6 anos)",
    foto: "/assets/images/depoimentos/beatriz-martins.webp",
    texto: "O método de alfabetização da Natus é incrível! Meu filho está lendo aos 6 anos com muita fluência. As professoras respeitam o ritmo de cada criança, mas ao mesmo tempo estimulam o avanço. O equilíbrio entre exigência e afeto é perfeito.",
    destaque: "Alfabetização aos 6 anos com excelência",
    estrelas: 5,
    pagina: "metodologia"
  },
  {
    id: 8,
    nome: "Renata Lima",
    papel: "Mãe da Valentina (7 anos)",
    foto: "/assets/images/depoimentos/renata-lima.webp",
    texto: "A metodologia da Natus trabalha todas as dimensões da criança: cognitiva, espiritual, emocional e social. Minha filha não apenas tira notas excelentes, ela é feliz, sabe lidar com frustrações e tem amizades saudáveis. Isso é educação integral de verdade!",
    destaque: "Educação integral que funciona",
    estrelas: 5,
    pagina: "metodologia"
  },
  {
    id: 9,
    nome: "Luciana Dias",
    papel: "Mãe do Miguel (5 anos)",
    foto: "/assets/images/depoimentos/luciana-dias.webp",
    texto: "Eu tinha medo de que uma escola cristã não tivesse a mesma qualidade acadêmica que as grandes redes. A Natus provou o contrário! Meu filho tem um desenvolvimento acadêmico excepcional, e ainda por cima com formação de caráter. O melhor dos dois mundos.",
    destaque: "Qualidade acadêmica + valores cristãos",
    estrelas: 5,
    pagina: "metodologia"
  },

  // MODALIDADES - 3 depoimentos focados em flexibilidade, estrutura e rotina
  {
    id: 10,
    nome: "Carla Mendes",
    papel: "Mãe da Alice (4 anos)",
    foto: "/assets/images/depoimentos/carla-mendes.webp",
    texto: "A rotina da Natus é muito bem estruturada. Minha filha sabe exatamente o que esperar a cada dia: hora do parque, hora da história bíblica, hora das atividades. Isso trouxe muita segurança para ela, e para mim também. É uma escola organizada e previsível.",
    destaque: "Rotina estruturada que traz segurança",
    estrelas: 5,
    pagina: "modalidades"
  },
  {
    id: 11,
    nome: "Daniela Souza",
    papel: "Mãe do Enzo (6 anos)",
    foto: "/assets/images/depoimentos/daniela-souza.webp",
    texto: "A flexibilidade de horários da Natus salvou minha vida profissional! Como médica, tenho plantões imprevisíveis. O período integral com atividades extracurriculares de qualidade me deu a tranquilidade de que meu filho está bem cuidado o dia todo.",
    destaque: "Período integral com qualidade total",
    estrelas: 5,
    pagina: "modalidades"
  },
  {
    id: 12,
    nome: "Adriana Barbosa",
    papel: "Mãe da Helena (5 anos)",
    foto: "/assets/images/depoimentos/adriana-barbosa.webp",
    texto: "As modalidades da Natus atendem diferentes necessidades. Comecei no meio período e depois migrei para o integral. A transição foi super tranquila, e minha filha está amando as atividades extras: judô, música e inglês. Tudo dentro da escola, com professores qualificados!",
    destaque: "Flexibilidade que acompanha sua família",
    estrelas: 5,
    pagina: "modalidades"
  }
];

/**
 * Função auxiliar para filtrar depoimentos por página
 * @param {string} pagina - Nome da página: 'homepage', 'sobre', 'metodologia', 'modalidades'
 * @returns {Array} Array com 3 depoimentos da página especificada
 */
export function getDepoimentosPorPagina(pagina) {
  return depoimentos.filter(d => d.pagina === pagina);
}

/**
 * Função para obter todos os depoimentos
 * @returns {Array} Array completo com os 12 depoimentos
 */
export function getTodosDepoimentos() {
  return depoimentos;
}
