// Simulado: uma questão por vez, feedback imediato, nota final e desempenho por assunto.
const Quiz = (() => {
  const STORE_KEY = "quiz";
  const LETTERS = ["A", "B", "C", "D", "E"];

  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Cada item guarda o índice da questão e a ordem embaralhada das alternativas (índices originais).
  const newState = () => ({
    items: shuffle(QUIZ_QUESTIONS.map((_, i) => i)).map((qi) => ({
      qi,
      order: shuffle(QUIZ_QUESTIONS[qi].options.map((_, oi) => oi))
    })),
    current: 0,
    answers: [], // { qi, chosen } com índice original da alternativa escolhida
    finished: false
  });

  const isValidState = (s) =>
    s && Array.isArray(s.items) && s.items.length === QUIZ_QUESTIONS.length &&
    s.items.every((it) => QUIZ_QUESTIONS[it.qi] && Array.isArray(it.order)) &&
    Array.isArray(s.answers) && Number.isInteger(s.current);

  let root = null;
  let state = null;

  const save = () => Store.set(STORE_KEY, state);
  const setState = (patch) => {
    state = { ...state, ...patch };
    save();
    render();
  };

  const answerFor = (qi) => state.answers.find((a) => a.qi === qi);
  const correctCount = () => state.answers.filter((a) => a.chosen === QUIZ_QUESTIONS[a.qi].answer).length;

  function renderQuestion() {
    const item = state.items[state.current];
    const q = QUIZ_QUESTIONS[item.qi];
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
      <div class="callout ${given.chosen === q.answer ? "ok" : "warn"} explain">
        <strong>${given.chosen === q.answer ? "✅ Correto!" : "❌ Resposta incorreta"}</strong>${escapeHtml(q.explain)}
      </div>` : "";

    const isLast = state.current === total - 1;
    root.innerHTML = `
      <div class="quiz-top">
        <span>Questão <strong>${state.current + 1}</strong> de ${total} · <span class="pill">${escapeHtml(q.topic)}</span></span>
        <span>Acertos: <strong>${correctCount()}</strong> / ${state.answers.length}</span>
      </div>
      <div class="quiz-bar"><span style="width:${pct}%"></span></div>
      <div class="quiz-question">${escapeHtml(q.q)}</div>
      <div class="options">${options}</div>
      ${feedback}
      <div class="quiz-nav">
        <button class="btn secondary" data-action="restart">Recomeçar</button>
        <button class="btn secondary" data-action="prev" ${state.current === 0 ? "disabled" : ""}>← Anterior</button>
        <button class="btn" data-action="${isLast ? "finish" : "next"}" ${given ? "" : "disabled"}>
          ${isLast ? "Ver resultado 🏁" : "Próxima →"}</button>
      </div>`;
  }

  function scoreByTopic() {
    const topics = [...new Set(QUIZ_QUESTIONS.map((q) => q.topic))];
    return topics.map((topic) => {
      const ofTopic = state.answers.filter((a) => QUIZ_QUESTIONS[a.qi].topic === topic);
      const hits = ofTopic.filter((a) => a.chosen === QUIZ_QUESTIONS[a.qi].answer).length;
      return { topic, hits, total: ofTopic.length };
    });
  }

  function verdict(pct) {
    if (pct >= 90) return "Excelente! Você domina o conteúdo. 🏆";
    if (pct >= 70) return "Muito bom! Revise os pontos que errou e está pronto. 💪";
    if (pct >= 50) return "Na média. Vale reler os módulos com menor desempenho. 📚";
    return "Hora de revisar o resumo com calma e tentar de novo. 🔁";
  }

  function renderResult() {
    const total = QUIZ_QUESTIONS.length;
    const hits = correctCount();
    const pct = Math.round((hits / total) * 100);
    const topics = scoreByTopic().map((t) => {
      const p = t.total ? Math.round((t.hits / t.total) * 100) : 0;
      return `<div class="topic-score"><span>${escapeHtml(t.topic)}</span>
        <div class="bar"><span style="width:${p}%;background:${p >= 70 ? "var(--ok)" : p >= 50 ? "var(--warn)" : "var(--bad)"}"></span></div>
        <strong>${t.hits}/${t.total}</strong></div>`;
    }).join("");

    const wrong = state.answers.filter((a) => a.chosen !== QUIZ_QUESTIONS[a.qi].answer);
    const review = wrong.length ? wrong.map((a) => {
      const q = QUIZ_QUESTIONS[a.qi];
      return `<div class="review-item">
        <div><strong>${escapeHtml(q.q)}</strong></div>
        <div class="you">Sua resposta: ${escapeHtml(q.options[a.chosen])}</div>
        <div class="correct">Correta: ${escapeHtml(q.options[q.answer])}</div>
        <div class="muted">${escapeHtml(q.explain)}</div></div>`;
    }).join("") : `<p class="correct">Você não errou nenhuma! 🎉</p>`;

    root.innerHTML = `
      <div class="score-big">${hits}<span class="muted" style="font-size:1.4rem"> / ${total}</span></div>
      <p style="font-size:1.1rem;margin-top:6px"><strong>${pct}%</strong> de acerto. ${verdict(pct)}</p>
      <h3>Desempenho por assunto</h3>
      <div class="topic-scores">${topics}</div>
      <details class="acc" ${wrong.length ? "open" : ""}>
        <summary>Revisar questões erradas (${wrong.length})</summary>
        <div class="acc-body">${review}</div>
      </details>
      <div class="quiz-nav"><button class="btn" data-action="restart">Fazer de novo (nova ordem) ↺</button></div>`;
  }

  function render() {
    if (state.finished) renderResult();
    else renderQuestion();
  }

  function onClick(e) {
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
    if (action === "restart") {
      state = newState();
      save();
      render();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function init() {
    root = document.getElementById("quiz");
    if (!root) return;
    const saved = Store.get(STORE_KEY, null);
    state = isValidState(saved) ? saved : newState();
    root.addEventListener("click", onClick);
    render();
  }

  return Object.freeze({ init });
})();
