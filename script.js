// CONFIGURACIÓN: Número de WhatsApp actualizado para AmShop
const MI_WHATSAPP = "5215569336219"; 

let currentImages = [];
let currentIndex = 0;

// Esperar a que el DOM y los recursos carguen completamente
window.addEventListener('load', () => {
    const container = document.getElementById('catalogo');
    
    // Carga de productos desde el archivo JSON
    fetch('productos.json')
        .then(res => {
            if (!res.ok) throw new Error("No se pudo cargar el catálogo de productos");
            return res.json();
        })
        .then(data => {
            data.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'producto-card';
                
                // Evento de clic para abrir la ficha técnica (Modal)
                card.onclick = () => openModal(prod);
                
                card.innerHTML = `
                    <div class="img-container">
                        <img src="${prod.imagenes[0]}" alt="${prod.nombre}">
                    </div>
                    <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${prod.nombre}</h3>
                    <p style="font-weight:bold; color:#005f99;">$${prod.precio}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Error al inicializar el catálogo:", err);
            container.innerHTML = "<p>Error al cargar los productos. Por favor, intenta más tarde.</p>";
        });
});

/**
 * Abre el modal con la información detallada del producto
 * @param {Object} prod - Objeto con la información del producto seleccionado
 */
function openModal(prod) {
    const modal = document.getElementById('product-modal');
    currentImages = prod.imagenes;
    currentIndex = 0;
    
    // Poblar los campos del modal con los datos del JSON
    document.getElementById('modal-title').innerText = prod.nombre;
    document.getElementById('modal-price').innerText = `$${prod.precio}`;
    document.getElementById('modal-long-desc').innerText = prod.descripcionAmplia || prod.descripcion;
    
    // Generar el enlace de WhatsApp con mensaje personalizado
    const mensajeBase = `Hola AmShop, me interesa obtener más información sobre el producto: ${prod.nombre}`;
    const mensajeCodificado = encodeURIComponent(mensajeBase);
    document.getElementById('whatsapp-link').href = `https://wa.me/${MI_WHATSAPP}?text=${mensajeCodificado}`;
    
    // Mostrar modal y bloquear el scroll del fondo
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; 
    
    updateModalImage();
}

/**
 * Actualiza la imagen visible en el carrusel del modal
 */
function updateModalImage() {
    const box = document.getElementById('modal-image-container');
    if (currentImages.length > 0) {
        box.innerHTML = `<img src="${currentImages[currentIndex]}" alt="Vista del producto">`;
    }
}

/**
 * Cambia la diapositiva del carrusel (Adelante/Atrás)
 * @param {number} n - Dirección del cambio (1 o -1)
 */
function changeSlide(n) {
    if (currentImages.length <= 1) return;
    
    currentIndex += n;
    
    // Lógica de carrusel infinito
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    
    updateModalImage();
}

// Función para cerrar el modal y restaurar el scroll
function closeModal() {
    document.getElementById('product-modal').style.display = "none";
    document.body.style.overflow = 'auto';
}

// Asignar evento de cierre al botón 'X'
document.querySelector('.close-modal').onclick = closeModal;

// Cerrar el modal si el usuario hace clic fuera del contenido blanco
window.onclick = (event) => {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        closeModal();
    }
};