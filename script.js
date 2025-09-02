
function confirmar() {
  
	const numero = "51912345678"; // Reemplaza con tu número de WhatsApp
  
	const mensaje = "Hola, confirmo mi asistencia a los 15 años de Valeria.";
  
	const url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
  
	window.open(url, "_blank");

}


function verMapa() {
  
	const mapaURL = "https://www.google.com/maps?q=Villa+Encantada,+Av.+Las+Flores+123,+Lima";
  
	window.open(mapaURL, "_blank");
}

window.addEventListener("DOMContentLoaded", () => {
  const sobre = document.getElementById("imagen-sobre");
  const pantalla = document.getElementById("pantalla-inicial");
  const contenido = document.querySelector(".container");

  contenido.style.display = "none";

  sobre.addEventListener("click", () => {
    sobre.classList.add("sobre-abriendo");
// Espera a que termine la animación antes de mostrar el contenido
setTimeout(() => {
      pantalla.style.opacity = "0";
      setTimeout(() => {
        pantalla.style.display = "none";
contenido.style.display = "block";
      }, 500);
    }, 800); // igual a la duración de la animación
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const volador = document.querySelector(".volador");

  volador.addEventListener("animationiteration", () => {
    // Cada vez que termina la animación, cambia la altura
    const randomTop = Math.floor(Math.random() * 70) + 10; // entre 10% y 80%
    volador.style.top = randomTop + "%";
  });
});
