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
});