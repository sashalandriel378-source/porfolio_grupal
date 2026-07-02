// Variable global para almacenar los datos
let teamMembers = [];
let currentIndex = 0;

async function loadTeamData() {
    const backendUrl = '/api/team';

    try {
        const response = await fetch(backendUrl, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        teamMembers = await response.json();
    } catch (error) {
        console.warn('Backend no disponible, cargando data local:', error);

        try {
            const localResponse = await fetch('data.json', { cache: 'no-store' });
            if (!localResponse.ok) {
                throw new Error(`HTTP error local data! status: ${localResponse.status}`);
            }
            teamMembers = await localResponse.json();
        } catch (localError) {
            console.error('Error cargando data local:', localError);
            document.getElementById('team-roles').innerHTML = '<span class="role">Error cargando datos... Inicia el backend o abre el archivo con Live Server.</span>';
            return;
        }
    }

    initCarousel();
}

// Renderiza los nombres de los integrantes destacando el actual
function renderMembers() {
    const rolesContainer = document.getElementById('team-roles');
    rolesContainer.innerHTML = '';
    
    teamMembers.forEach((member, index) => {
        const span = document.createElement('span');
        span.className = `role ${index === currentIndex ? 'active' : ''}`;
        span.textContent = member.name;
        
        rolesContainer.appendChild(span);
        
        // Agregar separador (bullet) excepto al último elemento
        if (index < teamMembers.length - 1) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.innerHTML = '&bull;';
            rolesContainer.appendChild(dot);
        }
    });
}

// Actualiza la imagen del avatar con animación
function updateProfile() {
    if (teamMembers.length === 0) return;
    
    const imgElement = document.getElementById('profile-img');
    const subtitleElement = document.getElementById('subtitle-text');
    const member = teamMembers[currentIndex];
    
    // Iniciar animación de desvanecimiento
    imgElement.style.opacity = '0';
    
    setTimeout(() => {
        // Actualizar datos
        imgElement.src = member.avatar;
        imgElement.alt = member.name;
        
        if (subtitleElement) {
            subtitleElement.innerHTML = `${member.role} &bull; 7mo Año - IPET 379`;
        }
        
        // Renderizar lista de integrantes para actualizar el activo
        renderMembers();
        
        // Mostrar nueva imagen
        imgElement.style.opacity = '1';
    }, 400); // Darle tiempo a la opacidad de llegar a 0
}

// Pasa al siguiente integrante
function nextMember() {
    if (teamMembers.length === 0) return;
    currentIndex = (currentIndex + 1) % teamMembers.length;
    updateProfile();
}

// Configura las animaciones e inicia el carrusel
function initCarousel() {
    const imgElement = document.getElementById('profile-img');
    
    // Configurar transición CSS en la imagen si no la tiene
    imgElement.style.transition = 'opacity 0.4s ease-in-out';
    
    // Renderizado inicial
    updateProfile();
    
    // Iniciar carrusel automático (cambia cada 5 segundos)
    setInterval(nextMember, 5000);
}

// Iniciar proceso cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadTeamData();
});

