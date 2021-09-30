const URL = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let items = 0;
const complementoPagina = document.getElementById("complementoPagina");
let detalleOrden = document.getElementById("detalleOrden");
let card = document.getElementById("menu");
let total = document.getElementById("total");
let item = document.getElementById("item");
let alerta = document.getElementById("alerta");
let pedidos = {};
let cantidad = {};
var data;

fetch(URL).then(res=>res.json().then(res=>{
    data = res;
}));

function cambiarMenu (cat){
    const titulo = document.getElementById("tituloMenu");
    detalleOrden.style.display = "none";
    titulo.textContent = cat.textContent;
    card.innerHTML = '';
    complementoPagina.style.display = "block";
    data.forEach(element => {
        if (element.name == cat.textContent){
            element.products.forEach(e => {
                let col = document.createElement('col');
                col.innerHTML = '<div class="card h-100">'+
                '<img src="'+e.image+'" class="card-img-top" height="300" alt="image">'+
                '<div class="card-body">'+
                '<h5 class="card-title">'+e.name+'</h5>'+
                '<p class="card-text">'+e.description+'</p>'+
                '<h6 class="card-text">$'+e.price+'</h6>'+
                '<button type="button" class="btn btn-dark" onclick="agregarCarrito(this)">Add to cart</button>'+
                '</div>'+'</div>';
                card.appendChild(col);
            });
        }
    });
}

function agregarCarrito(element){
    items++;
    item.textContent = items+" items";
    let producto = element.parentElement.firstElementChild.textContent;
    let precio = Number(element.previousSibling.textContent.substring(1));
    if (producto in pedidos) {
        cantidad[producto] = cantidad[producto] + 1;
    } else { 
        pedidos[producto] = precio;
        cantidad[producto] = 1;
    }
}

function showDetalleOrden(){
    complementoPagina.style.display = "none";
    card.innerHTML = '';
    detalleOrden.style.display = "block";
    let table = document.getElementById("tabla");
    table.innerHTML = '<tr><th>Item</th><th>Qty.</th><th>Description</th><th>Unit Price</th><th>Amount</th><th>Modify</th></tr>';
    let i = 1;
    let suma = 0;
    Object.keys(pedidos).forEach(key => {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + i + '</td>' +
        '<td>' + cantidad[key] + '</td>'+
        '<td>' + key + '</td>' +
        '<td>' + pedidos[key] + '</td>'+
        '<td>' + (pedidos[key] * cantidad[key]).toFixed(2) + '</td>'+
        '<td>' +
        '<button type="button" class="btn btn-secondary" onclick="cambioPedido(this, 1)">+</button>' + '  ' +
        '<button type="button" class="btn btn-secondary" onclick="cambioPedido(this, -1)">-</button>' + 
        '</td>';
        table.appendChild(tr);
        i++;
        suma += (pedidos[key] * cantidad[key]);
    });
    total.textContent = "Total: $"+suma.toFixed(2);
}

function cambioPedido(e, cambio){
    let llave = e.parentElement.parentElement.firstElementChild.nextSibling.nextSibling.textContent;
    items = items + cambio;
    cantidad[llave] = cantidad[llave] + cambio;
    if (cantidad[llave] == 0){
        delete cantidad[llave];
        delete pedidos[llave];
    }
    item.textContent = items+" items";
    showDetalleOrden();
}

function showAlert() {
    alerta.style.display = "block";
}

function hideAlert() {
    alerta.style.display = "none";
}

function borrarPedido(){
    let table = document.getElementById("tabla");
    table.innerHTML = '<tr><th>Item</th><th>Qty.</th><th>Description</th><th>Unit Price</th><th>Amount</th><th>Modify</th></tr>';
    alerta.style.display = "none";
    total.textContent = "Total: $0";
    pedidos = {};
    cantidad = {};
    items = 0;
    item.textContent = items+" items";
}

function confirmarPedido(){
    let confirmados = [];
    let i = 1;
    Object.keys(pedidos).forEach(key => {
        let confirmado = {};
        confirmado["item"] = i;
        confirmado["quantity"] = cantidad[key];
        confirmado["description"] = key;
        confirmado["unitPrice"] = pedidos[key];
        confirmados.push(confirmado);
        i++;
    });
    console.log(confirmados);
}