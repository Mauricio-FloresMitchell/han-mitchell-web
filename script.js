document.addEventListener('DOMContentLoaded', () => {

    // --- INSIGHTS ---
    const insights = [
        "La tecnología debe resolver problemas, no crearlos.",
        "Un MVP hoy vale más que un producto perfecto en un año.",
        "Automatizar procesos ineficientes solo acelera el caos.",
        "Tu web es tu mejor vendedor trabajando 24/7.",
        "El código limpio se escribe para humanos, no solo máquinas.",
        "Escalar es hacer que lo que ya funciona rinda el doble.",
        "Data over opinions: Si no se mide, no se puede mejorar.",
        "La simplicidad es la máxima sofisticación en desarrollo.",
        "Construye sistemas escalables, no solo parches temporales.",
        "La estrategia digital empieza en el 'por qué', no en el 'cómo'."
    ];

    const insightElement = document.getElementById('daily-insight');
    if (insightElement) {
        const randomIndex = Math.floor(Math.random() * insights.length);
        insightElement.innerText = insights[randomIndex];
    }

    // --- POP-UP (30 SEG) ---
    const popup = document.getElementById('popup-overlay');
    const closeBtn = document.getElementById('popup-close');
    const hasBeenShown = sessionStorage.getItem('popupShown');

    if (popup && closeBtn && !hasBeenShown) {
        setTimeout(() => {
            popup.classList.add('show');
            sessionStorage.setItem('popupShown', 'true');
        }, 30000);

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show');
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('show');
            }
        });
    }

    // --- FORMULARIOS & GOOGLE SHEETS ---
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzSAtQkuZE4hcVC08kbCZ5JzR369ovZ8YeKIBB0JVbwNsiDwoELBfjcwcapJD-Ijm3LA/exec";

    function mostrarConfirmacionInline(containerId, mensaje) {
        const confirmContainer = document.getElementById(containerId);
        if(!confirmContainer) return;
        confirmContainer.innerHTML = `
            <img src="assets/mau-pixel-avatar.png" alt="Mau" class="confirm-sticker-inline">
            <span>${mensaje}</span>
        `;
        confirmContainer.classList.add('show');
        setTimeout(() => confirmContainer.classList.remove('show'), 2000); 
    }

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const newsletterForm = document.querySelector('.minimal-form');
    if (newsletterForm) {
        newsletterForm.style.position = 'relative';
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            const email = input.value.trim();

            if (!validarEmail(email)) {
                mostrarConfirmacionInline('newsletter-confirm', "⚠️ Ese correo no está bien.");
                showToast("⚠️ Revisa el formato de tu correo.");
                return;
            }

            const btn = newsletterForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Anotando...";
            btn.disabled = true;

            fetch(`${SCRIPT_URL}?sheet=Newsletter&email=${encodeURIComponent(email)}`, {
                method: 'POST',
                mode: 'no-cors'
            }).then(() => {
                mostrarConfirmacionInline('newsletter-confirm', "✅ ¡Listo! Mau te anotó.");
                showToast("✅ Ya estás en la lista.");
                newsletterForm.reset();
            }).finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }

    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
        contactForm.style.position = 'relative';
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = contactForm.querySelector('input[placeholder="Nombre"]').value;
            const email = contactForm.querySelector('input[placeholder="Correo"]').value.trim();
            const telefonoInput = contactForm.querySelector('input[placeholder="Teléfono"]');
            const telefono = telefonoInput ? telefonoInput.value : '';
            const mensaje = contactForm.querySelector('textarea').value;

            if (!validarEmail(email)) {
                mostrarConfirmacionInline('contact-confirm', "⚠️ El correo es inválido.");
                showToast("⚠️ Revisa el correo proporcionado.");
                return;
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = "⏳ Enviando...";
            btn.disabled = true;

            const params = new URLSearchParams({
                sheet: "Contactos",
                nombre: nombre,
                email: email,
                telefono: telefono,
                mensaje: mensaje
            });

            fetch(`${SCRIPT_URL}?${params.toString()}`, {
                method: 'POST',
                mode: 'no-cors'
            }).then(() => {
                mostrarConfirmacionInline('contact-confirm', "✅ ¡Mensaje Recibido!");
                showToast("📩 ¡Recibido! Te hablo pronto.");
                contactForm.reset();
            }).finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }

    // --- TWITCH EMBED ---
    if(document.getElementById('twitch-embed')) {
        new Twitch.Embed("twitch-embed", {
            width: "100%",
            height: "100%",
            channel: "TU_USUARIO",
            parent: ["localhost", "tu-dominio.com"],
            layout: "video",
            autoplay: false,
            theme: "dark"
        });
    }
});

// --- WHATSAPP BUBBLE ---
const waContainer = document.getElementById('wa-container');
const waBubble = document.getElementById('wa-bubble');
const mensajesWA = [
    "¡Sí, hazlo! Envíame mensaje ya",
    "Sé que quieres hacerlo... ¡Escríbeme!",
    "¡Ya no lo pienses más! Dale clic"
];
let indiceMensaje = 0;

if (waContainer && waBubble) {
    waContainer.addEventListener('mouseenter', () => {
        waBubble.innerText = mensajesWA[indiceMensaje];
        indiceMensaje++;
        if (indiceMensaje >= mensajesWA.length) indiceMensaje = 0;
    });
}

// --- STICKER ---
const floresSpan = document.getElementById('flores-span');
if (floresSpan) {
    const img = document.createElement('img');
    img.src = 'assets/mau-pixel-sentado.png';
    img.className = 'mau-sentado-sticker';
    floresSpan.appendChild(img);
}

// --- DATA: GARANTÍAS ---
const garantiasData = {
    standard: {
        titulo: "🛡️ Garantía de 30 Días",
        sub: "(Paquetes básicos y profesionales)",
        cubre: ["Errores técnicos del desarrollo", "Ajustes menores existentes", "Dudas sobre uso del sitio", "Revisión de formularios"],
        no: ["Cambios de diseño", "Nuevas funcionalidades", "Contenido adicional", "Rediseño completo"],
        meta: ["Aplica alcance original", "Reportar en 30 días", "Respuesta: 48–72h"],
        tip: "💡 Ideal para dar tranquilidad a clientes que están comenzando."
    },
    extendida: {
        titulo: "🛡️ Garantía Extendida de 90 Días",
        sub: "(Paquetes premium)",
        cubre: ["Todo lo de 30 días", "Soporte prioritario", "Flexibilidad ajustes", "Monitoreo básico", "Corrección IA/Pagos"],
        no: ["Nuevas secciones", "Rediseños completos", "Gestión de contenido", "Marketing/SEO avanzado"],
        meta: ["Vigencia 90 días", "Prioridad máxima", "Respuesta: 24–48h"],
        tip: "💡 Ideal para proyectos complejos con acompañamiento inicial."
    }
};

// --- MODALES: GARANTÍAS ---
function verGarantia(tipo) {
    const data = garantiasData[tipo];
    const modal = document.getElementById('modal-garantia');
    if(!modal) return;
    document.getElementById('garantia-titulo').innerText = data.titulo;
    document.getElementById('garantia-subtitulo').innerText = data.sub;
    document.getElementById('garantia-cubre').innerHTML = data.cubre.map(i => `<li>• ${i}</li>`).join('');
    document.getElementById('garantia-no-incluye').innerHTML = data.no.map(i => `<li>• ${i}</li>`).join('');
    document.getElementById('garantia-meta').innerHTML = data.meta.map(i => `<li>• ${i}</li>`).join('');
    document.getElementById('garantia-tip').innerText = data.tip;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarGarantia() {
    const modal = document.getElementById('modal-garantia');
    if(modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// --- GLOBAL CLICK HANDLER ---
window.onclick = function(event) {
    const modalGar = document.getElementById('modal-garantia');
    if (event.target == modalGar) cerrarGarantia();
};

// --- TOAST NOTIFICATIONS ---
function showToast(mensaje) {
    const toast = document.getElementById('toast-notif');
    const msg = document.getElementById('toast-message');
    if(!toast || !msg) return;
    
    msg.innerText = mensaje;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// --- STIKER MAS VENDIDO ---
/* --- SECCIÓN: MICRO-INTERACCIÓN MAU COLGADO (FIX CLIC Y TOUCH) --- */
const bestSellerCard = document.getElementById('best-seller-card');
const mauColgado = document.getElementById('mau-colgado');

if (bestSellerCard && mauColgado) {
    const activarMau = () => {
        mauColgado.style.opacity = '1';
        mauColgado.style.top = '-80px';
        mauColgado.style.filter = 'drop-shadow(0 0 15px rgba(20, 205, 184, 0.9))';
    };

    const desactivarMau = () => {
        mauColgado.style.opacity = '0';
        mauColgado.style.top = '-60px';
        mauColgado.style.filter = 'drop-shadow(0 0 0 rgba(20, 205, 184, 0))';
    };

    // Desktop: Hover
    bestSellerCard.addEventListener('mouseenter', activarMau);
    bestSellerCard.addEventListener('mouseleave', desactivarMau);

    // Móvil y PC: Al hacer clic o tocar
    bestSellerCard.addEventListener('click', (e) => {
        // Si ya está visible lo ocultamos, si no, lo mostramos
        if (mauColgado.style.opacity === '1') {
            desactivarMau();
        } else {
            activarMau();
        }
    });
    
    window.addEventListener('scroll', desactivarMau);
}

    const samSticker = document.getElementById('sam-sticker');
    const valueSection = document.querySelector('.value-proposition');

/* --- SECCIÓN: LÓGICA DE MODALES --- */
function cerrarGarantia() {
    const modal = document.getElementById('modal-garantia');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

function cerrarServicio() {
    const modal = document.getElementById('modal-servicio');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

window.addEventListener('click', (e) => {
    const modalGar = document.getElementById('modal-garantia');
    const modalServ = document.getElementById('modal-servicio');
    if (e.target === modalGar) cerrarGarantia();
    if (e.target === modalServ) cerrarServicio();
});

/* --- SECCIÓN: CIERRE DE MODALES Y LIBERACIÓN DE SCROLL --- */

function liberarScroll() {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto'; 
    document.body.style.height = 'auto';
}

function cerrarGarantia() {
    const modal = document.getElementById('modal-garantia');
    if (modal) {
        modal.style.display = 'none';
        liberarScroll();
    }
}

function cerrarServicio() {
    const modal = document.getElementById('modal-servicio');
    if (modal) {
        modal.style.display = 'none';
        liberarScroll();
    }
}

/* --- SECCIÓN: CIERRE AL TOCAR FUERA DEL MODAL --- */
window.addEventListener('click', (e) => {
    const modalGar = document.getElementById('modal-garantia');
    const modalServ = document.getElementById('modal-servicio');
    const modalConf = document.getElementById('modal-confirmacion');
    const popupOverlay = document.getElementById('popup-overlay');

    if (e.target === modalGar) cerrarGarantia();
    if (e.target === modalServ) cerrarServicio();
    
    if (e.target === modalConf) {
        modalConf.classList.remove('show');
        modalConf.style.display = 'none';
        liberarScroll();
    }

    if (e.target === popupOverlay) {
        popupOverlay.classList.remove('show');
        popupOverlay.style.display = 'none';
        liberarScroll();
    }
});

