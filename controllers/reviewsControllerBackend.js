// reviewsControllerBackend.js

const express = require('express');
const router = express.Router();
const db = require('./db'); // Archivo de configuración de la base de datos

// Ruta para agregar una nueva reseña
router.post('/add-review', (req, res) => {
    const { clientName, petName, petStatus, reviewText, rating, clientPhoto, petPhoto } = req.body;

    const sql = `
        INSERT INTO reseñas (cliente_nombre, mascota_nombre, estado_mascota, texto_reseña, calificación, cliente_foto, mascota_foto)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [clientName, petName, petStatus, reviewText, rating, clientPhoto, petPhoto];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al agregar la reseña');
        } else {
            res.redirect('/views/reviews.html'); // Redirigir de nuevo a la página de reseñas
        }
    });
});

router.get('/reviews', (req, res) => {
    const sql = 'SELECT * FROM reseñas ORDER BY fecha_reseña DESC';

    db.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al obtener las reseñas');
        } else {
            res.render('reviews', { reviews: results }); // Renderizar la página con las reseñas
        }
    });
});
module.exports = router;