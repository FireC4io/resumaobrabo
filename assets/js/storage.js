// Wrapper seguro para localStorage: funciona mesmo em aba anônima ou com armazenamento bloqueado.
const Store = (() => {
  const PREFIX = "resumao-si:";

  function get(key, fallback) {
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (err) {
      console.warn("Não foi possível ler o progresso salvo:", err);
      return fallback;
    }
  }

  function set(key, value) {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (err) {
      console.warn("Não foi possível salvar o progresso:", err);
    }
  }

  return Object.freeze({ get, set });
})();
