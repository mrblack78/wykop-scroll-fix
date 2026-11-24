(() => {
  'use strict';
  const noop = function () {};
  let done = false;

  // Wyłącza metodę ensureCompatibility() na konkretnej instancji komponentu
  const patchVm = (vm) => {
    if (vm && typeof vm.ensureCompatibility === 'function' && vm.ensureCompatibility !== noop) {
      vm.ensureCompatibility = noop;
    }
  };
  const walk = (vm) => { patchVm(vm); (vm.$children || []).forEach(walk); };

  const install = () => {
    const el = document.getElementById('app') || Array.from(document.querySelectorAll('body > *')).find(e => e.__vue__);
    const root = el && el.__vue__ && el.__vue__.$root;
    if (!root || !root.$store) return false;

    const store = root.$store;
    const Vue = root.constructor;

    // 1) blokuj mutację config/setBlockAlert(true)
    const origCommit = store.commit;
    store.commit = function (type, payload, opts) {
      const t = typeof type === 'object' && type ? type.type : type;
      if (t === 'config/setBlockAlert') return;
      return origCommit.apply(this, arguments);
    };
    if (store.state.config && store.state.config.blockAlert) store.state.config.blockAlert = false;

    // 2) zneutralizuj ensureCompatibility() – w istniejących i przyszłych komponentach
    walk(root);
    if (Vue && typeof Vue.mixin === 'function') {
      Vue.mixin({ created() { patchVm(this); } });
    }

    document.documentElement.classList.remove('no-scrollbar');
    console.info('[wykop-scroll-fix] aktywne');
    return true;
  };

  const tryInstall = () => { if (!done && install()) { done = true; obs && obs.disconnect(); clearInterval(iv); } };
  const obs = new MutationObserver(tryInstall);
  obs.observe(document.documentElement, { childList: true, subtree: true });
  const iv = setInterval(tryInstall, 100);
  setTimeout(() => { obs.disconnect(); clearInterval(iv); }, 60000);
  tryInstall();
})();
