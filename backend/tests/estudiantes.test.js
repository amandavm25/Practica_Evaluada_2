const request = require('supertest');
const app = require('../src/app');

describe('Pruebas de la API de Estudiantes', () => {

    // 1. Probar que liste los estudiantes correctamente
    it('Debería retornar todos los estudiantes con código 200', async () => {
        const res = await request(app).get('/api/estudiantes');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0); // Verifica que traiga los estudiantes que agregamos
    });

    // 2. Probar que cree un estudiante nuevo correctamente
    it('Debería crear un estudiante nuevo exitosamente', async () => {
        const nuevoEstudiante = {
            cedula: "7-8899-0011",
            nombre: "Sofía",
            apellido: "Blanco",
            correo: "sofia.blanco@email.com",
            carrera: "Ingeniería en Sistemas",
            edad: 20
        };

        const res = await request(app)
            .post('/api/estudiantes')
            .send(nuevoEstudiante);

        expect(res.statusCode).toBeLessThan(300); // Espera 200 o 201
        expect(res.body).toHaveProperty('estudiante'); // Validamos que venga el objeto estudiante
        expect(res.body.estudiante).toHaveProperty('id');
        expect(res.body.estudiante.nombre).toEqual("Sofía");
    });

    // 3. Probar validación de errores (cédula con formato incorrecto)
    it('Debería fallar al intentar registrar una cédula con formato inválido', async () => {
        const estudianteInvalido = {
            cedula: "123", // Formato incorrecto
            nombre: "Test",
            apellido: "Error",
            correo: "correo@email.com",
            carrera: "Sistemas",
            edad: 20
        };

        const res = await request(app)
            .post('/api/estudiantes')
            .send(estudianteInvalido);

        expect(res.statusCode).toEqual(400); // Código HTTP de error de validación
    });

});