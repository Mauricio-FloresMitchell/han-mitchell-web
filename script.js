document.addEventListener('DOMContentLoaded', () => {
    
    // INSIGHTS DIARIOS (FOOTER)
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

    // LÓGICA DEL POP-UP (30 SEG / 1 VEZ POR SESIÓN)
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

    // FORMULARIO DE CONTACTO
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzSAtQkuZE4hcVC08kbCZ5JzR369ovZ8YeKIBB0JVbwNsiDwoELBfjcwcapJD-Ijm3LA/exec";

// --- LÓGICA PARA EL NEWSLETTER ---
function mostrarConfirmacionInline(containerId, mensaje) {
    const confirmContainer = document.getElementById(containerId);
    confirmContainer.innerHTML = `
        <img src="assets/mau-pixel-avatar.png" alt="Mau" class="confirm-sticker-inline">
        <span>${mensaje}</span>
    `;
    confirmContainer.classList.add('show');
    
    setTimeout(() => {
        confirmContainer.classList.remove('show');
    }, 2000); 
}

// Validar Email con expresión regular
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- LÓGICA PARA EL NEWSLETTER (CON VALIDACIÓN Y CONFIRMACIÓN AUTOMÁTICA) ---
const newsletterForm = document.querySelector('.minimal-form');
if (newsletterForm) {
    newsletterForm.style.position = 'relative';

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        const email = input.value.trim();

        // 1. Validación de Email
        if (!validarEmail(email)) {
            mostrarConfirmacionInline('newsletter-confirm', "⚠️ Ese correo no está bien.");
            return;
        }

        // 2. Feedback visual inmediato en el botón
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Anotando...";
        btn.disabled = true;

        // 3. Envío rápido a Google Sheets
        fetch(`${SCRIPT_URL}?sheet=Newsletter&email=${encodeURIComponent(email)}`, {
            method: 'POST',
            mode: 'no-cors' // Optimización de velocidad
        }).then(() => {
            // 4. Confirmación de Éxito discreta (2s)
            mostrarConfirmacionInline('newsletter-confirm', "✅ ¡Listo! Mau te anotó.");
            newsletterForm.reset();
        })
        .finally(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        });
    });
}
// --- LÓGICA PARA EL FORMULARIO DE CONTACTO ---
function mostrarConfirmacionInline(containerId, mensaje) {
    const confirmContainer = document.getElementById(containerId);
    confirmContainer.innerHTML = `
        <img src="assets/mau-pixel-avatar.png" alt="Mau" class="confirm-sticker-inline">
        <span>${mensaje}</span>
    `;
    confirmContainer.classList.add('show');
    
    setTimeout(() => {
        confirmContainer.classList.remove('show');
    }, 2000); 
}

// Validar Email con expresión regular (COMPARTIDA)
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- LÓGICA PARA EL FORMULARIO DE CONTACTO (CON VALIDACIÓN Y CONFIRMACIÓN AUTOMÁTICA) ---
const contactForm = document.getElementById('main-contact-form');
if (contactForm) {
    contactForm.style.position = 'relative';

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = contactForm.querySelector('input[placeholder="Nombre"]').value;
        const emailInput = contactForm.querySelector('input[placeholder="Correo"]');
        const email = emailInput.value.trim();
        const telefono = contactForm.querySelector('input[placeholder="Teléfono"]').value;
        const mensaje = contactForm.querySelector('textarea').value;

        // 1. Validación de Email
        if (!validarEmail(email)) {
            mostrarConfirmacionInline('contact-confirm', "⚠️ El correo es inválido.");
            return;
        }

        // 2. Feedback visual inmediato en el botón
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = "⏳ Enviando...";
        btn.disabled = true;

        // 3. Envío rápido a Google Sheets
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
            // 4. Confirmación de Éxito discreta (2s)
            mostrarConfirmacionInline('contact-confirm', "✅ ¡Mensaje Recibido! Te hablo pronto.");
            contactForm.reset();
        })
        .finally(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        });
    });
}
    // TWITCH EMBED
    new Twitch.Embed("twitch-embed", {
        width: "100%",
        height: "100%",
        channel: "TU_USUARIO",
        parent: ["localhost", "tu-dominio.com"],
        layout: "video",
        autoplay: false,
        theme: "dark"
    });
});

// WHATSAPP BUBBLE LOGIC
const waContainer = document.getElementById('wa-container');
const waBubble = document.getElementById('wa-bubble');

const mensajes = [
    "¡Sí, hazlo! Envíame mensaje ya",
    "Sé que quieres hacerlo... ¡Escríbeme!",
    "¡Ya no lo pienses más! Dale clic"
];

let indiceMensaje = 0;

if (waContainer) {
    waContainer.addEventListener('mouseenter', () => {
        waBubble.innerText = mensajes[indiceMensaje];
        indiceMensaje++;
        if (indiceMensaje >= mensajes.length) {
            indiceMensaje = 0;
        }
    });
}

// STICKER LOGIC
const floresSpan = document.getElementById('flores-span');
if (floresSpan) {
    const img = document.createElement('img');
    img.src = 'assets/mau-pixel-sentado.png';
    img.className = 'mau-sentado-sticker';
    floresSpan.appendChild(img);
}

// --- DATA: SERVICIOS ---
const serviciosData = {
    web: {
        titulo: "Desarrollo Web Estratégico",
        desc: "Tu web lista para recibir clientes y generar confianza.",
        items: ["Landing Pages de alta conversión", "E-commerce funcional", "Diseño Responsive", "Garantía de 3 meses"],
        msj: "Hola Mau, me interesa el Desarrollo Web."
    },
    hosting: {
        titulo: "Hosting & Dominio",
        desc: "Me encargo de la parte técnica para que no sufras.",
        items: ["Configuración de Servidor", "Certificado SSL (Seguro)", "Correos Corporativos", "Dominio .com / .mx"],
        msj: "Hola Mau, necesito hosting y dominio para mi web."
    },
    mantenimiento: {
        titulo: "Soporte y Mantenimiento",
        desc: "Cero preocupaciones. Tu sitio siempre al 100%.",
        items: ["Actualizaciones de seguridad", "Limpieza de base de datos", "Corrección de errores", "Copias de seguridad"],
        msj: "Hola Mau, quiero el plan de mantenimiento."
    },
    ia: {
        titulo: "Automatización con IA",
        desc: "Tecnología de punta para escalar tu negocio.",
        items: ["Chatbots inteligentes", "Integración con OpenAI", "Automatización de leads", "Consultoría de herramientas"],
        msj: "Hola Mau, cuéntame más sobre la IA para mi negocio."
    }
};

// --- DATA: PAQUETES ---
const paquetesData = {
    basic: {
        titulo: "🟢 Paquete: Presencia Online",
        desc: "Ideal para emprendedores que necesitan verse profesionales rápidamente.",
        items: ["1 Landing page optimizada", "Diseño responsive", "Formulario de contacto", "Integración con WhatsApp", "Configuración de dominio y hosting", "Garantía de funcionamiento inicial"],
        msj: "Hola Mau, me interesa el Paquete Básico."
    },
    pro: {
        titulo: "🔵 Paquete: Crecimiento Profesional",
        desc: "Para negocios establecidos que quieren atraer más clientes potenciales.",
        items: ["Sitio web (hasta 5 secciones)", "Diseño personalizado y SEO básico", "1 mes de mantenimiento incluido", "Integración con Email Marketing", "🛡️ Soporte: 30 días"],
        msj: "Hola Mau, me interesa el Paquete Profesional."
    },
    premium: {
        titulo: "🟣 Paquete: Ventas y Escalabilidad",
        desc: "Para negocios que buscan vender online o automatizar procesos.",
        items: ["Ecommerce o Web Completa", "Automatización básica con IA", "3 meses de mantenimiento incluido", "Pasarela de pagos optimizada", "🛡️ Garantía extendida: 90 días"],
        msj: "Hola Mau, me interesa el Paquete Premium."
    }
};

// --- DATA: GARANTIAS ---
const garantiasData = {
    standard: {
        titulo: "🛡️ Garantía de 30 Días",
        sub: "(Paquetes básicos y profesionales)",
        cubre: ["Errores técnicos del desarrollo", "Ajustes menores existentes", "Dudas sobre uso del sitio", "Revisión de formularios"],
        no: ["Cambios de diseño", "Nuevas funcionalidades", "Contenido adicional", "Rediseño completo"],
        meta: ["Aplica alcance original", "Reportar en 30 días", "Respuesta: 24–72h"],
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

// --- FUNCTIONS: MODALS ---

function verServicio(id) {
    const data = serviciosData[id];
    const modal = document.getElementById('modal-servicio');
    document.getElementById('modal-titulo').innerText = data.titulo;
    document.getElementById('modal-descripcion').innerText = data.desc;
    document.getElementById('modal-lista').innerHTML = data.items.map(i => `<li style="margin-bottom:8px;">✅ ${i}</li>`).join('');
    document.getElementById('modal-whatsapp').href = `https://wa.me/527206073820?text=${encodeURIComponent(data.msj)}`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function verPaquete(id) {
    const data = paquetesData[id];
    const modal = document.getElementById('modal-servicio');
    document.getElementById('modal-titulo').innerHTML = data.titulo;
    document.getElementById('modal-descripcion').innerText = data.desc;
    document.getElementById('modal-lista').innerHTML = data.items.map(i => `<li style="margin-bottom:8px;">✅ ${i}</li>`).join('');
    document.getElementById('modal-whatsapp').href = `https://wa.me/527206073820?text=${encodeURIComponent(data.msj)}`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarServicio() {
    document.getElementById('modal-servicio').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function verGarantia(tipo) {
    const data = garantiasData[tipo];
    const modal = document.getElementById('modal-garantia');
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
    document.getElementById('modal-garantia').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// --- GLOBAL CLICK HANDLER (CLOSE MODALS) ---
window.onclick = function(event) {
    const modalServ = document.getElementById('modal-servicio');
    const modalGar = document.getElementById('modal-garantia');
    if (event.target == modalServ) cerrarServicio();
    if (event.target == modalGar) cerrarGarantia();
};

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzSAtQkuZE4hcVC08kbCZ5JzR369ovZ8YeKIBB0JVbwNsiDwoELBfjcwcapJD-Ijm3LA/execc";

// Función para mostrar la notificación de Mau
function showToast(mensaje) {
    const toast = document.getElementById('toast-notif');
    const msg = document.getElementById('toast-message');
    msg.innerText = mensaje;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000); // Desaparece tras 4 segundos
}

// Validar Email con expresión regular
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// NEWSLETTER
const newsletterForm = document.querySelector('.minimal-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        const email = input.value.trim();

        if (!validarEmail(email)) {
            showToast("⚠️ Ese correo no se ve bien, checa de nuevo.");
            return;
        }

        showToast("🚀 ¡Enviando! Mau está anotándote...");

        fetch(`${SCRIPT_URL}?sheet=Newsletter&email=${encodeURIComponent(email)}`, {
            method: 'POST',
            mode: 'no-cors'
        }).then(() => {
            showToast("✅ ¡Listo! Ya estás en la lista.");
            newsletterForm.reset();
        });
    });
}

// FORMULARIO DE CONTACTO
const contactForm = document.getElementById('main-contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = contactForm.querySelector('input[placeholder="Nombre"]').value;
        const email = contactForm.querySelector('input[placeholder="Correo"]').value;
        const mensaje = contactForm.querySelector('textarea').value;

        if (!validarEmail(email)) {
            showToast("⚠️ El correo es inválido.");
            return;
        }

        showToast("⏳ Enviando mensaje a Mau...");

        const params = new URLSearchParams({
            sheet: "Contactos",
            nombre: nombre,
            email: email,
            mensaje: mensaje
        });

        fetch(`${SCRIPT_URL}?${params.toString()}`, {
            method: 'POST',
            mode: 'no-cors'
        }).then(() => {
            showToast("📩 ¡Recibido! Te hablo pronto.");
            contactForm.reset();
        });
    });
}

