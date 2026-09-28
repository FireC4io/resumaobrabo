// Questões de nível mais alto: comparações entre conceitos parecidos e casos práticos.
// Mesmo formato de QUIZ_QUESTIONS, com o campo extra "kind".
const QUIZ_ADVANCED = Object.freeze([
  // ---------- Comparações ----------
  {
    kind: "Comparação", topic: "Malware",
    q: "Qual é a principal diferença entre um VÍRUS e um WORM?",
    options: [
      "O vírus só ataca celulares; o worm só ataca computadores",
      "O vírus é carregado no computador sem o usuário saber e se copia; o worm se propaga sozinho pela rede, usando cada máquina infectada para infectar outras",
      "O worm pede resgate em bitcoins; o vírus só exibe anúncios",
      "Não há diferença: são nomes diferentes para o mesmo malware"
    ],
    answer: 1,
    explain: "Os dois se replicam, mas o worm é especialista em se espalhar por redes inteiras (locais ou internet) usando as interfaces de rede, máquina a máquina."
  },
  {
    kind: "Comparação", topic: "Hackers",
    q: "Gray Hat e Dark Hat parecem iguais, mas diferem em qual ponto?",
    options: [
      "O Gray Hat denuncia a falha em vez de explorá-la; o Dark Hat explora a falha antes de relatar",
      "O Gray Hat tem permissão da empresa; o Dark Hat não",
      "O Dark Hat só age com autorização; o Gray Hat é criminoso",
      "O Gray Hat distribui malware; o Dark Hat corrige vulnerabilidades"
    ],
    answer: 0,
    explain: "Nenhum dos dois tem permissão. O Gray Hat denuncia (e pode cobrar pelos detalhes); o Dark Hat transita entre ético e antiético e explora antes de relatar."
  },
  {
    kind: "Comparação", topic: "6 Pilares",
    q: "Qual frase diferencia corretamente INTEGRIDADE de AUTENTICIDADE?",
    options: [
      "Integridade garante acesso quando necessário; autenticidade garante cumprimento de leis",
      "Integridade verifica se o dado foi alterado; autenticidade verifica se a identidade de quem enviou/acessou é verdadeira",
      "As duas garantem que apenas pessoas autorizadas vejam a informação",
      "Integridade impede negar uma ação; autenticidade impede ataques DDoS"
    ],
    answer: 1,
    explain: "Integridade = o conteúdo continua original (hash, checksum). Autenticidade = é mesmo quem diz ser (certificados, tokens)."
  },
  {
    kind: "Comparação", topic: "6 Pilares",
    q: "AUTENTICIDADE e IRRETRATABILIDADE (não repúdio) se diferenciam porque:",
    options: [
      "Autenticidade confirma QUEM é o usuário; irretratabilidade impede que o autor NEGUE uma ação que fez",
      "Autenticidade trata de backup; irretratabilidade trata de criptografia",
      "Irretratabilidade confirma a identidade; autenticidade registra logs",
      "São sinônimos no material"
    ],
    answer: 0,
    explain: "Autenticidade verifica identidade. Irretratabilidade vai além: com logs, assinaturas digitais e contratos eletrônicos, o autor não consegue negar a autoria."
  },
  {
    kind: "Comparação", topic: "Phishing",
    q: "Relacione corretamente: SMISHING, VISHING e PHARMING usam, respectivamente:",
    options: [
      "Ligação telefônica / SMS / anexo em PDF",
      "SMS / ligação telefônica / redirecionamento para site falso pela alteração do arquivo hosts",
      "E-mail / SMS / ligação telefônica",
      "Redirecionamento pelo arquivo hosts / SMS / ligação telefônica"
    ],
    answer: 1,
    explain: "Smishing = SMS. Vishing = voice (telefone, inclusive com robôs). Pharming = malware altera o arquivo hosts e você cai no site falso mesmo digitando o endereço certo."
  },
  {
    kind: "Comparação", topic: "Fundamentos",
    q: "Um funcionário usa a senha “123456” e um criminoso tenta adivinhar senhas da empresa. Isso é, respectivamente:",
    options: [
      "Ameaça e vulnerabilidade",
      "Vulnerabilidade e ameaça",
      "Oportunidade e risco",
      "Ativo e vulnerabilidade"
    ],
    answer: 1,
    explain: "A senha fraca é a brecha (vulnerabilidade). O criminoso é o fator que pode causar dano (ameaça humana) explorando essa brecha."
  },
  {
    kind: "Comparação", topic: "Fundamentos",
    q: "Qual a diferença entre RISCO e AMEAÇA?",
    options: [
      "São a mesma coisa",
      "Risco é sempre positivo; ameaça é sempre neutra",
      "Risco é a incerteza sobre um evento futuro e pode ser negativo ou positivo; ameaça é o risco negativo, que pode causar danos",
      "Ameaça é um ativo intangível; risco é um ativo tangível"
    ],
    answer: 2,
    explain: "Risco pode ser negativo (ameaça: mitigar, eliminar ou aceitar) ou positivo (oportunidade: aproveitar)."
  },
  {
    kind: "Comparação", topic: "Mecanismos",
    q: "Qual a diferença entre FIREWALL e IDS?",
    options: [
      "Firewall controla/bloqueia o tráfego da rede; IDS monitora e detecta atividades suspeitas (intrusões)",
      "Firewall faz backup; IDS criptografa os dados",
      "Firewall é um malware; IDS é um antivírus",
      "Os dois criam túneis criptografados como uma VPN"
    ],
    answer: 0,
    explain: "O firewall decide o que entra e sai da rede. O IDS (Sistema de Detecção de Intrusões) observa e alerta sobre comportamentos suspeitos."
  },
  {
    kind: "Comparação", topic: "Fake News & Deepfake",
    q: "Qual a diferença entre FAKE NEWS e DEEPFAKE?",
    options: [
      "Fake news são vídeos gerados por IA; deepfake são notícias de jornal",
      "Fake news são notícias falsas divulgadas como reais; deepfake usa IA (deep learning) para substituir rostos e vozes em vídeos realistas",
      "Deepfake é um tipo de ransomware",
      "Não há diferença"
    ],
    answer: 1,
    explain: "Deepfake é uma técnica de IA; um deepfake pode ser usado para espalhar fake news, mas os conceitos são diferentes."
  },
  {
    kind: "Comparação", topic: "Cyberbullying",
    q: "O que diferencia o CYBERBULLYING do bullying tradicional?",
    options: [
      "O cyberbullying sempre envolve agressão física",
      "O cyberbullying ocorre por meios digitais e o conteúdo pode ficar disponível e se espalhar por muito tempo (atemporal)",
      "O cyberbullying não causa danos psicológicos",
      "O bullying tradicional só acontece pela internet"
    ],
    answer: 1,
    explain: "Cyberbullying é o bullying por mídias digitais (posts, e-mail, SMS). Sem agressão física, mas pode ser mais prejudicial por se tornar atemporal."
  },

  // ---------- Casos práticos ----------
  {
    kind: "Caso prático", topic: "Malware",
    q: "Um hospital tem todos os prontuários criptografados por um malware que exige pagamento em bitcoins. Qual pilar foi mais diretamente atingido e qual medida reduziria o impacto?",
    options: [
      "Conformidade; contrato eletrônico",
      "Disponibilidade; backup atualizado",
      "Autenticidade; bloqueador de anúncios",
      "Irretratabilidade; filtro antispam"
    ],
    answer: 1,
    explain: "É um ransomware criptográfico: os dados ficam inacessíveis (disponibilidade). Com backup atualizado, é possível restaurar sem pagar o resgate."
  },
  {
    kind: "Caso prático", topic: "Phishing",
    q: "Uma funcionária recebe um e-mail “do banco” pedindo para confirmar os dados, clica no link e digita sua senha em um site idêntico ao original. Qual ataque e qual pilar foi violado primeiro?",
    options: [
      "Worm; disponibilidade",
      "Phishing; confidencialidade",
      "DDoS; integridade",
      "Botnet; conformidade"
    ],
    answer: 1,
    explain: "É phishing (engenharia social por e-mail e site falso). A senha, que deveria ser sigilosa, foi parar nas mãos do criminoso: confidencialidade. Bancos nunca pedem para confirmar dados assim."
  },
  {
    kind: "Caso prático", topic: "Mecanismos",
    q: "Um ex-funcionário continuava com acesso ao sistema e alterou dados do estoque. Qual mecanismo teria evitado o problema?",
    options: [
      "Bloqueador de anúncios",
      "Gestão de acessos com privilégio mínimo e retirada das permissões de quem sai",
      "Deepfake detector",
      "Aumentar a velocidade da internet"
    ],
    answer: 1,
    explain: "É uma vulnerabilidade organizacional (permissões mal geridas) que feriu a integridade dos dados. Gestão de acessos e logs de auditoria resolvem."
  },
  {
    kind: "Caso prático", topic: "Malware",
    q: "Uma loja virtual sai do ar porque milhares de computadores infectados enviam requisições ao mesmo tempo para o site. O que está acontecendo?",
    options: [
      "Um ataque DDoS feito por uma botnet, afetando a disponibilidade",
      "Um keylogger roubando senhas, afetando a integridade",
      "Um caso de smishing, afetando a conformidade",
      "Uma fake news, afetando a autenticidade"
    ],
    answer: 0,
    explain: "Botnets (exércitos de zumbis) são usadas para ataques DDoS, que derrubam serviços. Proteção contra DDoS é exemplo do pilar disponibilidade."
  },
  {
    kind: "Caso prático", topic: "Phishing",
    q: "Você recebe um SMS: “Sua conta será bloqueada hoje. Regularize em: bit.ly/xxxx”. Como classificar e o que fazer?",
    options: [
      "Vishing; ligar de volta para o número do SMS",
      "Smishing; não clicar e confirmar a situação pelos canais oficiais do banco",
      "Pharming; formatar o celular imediatamente",
      "Mensagem legítima; clicar para evitar o bloqueio"
    ],
    answer: 1,
    explain: "Phishing por SMS é smishing. Não clique em links de mensagens inesperadas; confirme pelo app ou telefone oficial."
  },
  {
    kind: "Caso prático", topic: "Crimes virtuais",
    q: "Um amigo manda mensagem no WhatsApp, do número dele, pedindo um PIX urgente. O que o material recomenda?",
    options: [
      "Transferir, pois o número é o dele",
      "Ligar para o número e confirmar por voz; o número pode ter sido clonado",
      "Responder pedindo o CPF dele para confirmar",
      "Encaminhar a mensagem para outros amigos"
    ],
    answer: 1,
    explain: "No golpe do número clonado, o criminoso usa a conta real. Se o número estiver clonado, o golpista teria que atender a ligação de voz e seria descoberto."
  },
  {
    kind: "Caso prático", topic: "6 Pilares",
    q: "Uma empresa guarda CPF e endereço de clientes sem consentimento e é multada pela fiscalização. Qual pilar a multa mostra que foi descumprido?",
    options: ["Disponibilidade", "Conformidade", "Integridade", "Irretratabilidade"],
    answer: 1,
    explain: "Conformidade: cumprir normas e leis como a LGPD. O risco típico desse pilar é justamente multa e penalidades."
  },
  {
    kind: "Caso prático", topic: "Malware",
    q: "Depois de baixar um “crack” de jogo em um site pirata, o antivírus encontra um programa que abriu uma porta dos fundos no PC. Qual malware e qual prevenção?",
    options: [
      "Cavalo de Troia; conferir se o provedor do download é confiável",
      "Adware; desligar o monitor",
      "Worm; usar VPN",
      "Scareware; pagar o resgate"
    ],
    answer: 0,
    explain: "O trojan se disfarça de programa legítimo e cria backdoors. Prevenção: “confira seus downloads” e baixe só de fontes confiáveis."
  },
  {
    kind: "Caso prático", topic: "Hackers",
    q: "Um banco contrata um especialista para tentar invadir seus sistemas e entregar um relatório com as falhas encontradas. Esse profissional é um:",
    options: ["Black Hat", "Gray Hat", "White Hat", "Dark Hat"],
    answer: 2,
    explain: "White Hat invade COM permissão da organização, para encontrar e corrigir vulnerabilidades. A autorização é o que diferencia do Gray Hat."
  },
  {
    kind: "Caso prático", topic: "Fake News & Deepfake",
    q: "Viraliza um vídeo realista de um político dizendo algo absurdo, mas nenhum outro veículo noticiou. Qual a melhor atitude?",
    options: [
      "Compartilhar logo, porque vídeo não pode ser falsificado",
      "Suspeitar de deepfake, verificar em agências de checagem e, na dúvida, não compartilhar",
      "Compartilhar apenas nos grupos da família",
      "Denunciar o político à polícia"
    ],
    answer: 1,
    explain: "Deepfakes imitam rosto e voz de forma realista. Sinais de alerta: conteúdo absurdo e ausência em outros veículos. Na dúvida, não compartilhe."
  }
]);
