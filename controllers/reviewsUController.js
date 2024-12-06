// Mostrar y ocultar el modal
function openReviewModal() {
    document.getElementById('review-modal').style.display = 'block';
}

function closeReviewModal() {
    document.getElementById('review-modal').style.display = 'none';
}

// Lógica de reseñas
const reviews = [];

document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const clientName = document.getElementById('client-name').value;
    const petName = document.getElementById('pet-name').value;
    const petStatus = document.getElementById('pet-status').value;
    const reviewText = document.getElementById('review-text').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    // Reemplaza con la lógica de obtener imágenes
    const clientPhoto = 'ruta_de_foto_del_cliente'; // Foto de cliente
    const petPhoto = 'ruta_de_foto_de_la_mascota'; // Foto de mascota

    const newReview = {
        clientName,
        petName,
        petStatus,
        reviewText,
        rating,
        clientPhoto,
        petPhoto,
        reviewDate: formatDate(new Date())
    };

    reviews.push(newReview);
    addReviewToDOM(newReview);
    document.getElementById('review-form').reset();
    closeReviewModal();
});

// Función para añadir reseña al DOM
function addReviewToDOM(review) {
    const reviewsContainer = document.querySelector('.reviews-container');
    const row = document.createElement('div');
    row.classList.add('review-row'); // Para agrupar reseñas de tres en tres

    const reviewHTML = `
    <div class="review-card">
        <div class="review-header">
            <img src="${review.clientPhoto}" alt="Foto del Cliente" class="client-photo">
            <div class="client-info">
                <h3>${review.clientName}</h3>
                <p class="review-date">${review.reviewDate}</p>
            </div>
            <div class="rating">
                ${generatePawRating(review.rating)}
            </div>
        </div>
        <div class="review-content">
            <div class="pet-photo">
                <img src="${review.petPhoto}" alt="Foto de la Mascota">
            </div>
            <div class="pet-info">
                <h4>${review.petName}</h4>
                <p><strong>Estado de la Mascota:</strong> ${review.petStatus}</p>
                <p>${review.reviewText}</p>
            </div>
        </div>
    </div>`;

    row.innerHTML = reviewHTML;
    reviewsContainer.appendChild(row);

    // Agrupar reseñas en filas de 3
    if (reviewsContainer.children.length % 3 === 0) {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('review-row');
        reviewsContainer.appendChild(rowContainer);
    }
}

// Generar huellitas en base a la calificación
function generatePawRating(rating) {
    let paws = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            paws += '<i class="fas fa-paw filled"></i>';
        } else {
            paws += '<i class="fas fa-paw"></i>';
        }
    }
    return paws;
}

// Formatear fecha para que el mes aparezca en letras
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Seleccionar calificación con huellas dinámicamente
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const pawIcons = document.querySelectorAll('.paw-icon');

ratingInputs.forEach((input, index) => {
  input.addEventListener('change', () => {
    // Resetear todas las huellas a color gris
    pawIcons.forEach(icon => {
      icon.classList.remove('active');
    });

    // Colorear las huellas hasta el valor seleccionado
    for (let i = 0; i <= index; i++) {
      pawIcons[i].classList.add('active');
    }
  });
});