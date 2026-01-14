fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById('catalogo');
        
        data.forEach(prod => {
            const card = document.createElement('div');
            card.classList.add('producto-card');
            
            card.innerHTML = `
                <div class="precio-tag">
                    <span>$${prod.precioAnterior}</span>
                    $${prod.precio}
                </div>
                <div class="img-container">
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                </div>
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <ul class="specs-list">
                    ${prod.specs.map(s => `<li>${s}</li>`).join('')}
                </ul>
            `;
            contenedor.appendChild(card);
        });
    });