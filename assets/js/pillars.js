// Pilares da SI: seletor interativo + mini-jogo "qual pilar está em jogo?"
const PILLARS = Object.freeze([
  {
    id: "conf", ico: "🙈", name: "Confidencialidade",
    def: "Garante que apenas pessoas autorizadas tenham acesso à informação.",
    ex: ["Criptografia de dados", "Controle de acesso: senhas, biometria, autenticação de dois fatores"],
    risk: "Vazamento de informações sigilosas.",
    tip: "Pergunta-chave: QUEM pode ver?"
  },
  {
    id: "int", ico: "🧩", name: "Integridade",
    def: "Garante que a informação não seja alterada indevidamente.",
    ex: ["Assinaturas digitais", "Checksums (verificam se os dados foram alterados)", "Controle de versão (histórico de alterações)", "Logs de auditoria (registram todas as ações)", "Hash para validação da informação"],
    risk: "Modificação maliciosa de arquivos ou dados corrompidos.",
    tip: "Pergunta-chave: o dado continua CORRETO e ORIGINAL?"
  },
  {
    id: "disp", ico: "⏱️", name: "Disponibilidade",
    def: "A informação precisa estar acessível quando necessário.",
    ex: ["Sistemas redundantes e backup", "Proteção contra ataques DDoS", "Planos de continuidade de negócios"],
    risk: "Indisponibilidade por ataques, falhas técnicas ou desastres naturais.",
    tip: "Pergunta-chave: consigo acessar QUANDO preciso?"
  },
  {
    id: "aut", ico: "🪪", name: "Autenticidade",
    def: "Garante que a identidade dos usuários e sistemas seja verificada.",
    ex: ["Certificados digitais e tokens de autenticação", "Assinaturas eletrônicas e blockchain"],
    risk: "Roubo de identidade e falsificação de documentos.",
    tip: "Pergunta-chave: é mesmo QUEM diz ser?"
  },
  {
    id: "irr", ico: "✍️", name: "Irretratabilidade",
    alt: "(Não repúdio)",
    def: "Garante que uma ação realizada não possa ser negada pelo autor.",
    ex: ["Registro de logs detalhados de todas as ações", "Assinaturas digitais (comprovam a autoria)", "Contratos eletrônicos (validade jurídica das transações online)"],
    risk: "Tentativa de negar transações ou ações realizadas.",
    tip: "Pergunta-chave: o autor pode NEGAR que fez?"
  },
  {
    id: "conform", ico: "📜", name: "Conformidade",
    def: "Garante que a organização cumpra normas e regulamentações.",
    ex: ["LGPD: Lei Geral de Proteção de Dados (Brasil)", "GDPR: Regulamento Geral de Proteção de Dados (Europa)", "ISO 27001: padrão internacional de segurança da informação"],
    risk: "Multas e penalidades por não conformidade.",
    tip: "Pergunta-chave: estamos seguindo a LEI e as NORMAS?"
  }
]);

const PILLAR_SCENARIOS = Object.freeze([
  { text: "Um estagiário abre a planilha de salários da empresa sem ter permissão.", answer: "conf" },
  { text: "Um invasor altera as notas de alunos no sistema da escola.", answer: "int" },
  { text: "O site de uma loja sai do ar na Black Friday por causa de um ataque DDoS.", answer: "disp" },
  { text: "Um golpista manda e-mail se passando pelo diretor para pedir uma transferência.", answer: "aut" },
  { text: "Um cliente diz que nunca assinou o contrato, mas há assinatura digital e logs provando.", answer: "irr" },
  { text: "A empresa é multada por tratar dados de clientes sem seguir a LGPD.", answer: "conform" },
  { text: "O servidor queimou e não havia backup: ninguém consegue acessar os arquivos.", answer: "disp" },
  { text: "O checksum de um arquivo baixado não bate com o publicado pelo fabricante.", answer: "int" }
]);

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]
));

function initPillarPicker() {
  const picker = document.getElementById("pillarPicker");
  const detail = document.getElementById("pillarDetail");
  if (!picker || !detail) return;

  picker.innerHTML = PILLARS.map((p, i) => `
    <button class="pillar-btn" role="tab" id="tab-${p.id}" data-id="${p.id}" aria-selected="${i === 0}">
      <span class="ico">${p.ico}</span>${i + 1}. ${escapeHtml(p.name)}
    </button>`).join("");

  const render = (id) => {
    const p = PILLARS.find((x) => x.id === id) || PILLARS[0];
    picker.querySelectorAll(".pillar-btn").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.id === p.id)));
    detail.innerHTML = `
      <h3><span>${p.ico}</span> ${escapeHtml(p.name)} ${p.alt ? `<span class="muted">${escapeHtml(p.alt)}</span>` : ""}</h3>
      <p>${escapeHtml(p.def)}</p>
      <div class="cols">
        <div><h4>Exemplos / como garantir</h4><ul>${p.ex.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul></div>
        <div><h4>Riscos</h4><p>${escapeHtml(p.risk)}</p><h4>Dica</h4><p>${escapeHtml(p.tip)}</p></div>
      </div>`;
  };

  picker.addEventListener("click", (e) => {
    const btn = e.target.closest(".pillar-btn");
    if (btn) render(btn.dataset.id);
  });
  render(PILLARS[0].id);
}

function initPillarGame() {
  const root = document.getElementById("pillarGame");
  if (!root) return;
  let state = { index: 0, hits: 0, answered: false };

  const render = () => {
    const sc = PILLAR_SCENARIOS[state.index];
    root.innerHTML = `
      <div class="muted" style="font-size:.85rem">Situação ${state.index + 1} de ${PILLAR_SCENARIOS.length} · acertos: ${state.hits}</div>
      <p class="game-q">${escapeHtml(sc.text)}</p>
      <div class="chip-row">${PILLARS.map((p) => `<button class="chip" data-id="${p.id}">${p.ico} ${escapeHtml(p.name)}</button>`).join("")}</div>
      <div class="game-feedback" role="status"></div>
      <div class="game-foot"><span></span><button class="btn secondary" data-next hidden>Próxima →</button></div>`;
  };

  root.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip && !state.answered) {
      const sc = PILLAR_SCENARIOS[state.index];
      const correct = chip.dataset.id === sc.answer;
      const right = PILLARS.find((p) => p.id === sc.answer);
      state = { ...state, answered: true, hits: state.hits + (correct ? 1 : 0) };
      root.querySelectorAll(".chip").forEach((c) => {
        c.disabled = true;
        if (c.dataset.id === sc.answer) c.classList.add("right");
      });
      if (!correct) chip.classList.add("wrong");
      root.querySelector(".game-feedback").textContent = correct
        ? `✅ Isso! ${right.tip}`
        : `❌ Era ${right.name}. ${right.tip}`;
      const next = root.querySelector("[data-next]");
      next.hidden = false;
      next.textContent = state.index === PILLAR_SCENARIOS.length - 1 ? "Recomeçar ↺" : "Próxima →";
      return;
    }
    if (e.target.closest("[data-next]")) {
      const last = state.index === PILLAR_SCENARIOS.length - 1;
      state = last ? { index: 0, hits: 0, answered: false } : { ...state, index: state.index + 1, answered: false };
      render();
    }
  });
  render();
}
