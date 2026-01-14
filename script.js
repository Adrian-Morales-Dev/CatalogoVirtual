let currentImages = [];
let currentIndex = 0;

// Cargar productos
fetch('productos.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('catalogo');
        data.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.onclick = () => openModal(prod.imagenes, prod.nombre);
            
            card.innerHTML = `
                <div class="precio-tag">$${prod.precio}</div>
                <div class="img-container">
                    <img src="${prod.imagenes[0]}" alt="${prod.nombre}">
                </div>
                <h3>${prod.nombre}</h3>
                <p style="font-size: 0.85rem; color: #666;">${prod.descripcion}</p>
            `;
            container.appendChild(card);
        });
    })
    .catch(err => console.error("Error cargando productos:", err));

// Funciones del Modal
function openModal(imgs, nombre) {
    currentImages = imgs;
    currentIndex = 0;
    document.getElementById('product-modal').style.display = "block";
    document.getElementById('modal-caption').innerText = nombre;
    updateModalImage();
}

function updateModalImage() {
    const container = document.getElementById('modal-image-container');
    container.innerHTML = `<img src="${currentImages[currentIndex]}" style="max-width:100%; border-radius:10px;">`;
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateModalImage();
}

document.querySelector('.close-modal').onclick = () => {
    document.getElementById('product-modal').style.display = "none";
};