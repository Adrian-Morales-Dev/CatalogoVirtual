let currentImages = [];
let currentIndex = 0;

// Reemplaza con tu número real (incluye el código de país, ej: 521 para México)
const MI_WHATSAPP = "5215569336219"; 

// Cargar productos
fetch('productos.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('catalogo');
        data.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.onclick = () => openModal(prod);
            
            card.innerHTML = `
                <div class="img-container">
                    <img src="${prod.imagenes[0]}" alt="${prod.nombre}">
                </div>
                <h3>${prod.nombre}</h3>
                <p style="font-weight:bold; color:var(--azul-metalico);">$${prod.precio}</p>
            `;
            container.appendChild(card);
        });
    });

// Funciones del Modal
function openModal(prod) {
    currentImages = prod.imagenes;
    currentIndex = 0;
    
    // Llenar información
    document.getElementById('modal-title').innerText = prod.nombre;
    document.getElementById('modal-price').innerText = `$${prod.precio}`;
    document.getElementById('modal-long-desc').innerText = prod.descripcionAmplia;
    
    // Configurar link de WhatsApp
    const mensaje = encodeURIComponent(`Hola AmShop, me interesa el producto: ${prod.nombre}`);
    document.getElementById('whatsapp-link').href = `https://wa.me/${+525569336219}?text=${Holis}`;
    
    document.getElementById('product-modal').style.display = "block";
    updateModalImage();
}

function updateModalImage() {
    const container = document.getElementById('modal-image-container');
    container.innerHTML = `<img src="${currentImages[currentIndex]}">`;
}

function changeSlide(n) {
    if (currentImages.length <= 1) return;
    currentIndex += n;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateModalImage();
}

// Cerrar Modal
document.querySelector('.close-modal').onclick = () => {
    document.getElementById('product-modal').style.display = "none";
};

window.onclick = (event) => {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) modal.style.display = "none";
};