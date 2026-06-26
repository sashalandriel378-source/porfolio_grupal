// Variable global para almacenar los datos
let teamMembers = [];
let currentIndex = 0;

// Función para cargar los datos del JSON
async function loadTeamData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        teamMembers = await response.json();
        
        // Inicializar la interfaz una vez cargados los datos
        initCarousel();
    } catch (error) {
        console.error("Error cargando los datos del equipo:", error);
        document.getElementById('team-roles').innerHTML = '<span class="role">Error cargando datos... Se requiere usar un servidor local (ej. Live Server)</span>';
    }
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

