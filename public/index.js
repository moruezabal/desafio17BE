let socket = io.connect('http://localhost:8080/', { forceNew : true});

socket.on('message', (data) => {
    render(data);
})

function render (data){
    let html = data.map( elem =>{
       return ( `<tr>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td><img src="${elem.thumbnail}"></td>
                </tr>`);
    }).join(" ");

    document.getElementById('bodyTable').innerHTML = html;
}

function addMessages (){
    let product = {
        title : document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('new-message', product);
    return false;
};