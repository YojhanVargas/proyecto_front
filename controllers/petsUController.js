// Datos de ejemplo de mascotas
const pets = [
    {
        id: 1,
        name: "Fido",
        type: "Perro",
        breed: "Labrador",
        image: "https://img.freepik.com/fotos-premium/labrador-retriever-negro-realista-sobre-deslumbrante-fondo-natural-al-aire-libre_31965-79641.jpg",
        description: "Un perro amigable y enérgico.",
        sellerContact: "https://wa.link/zqvaqg"
    },
    {
        id: 2,
        name: "Mimi",
        type: "Gato",
        breed: "Siames",
        image: "https://img.freepik.com/fotos-premium/gato-siames-realista-sobre-deslumbrante-fondo-natural-al-aire-libre_31965-93050.jpg",
        description: "Una gata elegante y cariñosa.",
        sellerContact: "https://wa.link/zqvaqg"
    },
    {
        id: 3,
        name: "Rex",
        type: "Perro",
        breed: "Pastor Alemán",
        image: "https://img.freepik.com/fotos-premium/pastor-aleman-realista-sobre-deslumbrante-fondo-natural-al-aire-libre_31965-98855.jpg",
        description: "Leal y protector, ideal para la familia.",
        sellerContact: "https://wa.link/zqvaqg"
    },
    {
        id: 4,
        name: "Bella",
        type: "Gato",
        breed: "Maine Coon",
        image: "https://img.freepik.com/fotos-premium/gato-maine-coon-realista-sobre-deslumbrante-fondo-natural-al-aire-libre_31965-79698.jpg",
        description: "Gran tamaño y personalidad dulce.",
        sellerContact: "https://wa.link/zqvaqg"
    },
    {
        id: 5,
        name: "Charlie",
        type: "Perro",
        breed: "Beagle",
        image: "https://img.freepik.com/fotos-premium/retrato-perro-beagle_36755-371.jpg",
        description: "Curioso y amigable, siempre en busca de aventuras.",
        sellerContact: "https://wa.link/206vrd"
    },
    {
        id: 6,
        name: "Kira",
        type: "Gato",
        breed: "Persa",
        image: "https://www.shutterstock.com/image-photo/redwhite-persian-cat-on-black-600nw-2414586065.jpg",
        description: "Gata de pelo largo, tranquila y cariñosa.",
        sellerContact: "https://wa.link/206vrd"
    },
    {
        id: 7,
        name: "Pipo",
        type: "Pajaro",
        breed: "Canario",
        image: "https://png.pngtree.com/thumb_back/fh260/background/20230527/pngtree-yellow-bird-sits-perched-on-a-wall-or-post-image_2682829.jpg",
        description: "Un canario de hermoso canto.",
        sellerContact: "https://wa.link/206vrd"
    },
    {
        id: 8,
        name: "Nemo",
        type: "Pez",
        breed: "Pez Payaso",
        image: "https://img.freepik.com/fotos-premium/pez-payaso-su-habitat-natural-fotografia-vida-silvestre-ia-generativa_836477-14560.jpg",
        description: "Un pez colorido, perfecto para acuarios.",
        sellerContact: "https://wa.link/206vrd"
    },
    {
        id: 9,
        name: "Hammy",
        type: "Hamster",
        breed: "Hámster Sirio",
        image: "https://img.freepik.com/fotos-premium/hamster-sirio-sobre-fondo-blanco_917664-12278.jpg",
        description: "Pequeño, curioso y fácil de cuidar.",
        sellerContact: "https://wa.link/42stg8"
    },
    {
        id: 10,
        name: "Blue",
        type: "Pájaro",
        breed: "Perico",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Wellensittich_maennchen_wildfarben.jpg/800px-Wellensittich_maennchen_wildfarben.jpg",
        description: "Perico alegre y sociable.",
        sellerContact: "https://wa.link/42stg8"
    },
    {
        id: 11,
        name: "Goldie",
        type: "Pez",
        breed: "Pez Dorado",
        image: "https://media.istockphoto.com/id/1323848945/es/foto/sonriente-curioso-pez-dorado-de-cola-de-abanico-naranja-con-las-aletas-extendidas-nadando.jpg?s=612x612&w=0&k=20&c=IqFLW92w2dwAwDr7d6ryY4dxq-PF_Mdr8iywYmiNqDw=",
        description: "Clásico pez dorado, ideal para principiantes.",
        sellerContact: "https://wa.link/42stg8"
    },
    {
        id: 12,
        name: "Speedy",
        type: "Hamster",
        breed: "Hámster Enano Ruso",
        image: "https://st2.depositphotos.com/1001779/6870/i/450/depositphotos_68706835-stock-photo-little-dwarf-hamster-on-womans.jpg",
        description: "Rápido y pequeño, siempre activo.",
        sellerContact: "https://wa.link/42stg8"
    }
];

// Función para mostrar mascotas sugeridas
function showSuggestedPets() {
    const resultsContainer = document.getElementById('results-container');
    pets.forEach(pet => {
        createPetCard(pet, resultsContainer);
    });
}

// Función para filtrar y mostrar los resultados de búsqueda
function searchPets(query) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    const filteredPets = pets.filter(pet => {
        return pet.type.toLowerCase().includes(query.toLowerCase()) ||
               pet.breed.toLowerCase().includes(query.toLowerCase());
    });

    if (filteredPets.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron mascotas que coincidan con la búsqueda.</p>';
        return;
    }

    filteredPets.forEach(pet => {
        createPetCard(pet, resultsContainer);
    });
}

// Función para crear la tarjeta de mascota
function createPetCard(pet, container) {
    const petCard = document.createElement('div');
    petCard.className = 'pet-card';

    petCard.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}">
        <div class="pet-info">
            <h3>${pet.name}</h3>
            <p><strong>Tipo:</strong> ${pet.type}</p>
            <p><strong>Raza:</strong> ${pet.breed}</p>
            <p>${pet.description}</p>
            <a href="${pet.sellerContact}" target="_blank" class="contact-btn" data-contact="${pet.sellerContact}">Contactar</a>
        </div>
    `;

    container.appendChild(petCard);
}

// Función para manejar el contacto
function handleContactClick(event) {
    if (event.target.classList.contains('contact-btn')) {
        // Si es el botón de contactar, permitimos la redirección
        const contactUrl = event.target.getAttribute('data-contact');
        window.open(contactUrl, '_blank');  // Abrir el enlace de WhatsApp en una nueva pestaña
    }
}

// Mostrar sugerencias al cargar la página
window.onload = showSuggestedPets;

// Configurar el botón de búsqueda
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    searchPets(query);
});

// Configurar el manejo de clics en los botones de contacto
document.getElementById('results-container').addEventListener('click', handleContactClick);