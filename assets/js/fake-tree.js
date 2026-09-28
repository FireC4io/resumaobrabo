// Fluxograma "Fato ou boato?" (baseado no slide do material) como árvore de decisão interativa.
const FAKE_TREE = Object.freeze({
  start: { q: "A notícia é absurda, bizarra ou estranha?", yes: "fonte", no: "fonte", yesNote: "Melhor verificar!" },
  fonte: { q: "Tem fonte?", yes: "oficial", no: "stop" },
  oficial: { q: "Está em um veículo oficial / fonte confiável?", yes: "velha", no: "stop", noLabel: "Não / Não sei" },
  velha: { q: "É notícia velha?", yes: "stop", no: "checou" },
  checou: { q: "Você checou tudo?", yes: "ok", no: "stop" },
  ok: { result: "OK, pode compartilhar ✅", tone: "ok" },
  stop: { result: "Na dúvida, NÃO compartilhe! 🚫", tone: "bad" }
});

function initFakeTree() {
  const root = document.getElementById("fakeTree");
  if (!root) return;
  let path = [];
  let current = "start";

  const render = (note) => {
    const node = FAKE_TREE[current];
    const trail = path.length ? `<div class="tree-path">Caminho: ${path.join(" → ")}</div>` : "";
    if (node.result) {
      root.innerHTML = `
        <div class="tree-result ${node.tone}">${node.result}</div>${trail}
        <div class="tree-actions" style="margin-top:12px"><button data-restart>Testar outra notícia ↺</button></div>`;
      return;
    }
    root.innerHTML = `
      ${note ? `<div class="pill">${note}</div>` : ""}
      <div class="tree-q">${node.q}</div>
      <div class="tree-actions">
        <button data-ans="yes">Sim</button>
        <button data-ans="no">${node.noLabel || "Não"}</button>
      </div>${trail}`;
  };

  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-restart]")) {
      path = [];
      current = "start";
      render();
      return;
    }
    const btn = e.target.closest("[data-ans]");
    if (!btn) return;
    const node = FAKE_TREE[current];
    const ans = btn.dataset.ans;
    path = [...path, `${node.q.replace("?", "")}: ${ans === "yes" ? "Sim" : "Não"}`];
    current = node[ans];
    render(ans === "yes" ? node.yesNote : undefined);
  });
  render();
}
