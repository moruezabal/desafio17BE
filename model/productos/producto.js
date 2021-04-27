const {options} = require('../../options/mariaDB.js')
const knex = require('knex')(options);

const createTable = function() {
    knex.schema.hasTable('productos').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('productos', function(t) {
            t.increments('id').primary();
            t.string('title', 100);
            t.string('price', 100);
            t.string('thumbnail', 100);
          });
        }
      })
      .then(() => console.log("Tabla productos lista"))
      .catch((err => { console.log(err); throw err}))
      .finally(() => {
          knex.destroy();
        })

}

const getProductos = function (){
  return knex.from('productos').select("*")
  .then((rows) => rows)
  .catch((err => { console.log(err); throw err}))
  .finally(() => {
      knex.destroy();
      })  
}

const addProducto = function (producto){
  return knex('productos').insert(producto)
  .then(() => console.log("Producto insertado"))
      .catch((err) => { console.log(err); throw err})
      .finally(() => {
          knex.destroy();
  });
}

const deleteProducto = function (id){
  return knex.from('productos').where('id', id).del()
  .then(() => console.log("Producto eliminado"))
      .catch((err) => { console.log(err); throw err})
      .finally(() => {
          knex.destroy();
  });

}

module.exports = {
    createTable, addProducto, getProductos, deleteProducto
}
