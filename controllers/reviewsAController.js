document.addEventListener("DOMContentLoaded", async () => {
    const reviewCountElement = document.getElementById("reviewCount");
    const reviewsListElement = document.getElementById("reviewsList");

    // Obtener las reseñas desde la base de datos
    const response = await fetch('/api/getPendingReviews');
    const reseñas = await response.json();

    // Actualizar el conteo de reseñas pendientes
    reviewCountElement.textContent = reseñas.length;

    // Cargar las reseñas en el panel
    reseñas.forEach(reseña => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        if (reseña.contieneGroserias) {
            reviewElement.classList.add("subrayada");
        }

        reviewElement.innerHTML = `
            <p class="content">${reseña.content}</p>
            <button class="deleteBtn" data-id="${reseña.id}">Eliminar</button>
        `;

        reviewsListElement.appendChild(reviewElement);
    });

    // Manejar la eliminación de reseñas
    reviewsListElement.addEventListener("click", async (e) => {
        if (e.target.classList.contains("deleteBtn")) {
            const reviewId = e.target.getAttribute("data-id");
            await eliminarReseña(reviewId);
        }
    });
});

// Función para eliminar una reseña
async function eliminarReseña(id) {
    const response = await fetch(`/api/deleteReview/${id}`, { method: 'DELETE' });
    const result = await response.json();

    if (result.success) {
        actualizarUI();
    }
}

// Función para actualizar la UI
async function actualizarUI() {
    const reviewCountElement = document.getElementById("reviewCount");
    const reviewsListElement = document.getElementById("reviewsList");

    // Obtener las reseñas actualizadas desde la base de datos
    const response = await fetch('/api/getPendingReviews');
    const reseñas = await response.json();

    // Actualizar el conteo de reseñas pendientes
    reviewCountElement.textContent = reseñas.length;

    // Limpiar y recargar la lista de reseñas
    reviewsListElement.innerHTML = "";
    reseñas.forEach(reseña => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        if (reseña.contieneGroserias) {
            reviewElement.classList.add("subrayada");
        }

        reviewElement.innerHTML = `
            <p class="content">${reseña.content}</p>
            <button class="deleteBtn" data-id="${reseña.id}">Eliminar</button>
        `;

        reviewsListElement.appendChild(reviewElement);
    });
}