// Simulado: escolha de modo, uma questão por vez, feedback imediato, nota final e desempenho por assunto.
const Quiz = (() => {
  const STORE_KEY = "quiz";
  const LETTERS = ["A", "B", "C", "D", "E"];
  const QUICK_SIZE = 30;
  const ALL = Object.freeze([...QUIZ_QUESTIONS, ...QUIZ_ADVANCED]);
  const ADVANCED_IDX = ALL.map((q, i) => (q.kind ? i : -1)).filter((i) => i >= 0);

  const MODES = Object.freeze({
    full: { label: "Completo", desc: `Todas as ${ALL.length} questões`, pick: () => ALL.map((_, i) => i) },
    quick: { label: "Rápido", desc: `${QUICK_SIZE} questões sorteadas`, pick: () => shuffle(ALL.map((_, i) => i)).slice(0, QUICK_SIZE) },
    tricky: { label: "Pegadinhas", desc: `${ADVANCED_IDX.length} comparações e casos práticos`, pick: () => ADVANCED_IDX }
  });

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Cada item guarda o índice da questão e a ordem embaralhada das alternativas (índices originais).
  const newState = (mode) => ({
    mode,
    items: shuffle(MODES[mode].pick()).map((qi) => ({
      qi,
      order: shuffle(ALL[qi].options.map((_, oi) => oi))
    })),
    current: 0,
    answers: [], // { qi, chosen } com índice original da alternativa escolhida
    finished: false
  });

  const isValidState = (s) =>
    s && MODES[s.mode] && Array.isArray(s.items) && s.items.length > 0 &&
    s.items.every((it) => ALL[it.qi] && Array.isArray(it.order) && it.order.length === ALL[it.qi].options.length) &&
    Array.isArray(s.answers) && Number.isInteger(s.current) && s.current < s.items.length;

  let root = null;
  let state = null; // null = tela de escolha de modo

  const save = () => Store.set(STORE_KEY, state);
  const setState = (patch) => {
    state = { ...state, ...patch };
    save();
    render();
  };

  const isRight = (a) => a.chosen === ALL[a.qi].answer;
  const answerFor = (qi) => state.answers.find((a) => a.qi === qi);
  const correctCount = () => state.answers.filter(isRight).length;

  function renderStart() {
    const cards = Object.entries(MODES).map(([key, m]) => `
      <button class="mode-card" data-mode="${key}">
        <strong>${m.label}</strong><span>${m.desc}</span></button>`).join("");
    root.innerHTML = `
      <p style="font-weight:700">Escolha o modo do simulado:</p>
      <div class="mode-grid">${cards}</div>
      <p class="muted" style="margin-top:12px;font-size:.9rem">Dica: comece pelo <strong>Rápido</strong>. Depois treine as <strong>Pegadinhas</strong>, que comparam conceitos parecidos e trazem situações do dia a dia, como costuma cair em prova.</p>`;
  }

  function renderQuestion() {
    const item = state.items[state.current];
    const q = ALL[item.qi];
    const given = answerFor(item.qi);
    const total = state.items.length;
    const pct = Math.round((state.answers.length / total) * 100);

    const options = item.order.map((oi, pos) => {
      let cls = "option";
      if (given) {
        if (oi === q.answer) cls += " right";
        else if (oi === given.chosen) cls += " wrong";
      }
      return `<button class="${cls}" data-opt="${oi}" ${given ? "disabled" : ""}>
        <span class="letter">${LETTERS[pos]}</span><span>${escapeHtml(q.options[oi])}</span></button>`;
    }).join("");

    const feedback = given ? `
      <div class="callout ${isRight(given) ? "ok" : "warn"} explain">
        <strong>${isRight(given) ? "✅ Correto!" : "❌ Resposta incorreta"}</strong>${escapeHtml(q.explain)}
      </div>` : "";

    const kindPill = q.kind ? `<span class="pill kind">${escapeHtml(q.kind)}</span>` : "";
    const isLast = state.current === total - 1;
    root.innerHTML = `
      <div class="quiz-top">
        <span>Questão <strong>${state.current + 1}</strong> de ${total} · <span class="pill">${escapeHtml(q.topic)}</span>${kindPill}</span>
        <span>Acertos: <strong>${correctCount()}</strong> / ${state.answers.length}</span>
      </div>
      <div class="quiz-bar"><span style="width:${pct}%"></span></div>
      <div class="quiz-question">${escapeHtml(q.q)}</div>
      <div class="options">${options}</div>
      ${feedback}
      <div class="quiz-nav">
        <button class="btn secondary" data-action="menu">Trocar modo</button>
        <button class="btn secondary" data-action="prev" ${state.current === 0 ? "disabled" : ""}>← Anterior</button>
        <button class="btn" data-action="${isLast ? "finish" : "next"}" ${given ? "" : "disabled"}>
          ${isLast ? "Ver resultado 🏁" : "Próxima →"}</button>
      </div>`;
  }

  function scoreBy(keyFn) {
    const keys = [...new Set(state.answers.map((a) => keyFn(ALL[a.qi])))];
    return keys.map((key) => {
      const group = state.answers.filter((a) => keyFn(ALL[a.qi]) === key);
      return { key, hits: group.filter(isRight).length, total: group.length };
    });
  }

  function scoreRows(rows) {
    return rows.map((t) => {
      const p = t.total ? Math.round((t.hits / t.total) * 100) : 0;
      const color = p >= 70 ? "var(--ok)" : p >= 50 ? "var(--warn)" : "var(--bad)";
      return `<div class="topic-score"><span>${escapeHtml(t.key)}</span>
        <div class="bar"><span style="width:${p}%;background:${color}"></span></div>
        <strong>${t.hits}/${t.total}</strong></div>`;
    }).join("");
  }

  function verdict(pct) {
    if (pct >= 90) return "Excelente! Você domina o conteúdo. 🏆";
    if (pct >= 70) return "Muito bom! Revise os pontos que errou e está pronto. 💪";
    if (pct >= 50) return "Na média. Vale reler os módulos com menor desempenho. 📚";
    return "Hora de revisar o resumo com calma e tentar de novo. 🔁";
  }

  function renderResult() {
    const total = state.items.length;
    const hits = correctCount();
    const pct = Math.round((hits / total) * 100);
    const byKind = scoreBy((q) => q.kind || "Conceito");

    const wrong = state.answers.filter((a) => !isRight(a));
    const review = wrong.length ? wrong.map((a) => {
      const q = ALL[a.qi];
      return `<div class="review-item">
        <div><strong>${escapeHtml(q.q)}</strong></div>
        <div class="you">Sua resposta: ${escapeHtml(q.options[a.chosen])}</div>
        <div class="correct">Correta: ${escapeHtml(q.options[q.answer])}</div>
        <div class="muted">${escapeHtml(q.explain)}</div></div>`;
    }).join("") : `<p class="correct">Você não errou nenhuma! 🎉</p>`;

    root.innerHTML = `
      <div class="score-big">${hits}<span class="muted" style="font-size:1.4rem"> / ${total}</span></div>
      <p style="font-size:1.1rem;margin-top:6px"><strong>${pct}%</strong> de acerto (modo ${MODES[state.mode].label}). ${verdict(pct)}</p>
      <h3>Desempenho por assunto</h3>
      <div class="topic-scores">${scoreRows(scoreBy((q) => q.topic))}</div>
      ${byKind.length > 1 ? `<h3>Por tipo de questão</h3><div class="topic-scores">${scoreRows(byKind)}</div>` : ""}
      <details class="acc" ${wrong.length ? "open" : ""}>
        <summary>Revisar questões erradas (${wrong.length})</summary>
        <div class="acc-body">${review}</div>
      </details>
      <div class="quiz-nav">
        <button class="btn secondary" data-action="menu">Escolher outro modo</button>
        <button class="btn" data-action="again">Refazer este modo ↺</button>
      </div>`;
  }

  function render() {
    if (!state) renderStart();
    else if (state.finished) renderResult();
    else renderQuestion();
  }

  function start(mode) {
    state = newState(mode);
    save();
    render();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onClick(e) {
    const modeBtn = e.target.closest("[data-mode]");
    if (modeBtn && MODES[modeBtn.dataset.mode]) {
      start(modeBtn.dataset.mode);
      return;
    }
    const opt = e.target.closest("[data-opt]");
    if (opt && !opt.disabled) {
      const qi = state.items[state.current].qi;
      if (!answerFor(qi)) setState({ answers: [...state.answers, { qi, chosen: Number(opt.dataset.opt) }] });
      return;
    }
    const action = e.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action === "next") setState({ current: Math.min(state.current + 1, state.items.length - 1) });
    if (action === "prev") setState({ current: Math.max(state.current - 1, 0) });
    if (action === "finish") setState({ finished: true });
    if (action === "again") start(state.mode);
    if (action === "menu") {
      state = null;
      save();
      render();
    }
  }

  function init() {
    root = document.getElementById("quiz");
    if (!root) return;
    const saved = Store.get(STORE_KEY, null);
    // Progresso salvo pela versão antiga (sem "mode") equivale ao simulado de 30 questões.
    const migrated = saved && !saved.mode ? { ...saved, mode: "quick" } : saved;
    state = isValidState(migrated) ? migrated : null;
    root.addEventListener("click", onClick);
    render();
  }

  return Object.freeze({ init });
})();
