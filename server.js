const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8080

app.get("/", (req, res) =>{
    res.status(200).send("Hola Mundo");
})

http.listen(port, () => {
    console.log("El servidor http está corriendo en el puerto " + port);
})