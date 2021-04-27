const {options} = require('../../options/mariaDB.js')
const knex = require('knex')(options);

const createTable = function() {
    knex.schema.hasTable('mensajes').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('mensajes', function(t) {
            t.increments('id').primary();
            t.string('email', 100);
            t.string('text', 100);
            t.string('date', 100);
          });
        }
      })
      .then(() => console.log("Tabla mensajes lista"))
      .catch((err => { console.log(err); throw err}))
      .finally(() => {
          knex.destroy();
        })

}

const getMensajes = function (){
    return knex.from('mensjaes').select("*")
    .then((rows) => rows)
    .catch((err => { console.log(err); throw err}))
    .finally(() => {
        knex.destroy();
        })  
  }
  
  const addMensaje = function (mensaje){
    return knex('mensajes').insert(mensaje)
    .then(() => console.log("Mensaje insertado"))
        .catch((err) => { console.log(err); throw err})
        .finally(() => {
            knex.destroy();
    });
  }
  
  const deleteMensaje = function (id){
    return knex.from('mensajes').where('id', id).del()
    .then(() => console.log("Mensaje eliminado"))
        .catch((err) => { console.log(err); throw err})
        .finally(() => {
            knex.destroy();
        });
}

module.exports = {
    createTable, getMensajes, addMensaje, deleteMensaje
}
