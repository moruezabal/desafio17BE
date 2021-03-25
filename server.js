const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Inventario = require('./Inventario');

const port = 8080
app.use(express.static('public'));

let almacen = new Inventario();

io.on("connection", (socket) =>{
    let products = almacen.getProductos();
    socket.emit('message', products);

    socket.on('new-message', function(data){
        almacen.addProducto(data);
        products = almacen.getProductos();
        io.sockets.emit('message', products);
    })
})

http.listen(port, () => {
    console.log("El servidor http está corriendo en el puerto " + port);
})