// Simulación de base de datos local
let mascotas = [];
let vendidas = [];

// Mostrar/Ocultar el formulario al hacer clic en el botón de agregar mascota
document.getElementById('agregar-mascota-btn').addEventListener('click', function() {
    const formulario = document.getElementById('form-mascota');
    formulario.classList.toggle('activo'); // Mostrar o ocultar el formulario
});

// Función para crear la tarjeta de la mascota
function crearTarjetaMascota(mascota, esVendida = false) {
    const div = document.createElement('div');
    div.classList.add('mascota');

    div.innerHTML = `
        <img src="${mascota.imagen}" alt="${mascota.nombre}">
        <h3>${mascota.nombre}</h3>
        <p><strong>Tipo:</strong> ${mascota.tipo}</p>
        <p><strong>Raza:</strong> ${mascota.raza}</p>
        <p>${mascota.descripcion}</p>
    `;

    // Agregar el botón "Contactar"
    const whatsappBtn = document.createElement('button');
    whatsappBtn.textContent = 'Contactar';
    whatsappBtn.classList.add('contactar-btn');
    whatsappBtn.addEventListener('click', () => {
        window.open(mascota.whatsapp, '_blank'); // Abrir el enlace de WhatsApp en una nueva pestaña
    });
    div.appendChild(whatsappBtn); // Agregar el botón al div de la mascota

    // Si la mascota ha sido vendida, puedes añadir una clase o mensaje adicional si lo deseas
    if (esVendida) {
        div.classList.add('vendida'); // Agrega una clase si quieres estilizarla de otra manera
        const mensajeVendida = document.createElement('p');
        mensajeVendida.textContent = 'Esta mascota ha sido vendida.';
        mensajeVendida.style.color = 'red'; // Cambia el color del mensaje de vendida si deseas
        div.appendChild(mensajeVendida);
    }

    return div;
}

// Función para agregar una nueva mascota
document.getElementById('form-mascota').addEventListener('submit', function(event) {
    event.preventDefault();

    const imagenInput = document.getElementById('imagen');
    const file = imagenInput.files[0];

    if (!file) {
        alert('Debes subir una imagen.');
        return;
    }

    const nuevaMascota = {
        nombre: document.getElementById('nombre').value,
        tipo: document.getElementById('tipo').value,
        raza: document.getElementById('raza').value,
        descripcion: document.getElementById('descripcion').value,
        imagen: URL.createObjectURL(file),  // Obtenemos la URL temporal de la imagen
        whatsapp: document.getElementById('whatsapp').value || null // WhatsApp opcional
    };

    mascotas.push(nuevaMascota);
    actualizarSecciones();

    // Limpiar formulario
    document.getElementById('form-mascota').reset();
});

 

// Función para actualizar las secciones (sin cambios)
function actualizarSecciones() {
    const listaDisponibles = document.getElementById('lista-disponibles');
    const listaVendidas = document.getElementById('lista-vendidas');
    const listaTodas = document.getElementById('lista-todas');

    // Limpiar las listas
    listaDisponibles.innerHTML = '';
    listaVendidas.innerHTML = '';
    listaTodas.innerHTML = '';

    // Mascotas disponibles
    mascotas.forEach(mascota => {
        const tarjeta = crearTarjetaMascota(mascota);
        listaDisponibles.appendChild(tarjeta);
    });

    // Mascotas vendidas
    vendidas.forEach(mascota => {
        const tarjeta = crearTarjetaMascota(mascota, true);
        listaVendidas.appendChild(tarjeta);
    });

    // Todas las mascotas
    [...mascotas, ...vendidas].forEach(mascota => {
        const tarjeta = crearTarjetaMascota(mascota, vendidas.includes(mascota));
        listaTodas.appendChild(tarjeta);
    });
}


// Script para mostrar/ocultar secciones
document.getElementById('show-all').addEventListener('click', function() {
    showSection('all-mascotas');
});

document.getElementById('show-available').addEventListener('click', function() {
    showSection('available-mascotas');
});

document.getElementById('show-sold').addEventListener('click', function() {
    showSection('sold-mascotas');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Inicializar con datos vacíos
actualizarSecciones();