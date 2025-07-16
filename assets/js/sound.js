document.addEventListener('DOMContentLoaded', function () {
  // 🎵 Sons de hover e clique
  const hoverSound = new Audio('assets/Sounds/hover.mp3');
  const clickSound = new Audio('assets/Sounds/SFX.mp3'); // Som de clique

  // Adiciona fonte Ogg para compatibilidade
  hoverSound.src = 'assets/Sounds/hover.mp3';
  hoverSound.type = 'audio/mpeg';

  clickSound.src = 'assets/Sounds/SFX.mp3';
  clickSound.type = 'audio/mpeg';

  hoverSound.preload = 'auto';
  clickSound.preload = 'auto';

  let userInteracted = false;

  // ⚙️ Inicializa os áudios após primeira interação
  function initAudio() {
    userInteracted = true;

    [hoverSound, clickSound].forEach(sound => {
      sound.volume = 0;
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
      }).catch(e => console.log("Pré-carregamento de áudio falhou:", e));
    });

    ['click', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
      document.removeEventListener(evt, initAudio);
    });
  }

  // Escutar primeira interação
  ['click', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
    document.addEventListener(evt, initAudio, { once: true });
  });

  let hoverTimeout;

  // 🔁 Função para aplicar som de hover
  function aplicarHover(elements) {
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!userInteracted) return;
        clearTimeout(hoverTimeout);
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.2;
        hoverSound.play().catch(e => console.log("Erro ao tocar hoverSound:", e));
      });

      el.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          hoverSound.pause();
          hoverSound.currentTime = 0;
        }, 100);
      });
    });
  }

  // 🔁 Função para aplicar som de clique
  function aplicarClick(elements) {
    elements.forEach(el => {
      el.addEventListener('click', () => {
        if (!userInteracted) return;
        clickSound.currentTime = 0;
        clickSound.volume = 0.4;
        clickSound.play().catch(e => console.log("Erro ao tocar clickSound:", e));
      });
    });
  }

  // ✅ Aplica som de hover a tudo
  aplicarHover(document.querySelectorAll('.skill__card'));
  aplicarHover(document.querySelectorAll('.contact__social a'));
  aplicarHover(document.querySelectorAll('.project__card'));
  aplicarHover(document.querySelectorAll('.animated-button'));

  // ✅ Som de clique apenas onde você quer
  aplicarClick(document.querySelectorAll('.contact__social a'));
  aplicarClick(document.querySelectorAll('.animated-button'));
  // ✅ Som de clique nos links de projeto
aplicarClick(document.querySelectorAll('.project__link'));

  hoverSound.addEventListener('error', () => {
    console.warn('hover.mp3 não pôde ser carregado.');
  });
  
  clickSound.addEventListener('error', () => {
    console.warn('click.mp3 não pôde ser carregado.');
  });
});

