const MI_WHATSAPP = "5215569336219"; 
let currentImages = [];
let currentIndex = 0;

window.addEventListener('load', () => {
    const container = document.getElementById('catalogo');
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
                    <h3 style="font-size: 1.1rem; color:#0f172a;">${prod.nombre}</h3>
                    <p style="font-weight:bold; color:#005f99; font-size: 1.2rem; margin-top:5px;">$${prod.precio}</p>
                `;
                container.appendChild(card);
            });
        });
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
    document.body.style.overflow = 'hidden'; 
    updateModalImage();
}

function updateModalImage() {
    const box = document.getElementById('modal-image-container');
    box.innerHTML = `<img src="${currentImages[currentIndex]}" onerror="this.src='https://via.placeholder.com/600?text=Cargando+Imagen...'">`;
}

function changeSlide(n) {
    if (currentImages.length <= 1) return;
    currentIndex += n;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateModalImage();
}

function closeModal() {
    document.getElementById('product-modal').style.display = "none";
    document.body.style.overflow = 'auto';
}

document.querySelector('.close-modal').onclick = closeModal;
window.onclick = (e) => { if (e.target == document.getElementById('product-modal')) closeModal(); };