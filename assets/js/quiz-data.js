// Banco de questões do simulado. "answer" é o índice da alternativa correta (antes do embaralhamento).
const QUIZ_QUESTIONS = Object.freeze([
  // ---------- Fundamentos ----------
  {
    topic: "Fundamentos",
    q: "Qual das opções abaixo é um exemplo de ativo INTANGÍVEL?",
    options: ["Servidor da empresa", "Documentos impressos", "Propriedade intelectual", "Computadores do escritório"],
    answer: 2,
    explain: "Intangíveis são ativos que não se tocam: dados, softwares e propriedade intelectual. Servidores, computadores e documentos são tangíveis."
  },
  {
    topic: "Fundamentos",
    q: "Quais são os três elementos que compõem o risco?",
    options: ["Ameaça, vulnerabilidade e ativo", "Evento, probabilidade e impacto", "Confidencialidade, integridade e disponibilidade", "Prevenção, detecção e correção"],
    answer: 1,
    explain: "Risco = Evento (o que pode acontecer) + Probabilidade (chance de ocorrer) + Impacto (consequências caso ocorra)."
  },
  {
    topic: "Fundamentos",
    q: "Uma empresa dá permissões excessivas aos funcionários e nunca oferece treinamento. Que tipo de vulnerabilidade é essa?",
    options: ["Técnica", "Física", "Natural", "Organizacional"],
    answer: 3,
    explain: "Falta de treinamento e permissões excessivas são vulnerabilidades organizacionais. Técnicas = software desatualizado/má configuração; físicas = falta de controle de acesso, dispositivos desprotegidos."
  },
  {
    topic: "Fundamentos",
    q: "Uma queda de energia que derruba os servidores de uma empresa é um exemplo de:",
    options: ["Ameaça não humana", "Ameaça humana intencional", "Oportunidade", "Vulnerabilidade organizacional"],
    answer: 0,
    explain: "Ameaças não humanas são causadas por falhas de tecnologia, desastres naturais ou fatores externos, como quedas de energia."
  },
  {
    topic: "Fundamentos",
    q: "Sobre riscos, ameaças e oportunidades, é correto afirmar que:",
    options: [
      "Riscos são sempre negativos",
      "Oportunidades são riscos positivos e devem ser aproveitadas",
      "Ameaças devem sempre ser aproveitadas para gerar benefícios",
      "Oportunidades não envolvem nenhum tipo de risco"
    ],
    answer: 1,
    explain: "Os riscos podem ser negativos (ameaças: mitigar, eliminar ou aceitar) ou positivos (oportunidades: aproveitar para maximizar benefícios)."
  },
  // ---------- Hackers ----------
  {
    topic: "Hackers",
    q: "Um hacker invade um sistema SEM permissão, descobre uma falha e a denuncia à empresa, mas pede pagamento para revelar todos os detalhes. Ele é um:",
    options: ["White Hat", "Black Hat", "Gray Hat", "Dark Hat"],
    answer: 2,
    explain: "Gray Hat não tem intenção criminosa, mas invade sem consentimento; denuncia as falhas em vez de explorá-las, podendo exigir pagamento pelos detalhes."
  },
  {
    topic: "Hackers",
    q: "Qual característica diferencia o White Hat dos demais?",
    options: [
      "Explora vulnerabilidades para ganho próprio",
      "Invade sistemas com a permissão da organização para corrigir falhas",
      "Explora a falha antes de relatá-la",
      "Distribui malware para testar antivírus"
    ],
    answer: 1,
    explain: "White Hats são hackers éticos: invadem com permissão para encontrar e corrigir pontos fracos. Explorar antes de relatar é típico do Dark Hat."
  },
  // ---------- Pilares ----------
  {
    topic: "6 Pilares",
    q: "Criptografia de dados e autenticação de dois fatores são exemplos de medidas que garantem principalmente qual pilar?",
    options: ["Disponibilidade", "Conformidade", "Confidencialidade", "Irretratabilidade"],
    answer: 2,
    explain: "Confidencialidade garante que só pessoas autorizadas acessem a informação: criptografia e controle de acesso (senhas, biometria, 2FA)."
  },
  {
    topic: "6 Pilares",
    q: "Checksums, hash, controle de versão e logs de auditoria estão ligados a qual pilar?",
    options: ["Integridade", "Disponibilidade", "Autenticidade", "Confidencialidade"],
    answer: 0,
    explain: "Integridade garante que a informação não seja alterada indevidamente; checksums e hash verificam se os dados foram modificados."
  },
  {
    topic: "6 Pilares",
    q: "Sistemas redundantes, backup, proteção contra DDoS e planos de continuidade de negócios garantem:",
    options: ["Integridade", "Disponibilidade", "Irretratabilidade", "Autenticidade"],
    answer: 1,
    explain: "Disponibilidade: a informação precisa estar acessível quando necessário. O risco é a indisponibilidade por ataques, falhas ou desastres."
  },
  {
    topic: "6 Pilares",
    q: "Certificados digitais, tokens de autenticação e blockchain são exemplos ligados ao pilar da:",
    options: ["Conformidade", "Disponibilidade", "Autenticidade", "Integridade"],
    answer: 2,
    explain: "Autenticidade garante que a identidade de usuários e sistemas seja verificada. Seu risco é o roubo de identidade e falsificação de documentos."
  },
  {
    topic: "6 Pilares",
    q: "Um cliente tenta negar que fez uma compra online, mas os logs detalhados e o contrato eletrônico comprovam a transação. Qual pilar foi garantido?",
    options: ["Confidencialidade", "Irretratabilidade (não repúdio)", "Disponibilidade", "Conformidade"],
    answer: 1,
    explain: "Irretratabilidade (não repúdio) garante que uma ação realizada não possa ser negada pelo autor: logs, assinaturas digitais e contratos eletrônicos."
  },
  {
    topic: "6 Pilares",
    q: "LGPD, GDPR e ISO 27001 estão relacionadas a qual pilar?",
    options: ["Conformidade", "Integridade", "Autenticidade", "Confidencialidade"],
    answer: 0,
    explain: "Conformidade garante que a organização cumpra normas e regulamentações. O risco é receber multas e penalidades."
  },
  // ---------- Mecanismos ----------
  {
    topic: "Mecanismos",
    q: "Na gestão de acessos, o princípio que diz que cada usuário deve ter apenas as permissões necessárias ao seu trabalho é o:",
    options: ["Acesso total", "Privilégio mínimo", "Não repúdio", "Autenticação multifator"],
    answer: 1,
    explain: "Gestão de acessos se baseia em privilégios mínimos para cada usuário, reduzindo o estrago em caso de erro ou invasão."
  },
  {
    topic: "Mecanismos",
    q: "Qual mecanismo cria uma conexão criptografada e privada através da internet?",
    options: ["IDS", "Adware", "VPN", "DMZ"],
    answer: 2,
    explain: "VPN (Rede Privada Virtual) garante conexões criptografadas e privadas, como um túnel seguro pela internet."
  },
  {
    topic: "Mecanismos",
    q: "O IDS, citado entre os mecanismos de segurança de rede, é um:",
    options: [
      "Sistema de detecção de intrusões",
      "Protocolo de envio de e-mails",
      "Tipo de ransomware",
      "Certificado digital"
    ],
    answer: 0,
    explain: "IDS = Intrusion Detection System (Sistema de Detecção de Intrusões): monitora a rede e alerta sobre atividades suspeitas."
  },
  // ---------- Malware ----------
  {
    topic: "Malware",
    q: "Qual malware infecta redes inteiras usando as interfaces de rede e utiliza cada máquina infectada para infectar outras?",
    options: ["Adware", "Worm", "Spyware", "Scareware"],
    answer: 1,
    explain: "O worm se espalha por redes (locais ou internet) e usa cada máquina infectada para infectar mais máquinas."
  },
  {
    topic: "Malware",
    q: "Qual malware finge ser um software legítimo e cria “portas dos fundos” para permitir a entrada de outros malwares?",
    options: ["Cavalo de Troia (Trojan)", "Botnet", "Worm", "Adware"],
    answer: 0,
    explain: "O Cavalo de Troia se disfarça de software legítimo (ou se esconde em um software violado) e abre backdoors para outros malwares."
  },
  {
    topic: "Malware",
    q: "O keylogger, que monitora as teclas digitadas no teclado, é um tipo de:",
    options: ["Ransomware", "Adware", "Spyware", "Worm"],
    answer: 2,
    explain: "Keyloggers são um tipo de spyware, assim como rootkits e web beacons: coletam informações sem o usuário saber."
  },
  {
    topic: "Malware",
    q: "Uma rede de computadores infectados que obedecem aos comandos de um hacker, usada para spam e ataques DDoS, é chamada de:",
    options: ["DMZ", "VPN", "Botnet", "Firewall"],
    answer: 2,
    explain: "Botnet (bot network), ou “exército de zumbis”: centenas ou milhares de computadores infectados sob o controle do criador."
  },
  {
    topic: "Malware",
    q: "Qual variante de ransomware indica ERRONEAMENTE que o computador tem problemas e exige pagamento para “resolvê-los”?",
    options: ["Criptográfico", "Lock-screen", "Scareware", "Keylogger"],
    answer: 2,
    explain: "Scareware assusta a vítima com problemas falsos. O criptográfico cifra o HD; o lock-screen trava a tela (às vezes fingindo ser um órgão do governo cobrando multa)."
  },
  {
    topic: "Malware",
    q: "Sobre o adware, é correto afirmar que:",
    options: [
      "É sempre o malware mais destrutivo",
      "Não é maligno por natureza, mas pode servir de porta de entrada para outros malwares",
      "Criptografa os arquivos da vítima",
      "Só se espalha por SMS"
    ],
    answer: 1,
    explain: "Adware não é maligno por natureza, mas softwares agressivos de publicidade podem minar a segurança e abrir caminho para outros malwares."
  },
  // ---------- Phishing ----------
  {
    topic: "Phishing",
    q: "O phishing realizado via SMS recebe o nome de:",
    options: ["Vishing", "Pharming", "Smishing", "Spoofing"],
    answer: 2,
    explain: "Smishing = SMS + phishing. Vishing é por voz (telefone); pharming redireciona o tráfego para um site falso."
  },
  {
    topic: "Phishing",
    q: "Você digita o endereço correto de um site, mas é levado a uma página falsa porque um malware alterou o arquivo “hosts” do seu computador. Esse ataque é o:",
    options: ["Pharming", "Smishing", "Cyberbullying", "Vishing"],
    answer: 0,
    explain: "No pharming, o malware cria uma correspondência errada entre IP e nome de domínio no arquivo hosts, redirecionando o tráfego legítimo para o site de phishing."
  },
  {
    topic: "Phishing",
    q: "Qual atitude AJUDA a se prevenir de phishing?",
    options: [
      "Confirmar dados bancários quando o banco pedir por e-mail",
      "Abrir anexos de e-mails não solicitados para verificar o conteúdo",
      "Verificar a URL do site, procurando erros de grafia ou domínio diferente",
      "Informar a senha por telefone se a pessoa disser que é do banco"
    ],
    answer: 2,
    explain: "Verifique a URL: o domínio pode ter erro de grafia ou ser diferente (.com quando deveria ser .gov). Bancos e órgãos nunca pedem para confirmar dados confidenciais."
  },
  // ---------- Crimes virtuais ----------
  {
    topic: "Crimes virtuais",
    q: "Você foi vítima de difamação em uma rede social. Qual deve ser o PRIMEIRO passo, segundo o material?",
    options: [
      "Apagar a sua conta imediatamente",
      "Responder publicamente o agressor",
      "Salvar todas as provas (print screen) e depois registrar um Boletim de Ocorrência",
      "Ignorar, pois crimes virtuais não têm punição"
    ],
    answer: 2,
    explain: "Crimes contra a honra (calúnia, difamação e injúria) na internet são puníveis. Salve as provas com print, registre o BO; pode caber ação por danos morais."
  },
  {
    topic: "Crimes virtuais",
    q: "Qual é a principal proteção recomendada pelo WhatsApp contra o golpe do número clonado?",
    options: [
      "Trocar a foto de perfil com frequência",
      "Ativar a verificação em duas etapas (PIN de seis dígitos)",
      "Desinstalar o aplicativo à noite",
      "Usar apenas Wi-Fi público"
    ],
    answer: 1,
    explain: "Com a verificação em duas etapas, a conta só é ativada em outro aparelho com o PIN; sem ele, o criminoso não entra mesmo com o chip clonado."
  },
  // ---------- Fake News / Deepfake / Cyberbullying ----------
  {
    topic: "Fake News & Deepfake",
    q: "Qual destes é um SINAL de que uma notícia pode ser falsa?",
    options: [
      "Foi publicada em vários veículos confiáveis",
      "Cita fontes verificáveis",
      "Manchete polêmica e curiosa, sem fontes mencionadas",
      "Foi confirmada por agências de checagem"
    ],
    answer: 2,
    explain: "Sinais de fake news: manchete polêmica/curiosa, sem fontes, não publicada em outros veículos. Na dúvida, use sites de checagem e não compartilhe."
  },
  {
    topic: "Fake News & Deepfake",
    q: "O deepfake utiliza qual tecnologia para substituir rostos e vozes em vídeos realistas?",
    options: [
      "Deep learning (um tipo de machine learning)",
      "Arquivo hosts",
      "Firewall de aplicação",
      "Clonagem de chip"
    ],
    answer: 0,
    explain: "Deepfake é IA baseada em deep learning, que aprende padrões em várias camadas de processamento. O termo surgiu em dezembro de 2017, no Reddit."
  },
  {
    topic: "Cyberbullying",
    q: "Por que o cyberbullying pode ser ainda mais prejudicial que o bullying tradicional?",
    options: [
      "Porque sempre envolve agressão física",
      "Porque o conteúdo fica disponível na rede por muito tempo e se espalha, tornando a violência atemporal",
      "Porque só acontece entre desconhecidos",
      "Porque não é considerado crime"
    ],
    answer: 1,
    explain: "Mesmo sem agressão física, o conteúdo permanece e se dissemina na rede, tornando a violência atemporal, com graves danos psicológicos."
  }
]);
