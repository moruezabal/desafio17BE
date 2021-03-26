let socket = io.connect('http://localhost:8080/', { forceNew : true});

let formularioChat = document.getElementById("formChat");

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

function addProduct (){
    let product = {
        title : document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('new-message', product);
    return false;
};

formularioChat.addEventListener('submit', ()=>{
    event.preventDefault();
    let now = new Date(Date.now());
    let dateAndHour = now.toUTCString()


    let chat = {
        email : document.getElementById('email').value,
        text: document.getElementById('message').value,
        date: dateAndHour
    }

    console.log(JSON.stringify(chat));
})