const MI_WHATSAPP = "5215569336219"; 
let currentImages = [];
let currentIndex = 0;

// Arreglo de testimonios
const testimoniosData = [
    {
        nombre: "DJ Marco, Sonido Éxtasis",
        comentario: "Llevaba tiempo buscando refacciones para mi fuente FP10000Q y aquí encontré justo la tarjeta de potencia que necesitaba. Mi amplificador quedó como nuevo, tiran durísimo los bajos. Excelente trato.",
        calificacion: 5
    },
    {
        nombre: "Carlos R., Ingeniero de Video",
        comentario: "Compré el controlador Novastar y el envío fue rapidísimo. El equipo funciona a la perfección en mis pantallas LED. Te resuelven las dudas técnicas al instante por WhatsApp, 100% recomendados.",
        calificacion: 5
    },
    {
        nombre: "Luis S., Producciones Sinergia",
        comentario: "Los kits de balastra y focos 7R salieron de muy buena calidad. Reviví 4 cabezas móviles que tenía arrumbadas en la bodega. Definitivamente volveré a comprar equipo con ustedes.",
        calificacion: 5
    }
];

// Esperar a que el HTML cargue completamente antes de inyectar contenido
document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
    cargarTestimonios();
});

function cargarCatalogo() {
    const container = document.getElementById('catalogo');
    if (!container) return; // Si no encuentra el contenedor, no hace nada

    fetch('productos.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'producto-card';
                card.onclick = () => openModal(prod);
                card.innerHTML = `
                    <div class="img-container">
                        <img src="${prod.imagenes[0]}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/300?text=Sin+Imagen'">
                    </div>
                    <h3 style="font-size: 1.1rem; color:#0f172a; margin-bottom: 10px;">${prod.nombre}</h3>
                    <p style="font-weight:bold; color:#005f99; font-size: 1.3rem;">$${prod.precio}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error cargando los productos:', error));
}

function cargarTestimonios() {
    const testimoniosContainer = document.getElementById('testimonios-grid');
    if (!testimoniosContainer) return; // Si no encuentra el contenedor, no hace nada

    testimoniosData.forEach(testimonio => {
        const tCard = document.createElement('div');
        tCard.className = 'testimonio-card';
        
        let estrellasHTML = '';
        for(let i = 0; i < testimonio.calificacion; i++) {
            estrellasHTML += '<i class="fas fa-star" style="color: #fbbf24; margin-right: 2px;"></i>';
        }

        tCard.innerHTML = `
            <div style="margin-bottom: 15px;">${estrellasHTML}</div>
            <p style="font-style: italic; color: #475569; margin-bottom: 15px; line-height: 1.5;">"${testimonio.comentario}"</p>
            <h4 style="color: #0f172a; font-size: 1rem;">- ${testimonio.nombre}</h4>
        `;
        testimoniosContainer.appendChild(tCard);
    });
}

// --- FUNCIONES DEL MODAL ---
function openModal(prod) {
    const modal = document.getElementById('product-modal');
    currentImages = prod.imagenes;
    currentIndex = 0;
    
    document.getElementById('modal-title').innerText = prod.nombre;
    document.getElementById('modal-price').innerText = `$${prod.precio}`;
    document.getElementById('modal-long-desc').innerText = prod.descripcionAmplia || prod.descripcion;
    
    const mensaje = encodeURIComponent(`Hola AmShop, me interesa el producto: ${prod.nombre}`);
    document.getElementById('whatsapp-link').href = `https://wa.me/${MI_WHATSAPP}?text=${mensaje}`;
    
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; 
    updateModalImage();
}

function updateModalImage() {
    const box = document.getElementById('modal-image-container');
    if (currentImages && currentImages.length > 0) {
        box.innerHTML = `<img src="${currentImages[currentIndex]}" onerror="this.src='https://via.placeholder.com/600?text=Cargando+Imagen...'">`;
    }
}

function changeSlide(n) {
    if (!currentImages || currentImages.length <= 1) return;
    currentIndex += n;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateModalImage();
}

function closeModal() {
    document.getElementById('product-modal').style.display = "none";
    document.body.style.overflow = 'auto';
}

// Asignar el evento para cerrar el modal
const btnClose = document.querySelector('.close-modal');
if (btnClose) {
    btnClose.onclick = closeModal;
}

window.onclick = (e) => { 
    if (e.target === document.getElementById('product-modal')) {
        closeModal(); 
    }
};