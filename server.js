const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const modelProducto = require('./model/productos/producto.js')
const modelMensaje = require('./model/mensajes/mensaje.js')

const port = 8080
app.use(express.static('public'));

io.on("connection", async (socket) =>{
    let products = await modelProducto.getProductos();
    let messages = await modelMensaje.getMensajes();
    socket.emit('listProducts', products);
    socket.emit('messages', messages);

    socket.on('new-product', async function(data){
        modelProducto.addProducto(data);
        products = await modelProducto.getProductos();
        io.sockets.emit('listProducts', products);
    })

    socket.on('new-message', async function(data){
       modelMensaje.addMensaje(data);
       messages = await modelMensaje.getMensajes(); 
       io.sockets.emit('messages', messages);
    
    })
})

modelProducto.createTable();
modelMensaje.createTable();


http.listen(port, () => {
    console.log("El servidor http está corriendo en el puerto " + port);
})