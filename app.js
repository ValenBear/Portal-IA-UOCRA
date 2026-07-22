document.addEventListener('DOMContentLoaded', () => {
    const agents = [
        {
            id: "presmed",
            name: "Agente Presmed",
            description: "Asistente inteligente para consultas y trámites de prestaciones médicas.",
            path: "http://localhost:8100/agente-presmed-ui/",
            icon: "🏥",
            status: "online"
        },
        {
            id: "cau",
            name: "Agente CAU",
            description: "Centro de Atención al Usuario. Asistencia rápida para consultas generales.",
            path: "http://localhost:8100/agente-cau-ui/",
            icon: "🎧",
            status: "online"
        },
        {
            id: "0800",
            name: "Agente 0800",
            description: "Asistente virtual para la línea telefónica 0800. Atención automatizada de consultas.",
            path: "http://localhost:8100/agente-0800-ui/",
            icon: "📞",
            status: "online"
        },
        {
            id: "appuocra",
            name: "App UOCRA",
            description: "Aplicación móvil oficial. Accedé a tu credencial, novedades y todos los servicios desde tu celular.",
            path: "#", // Se maneja dinámicamente con JS
            icon: "📱",
            status: "online",
            isApp: true
        }
    ];

    const grid = document.getElementById('agents-grid');

    // URLs de las tiendas correspondientes a App UOCRA
    const URL_ANDROID = "https://play.google.com/store/apps/details?id=ar.org.uocra.app"; 
    const URL_IOS = "https://apps.apple.com/ar/app/uocra/id123456789"; 

    // Función para detectar el sistema operativo móvil y devolver el link adecuado
    function getAppStoreLink() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Detección de Android
        if (/android/i.test(userAgent)) {
            return URL_ANDROID;
        }
        
        // Detección de iOS
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return URL_IOS;
        }
        
        // Fallback (ej: si abre desde una PC Windows/Mac). Por defecto le mostramos la Play Store o puedes cambiarlo.
        return URL_ANDROID; 
    }

    // Exponer la función globalmente para que funcione el onclick
    window.openAppStore = function() {
        window.open(getAppStoreLink(), '_blank');
    };

    function renderAgents() {
        grid.innerHTML = '';

        agents.forEach(agent => {
            const card = document.createElement('article');
            card.className = 'agent-card';

            // Si es la aplicación móvil, el botón ejecuta la función que detecta el SO
            let buttonHtml = '';
            if (agent.isApp) {
                buttonHtml = `<button onclick="window.openAppStore()" class="agent-button" style="border:none; cursor:pointer; width:100%; font-family:inherit; font-size:1rem;">Descargar App</button>`;
            } else {
                buttonHtml = `<a href="${agent.path}" target="_blank" rel="noopener noreferrer" class="agent-button">Ingresar al Agente</a>`;
            }

            card.innerHTML = `
                <div class="agent-icon">${agent.icon}</div>
                <div class="status-badge">
                    <span class="status-dot" style="background-color: ${agent.status === 'online' ? 'var(--ok)' : 'var(--error)'}"></span>
                    ${agent.status === 'online' ? 'En línea' : 'Mantenimiento'}
                </div>
                <h2>${agent.name}</h2>
                <p>${agent.description}</p>
                ${buttonHtml}
            `;

            grid.appendChild(card);
        });
    }

    renderAgents();

    // Scroll animation for logo
    const portalLogo = document.getElementById('portal-logo');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            portalLogo.classList.add('shrunk');
        } else {
            portalLogo.classList.remove('shrunk');
        }
    });
});
