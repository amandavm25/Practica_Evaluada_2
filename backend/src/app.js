const express = require("express");
const cors = require("cors");

const estudianteRoutes = require("./routes/estudianteRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de estudiantes funcionando correctamente"
    });
});

app.use(
    "/api/estudiantes",
    estudianteRoutes
);

module.exports = app;