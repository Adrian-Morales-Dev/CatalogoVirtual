let currentImages = [];
let currentIndex = 0;

fetch('productos.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('catalogo');
        data.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'producto-card'; // Usa el estilo de la respuesta anterior
            card.innerHTML = `
                <div class="img-container" onclick="openModal(${JSON.stringify(prod.imagenes).replace(/"/g, '&quot;')})">
                    <img src="${prod.imagenes[0]}" alt="${prod.nombre}">
                    <p class="tap-hint">Ver más fotos</p>
                </div>
                <h3>${prod.nombre}</h3>
                <p class="precio">$${prod.precio}</p>
            `;
            container.appendChild(card);
        });
    });

function openModal(imgs) {
    currentImages = imgs;
    currentIndex = 0;
    document.getElementById('product-modal').style.display = "block";
    updateModalImage();
}

function updateModalImage() {
    const container = document.getElementById('modal-image-container');
    container.innerHTML = `<img src="${currentImages[currentIndex]}">`;
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateModalImage();
}

// Cerrar modal
document.querySelector('.close-modal').onclick = () => {
    document.getElementById('product-modal').style.display = "none";
};