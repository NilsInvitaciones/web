// Comportamiento de la versión web: apertura de la misión espacial, animaciones al hacer scroll,
// cuenta regresiva y música.
(() => {
  const root = document.documentElement;
  root.classList.add('anim');
  const audio = document.querySelector('audio');
  const floating = document.querySelector('.musica-flotante');

  // Apertura: al tocar el cohete, comienza la misión espacial.
  // El toque también permite iniciar la música (los celulares bloquean el audio sin un toque previo).
  // Si la página la controla el generador de video (window.__modoVideo), él decide cuándo quitarla.
  const apertura = document.getElementById('apertura');
  if (apertura) {
    root.classList.add('bloqueado');
    window.scrollTo(0, 0);
    const abrir = () => {
      if (apertura.classList.contains('abriendo')) return;
      apertura.classList.add('abriendo');
      if (audio) audio.play().catch(() => {});
      if (window.__modoVideo) return;
      setTimeout(() => {
        root.classList.remove('bloqueado');
        apertura.remove();
      }, 2400);
    };
    apertura.querySelector('button').addEventListener('click', abrir);
  }

  // Aparición al hacer scroll.
  const items = document.querySelectorAll('.aparece');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15 });
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add('visible'));
  }

  // Cuenta regresiva.
  const countdown = document.querySelector('.cuenta');
  if (countdown) {
    const target = new Date(countdown.dataset.fecha).getTime();
    const cells = ['d', 'h', 'm', 's'].map((u) => countdown.querySelector(`[data-u="${u}"]`));
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const s = Math.floor(Math.max(0, target - Date.now()) / 1000);
      [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60]
        .forEach((value, i) => { cells[i].textContent = pad(value); });
    };
    tick();
    setInterval(tick, 1000);
  }

  // Música.
  if (!audio) return;
  const player = document.querySelector('.reproductor');
  const play = player && player.querySelector('.play');
  const progress = player && player.querySelector('.barra-progreso');
  const bar = player && player.querySelector('.barra');
  const current = player && player.querySelector('.t-actual');
  const total = player && player.querySelector('.t-total');
  const time = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

  const toggle = () => (audio.paused ? audio.play() : audio.pause());
  if (play) play.addEventListener('click', toggle);
  if (floating) floating.addEventListener('click', toggle);
  if (bar) bar.addEventListener('click', (event) => {
    if (!audio.duration) return;
    const rect = bar.getBoundingClientRect();
    audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
  });

  const sync = () => {
    const playing = !audio.paused;
    if (play) play.classList.toggle('sonando', playing);
    if (floating) {
      floating.classList.toggle('sonando', playing);
      floating.hidden = false;
      floating.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
      floating.setAttribute('aria-pressed', String(playing));
    }
  };
  // El control debe aparecer aun cuando el navegador impide el audio automático.
  if (apertura) apertura.addEventListener('click', () => { if (floating) floating.hidden = false; }, { once: true });
  else if (floating) floating.hidden = false;
  audio.addEventListener('play', sync);
  audio.addEventListener('pause', sync);
  audio.addEventListener('ended', sync);
  sync();
  if (apertura && floating) floating.hidden = true;
  audio.addEventListener('loadedmetadata', () => { if (total) total.textContent = time(audio.duration); });
  audio.addEventListener('timeupdate', () => {
    if (current) current.textContent = time(audio.currentTime);
    if (progress && audio.duration) progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  });
})();
