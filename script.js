document.addEventListener('DOMContentLoaded', function () {
	
	// --- REFERENCIAS A LOS ELEMENTOS Pantalla Bienvenida y música---
    const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
    const body = document.body;
    const audio = document.getElementById('musica-fondo');
    const controlMusica = document.getElementById('control-musica');
    const iconoControl = controlMusica.querySelector('img');

    // Rutas a tus iconos
    const playIcon = 'img/play-icon.svg';
    const pauseIcon = 'img/pause-icon.svg';

    body.classList.add('no-scroll'); // Añadimos la clase 'no-scroll' al body para empezar

    // --- LÓGICA DE LA PANTALLA DE BIENVENIDA ---
    pantallaBienvenida.addEventListener('click', function() {   // 1. Ocultamos la pantalla de bienvenida con una transición
        window.scrollTo(0, 0);  // ¡Esta es la línea mágica! para que siempre inicie desde el principio
        pantallaBienvenida.classList.add('oculto');
        body.classList.remove('no-scroll');  // 2. Quitamos la clase 'no-scroll' para permitir el desplazamiento

        // ¡Aquí inicia la música por primera vez!
        audio.play();
        iconoControl.src = pauseIcon; // Cambiamos el icono a "pause"
        controlMusica.classList.add('visible'); // Hacemos visible el botón

		// 3. (Opcional) Para optimizar, eliminamos el elemento después de la animación
        setTimeout(() => {
            pantallaBienvenida.style.display = 'none';
        }, 800);
    });

    // --- LÓGICA PARA EL BOTÓN DE PLAY/PAUSE ---
    controlMusica.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            iconoControl.src = pauseIcon;
        } else {
            audio.pause();
            iconoControl.src = playIcon;
        }
    });

    // --- LÓGICA DEL CONTADOR ---
    const fechaObjetivo = new Date('2027-11-23T21:00:00');

    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');

    function actualizarContador() {
        const ahora = new Date();
        const diferencia = fechaObjetivo - ahora;

        if (diferencia <= 0) {
			clearInterval(intervaloContador);
			document.querySelector('.contador-numeros-horizontal').innerHTML =
			"<p class='evento-terminado'>🎉 ¡El gran día ha llegado! 🎉</p>";
		return;
		}


        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        diasEl.innerText = formatoDosDigitos(dias);
        horasEl.innerText = formatoDosDigitos(horas);
        minutosEl.innerText = formatoDosDigitos(minutos);
        segundosEl.innerText = formatoDosDigitos(segundos);
    }

    function formatoDosDigitos(numero) {
        return numero < 10 ? '0' + numero : numero;
    }

    const intervaloContador = setInterval(actualizarContador, 1000);
    actualizarContador();


    // --- INICIALIZACIÓN DE LA GALERÍA (SWIPER.JS) ---
var swiper = new Swiper('.galeria-swiper', {
    // --- ESTA ES LA NUEVA CONFIGURACIÓN ---
    effect: 'slide', // Efecto de deslizamiento simple
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto', // Muestra la foto central y partes de las adyacentes
    spaceBetween: 30, // Espacio de 30px entre cada foto

    // --- OPCIONES QUE SE MANTIENEN ---
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // --- AÑADIMOS LA PAGINACIÓN PARA LOS PUNTOS ---
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


    // --- INICIALIZACIÓN DE ANIMACIONES (AOS.JS) ---
    AOS.init({
        duration: 800, // Duración de la animación en milisegundos
        once: true, // La animación solo ocurre una vez
    });
	
	const toggleBtn = document.getElementById("toggleYapeBtn");
    const info = document.getElementById("yape-info");

	if (toggleBtn && info) {
	const icon = toggleBtn.querySelector(".icon");

	toggleBtn.addEventListener("click", function () {
    info.classList.toggle("show");
    toggleBtn.classList.toggle("active");

    // Cambiar + y -
    if (info.classList.contains("show")) {
      icon.textContent = "−"; // guion largo
    } else {
      icon.textContent = "+";
    }
  });
}
  
  document.getElementById("year").textContent = new Date().getFullYear();

});