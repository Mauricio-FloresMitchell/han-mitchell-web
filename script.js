document.addEventListener('DOMContentLoaded', () => {

    const popup = document.getElementById('popup-overlay');
    const closeBtn = document.getElementById('popup-close');

    // Función para mostrar el popup
    function showPopup() {
        // Solo mostrar si no se ha cerrado antes en esta sesión
        if (!sessionStorage.getItem('popupClosed')) {
            popup.classList.add('show');
        }
    }

    // Función para cerrar el popup
    function closePopup() {
        popup.classList.remove('show');
        // Guardar en sesión que el usuario lo cerró para no molestarlo de nuevo
        sessionStorage.setItem('popupClosed', 'true');
    }

    // Configurar el temporizador: 30 segundos = 30000 milisegundos
    setTimeout(showPopup, 30000);

    // Eventos de cierre
    closeBtn.addEventListener('click', closePopup);

    // Cerrar al hacer clic fuera del contenido
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    console.log("Sitio de Dev Mau Flores cargado. Temporizador de conversión activo.");

// Lógica de Mensajes Diarios (IA Insights)
const insights = [
    "La automatización no quita trabajo, quita la fricción que te impide crecer.",
    "Un código limpio es el activo más barato de mantener a largo plazo.",
    "En 2026, la tecnología no es una opción, es el lenguaje de los negocios ganadores.",
    "No construyas solo una web, construye un embudo que trabaje mientras duermes.",
    "La IA es el copiloto, pero tu estrategia sigue siendo el motor principal.",
    "El éxito digital es 20% tecnología y 80% entender el problema del cliente.",
    "Escalabilidad significa estar listo para el éxito antes de que este llegue."
];

function setDailyInsight() {
    const textElement = document.getElementById('daily-insight');
    if (textElement) {
        // Selecciona una frase basada en el día del mes
        const dayOfMonth = new Date().getDate();
        const index = dayOfMonth % insights.length;
        textElement.innerText = `"${insights[index]}"`;
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setDailyInsight();
    // ... aquí sigue tu lógica anterior del pop-up ...
});

});