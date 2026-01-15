// CONFIGURACIÓN: Pon tu número aquí (Ej: 521XXXXXXXXXX)
const MI_WHATSAPP = "5215569336219"; 

let currentImages = [];
let currentIndex = 0;

// Esperar a que toda la página cargue
window.addEventListener('load', () => {
    const container = document.getElementById('catalogo');
    
    fetch('productos.json')
        .then(res => {
            if (!res.ok) throw new Error("No se pudo cargar el JSON");
            return res.json();
        })
        .then(data => {
            data.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'producto-card';
                
                // Evento de clic para abrir el modal
                card.onclick = () => openModal(prod);
                
                card.innerHTML = `
                    <div class="img-container">
                        <img src="${prod.imagenes[0]}" alt="${prod.nombre}">
                    </div>
                    <h3>${prod.nombre}</h3>
                    <p style="font-weight:bold; color:#005f99;">$${prod.precio}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => console.error("Error:", err));
});

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
    updateModalImage();
}

function updateModalImage() {
    const box = document.getElementById('modal-image-container');
    box.innerHTML = `<img src="${currentImages[currentIndex]}" alt="Producto">`;
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