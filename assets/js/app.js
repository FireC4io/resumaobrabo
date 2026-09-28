// Inicialização geral: tema, progresso dos módulos e destaque do menu.
(() => {
  const MODULES = ["fundamentos", "hackers", "pilares", "mecanismos", "malware", "phishing", "crimes", "fakenews", "cyberbullying"];

  function initTheme() {
    const saved = Store.get("theme", null);
    if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
    document.getElementById("themeBtn")?.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme
        || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      Store.set("theme", next);
    });
  }

  function initProgress() {
    let done = new Set(Store.get("done", []).filter((m) => MODULES.includes(m)));

    const paint = () => {
      document.querySelectorAll("[data-done]").forEach((btn) => {
        const isDone = done.has(btn.dataset.done);
        btn.setAttribute("aria-pressed", String(isDone));
        btn.textContent = isDone ? "✓ Estudado" : "Marcar como estudado";
      });
      document.querySelectorAll("[data-module]").forEach((card) => {
        card.classList.toggle("done", done.has(card.dataset.module));
      });
      document.getElementById("progressText").textContent = `${done.size} de ${MODULES.length} módulos estudados`;
      document.getElementById("progressBar").style.width = `${(done.size / MODULES.length) * 100}%`;
    };

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-done]");
      if (!btn) return;
      const id = btn.dataset.done;
      done = done.has(id) ? new Set([...done].filter((m) => m !== id)) : new Set([...done, id]);
      Store.set("done", [...done]);
      paint();
    });
    paint();
  }

  function initActiveNav() {
    const links = [...document.querySelectorAll("#nav a")];
    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.filter((en) => en.isIntersecting).forEach((en) => {
        links.forEach((a) => a.classList.remove("active"));
        const link = byId.get(en.target.id);
        if (link) {
          link.classList.add("active");
          const nav = link.parentElement;
          nav.scrollTo({ left: link.offsetLeft - nav.clientWidth / 2 + link.clientWidth / 2, behavior: "smooth" });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("section.topic").forEach((s) => observer.observe(s));
  }

  initTheme();
  initProgress();
  initActiveNav();
  initPillarPicker();
  initPillarGame();
  initFakeTree();
  Quiz.init();
})();
