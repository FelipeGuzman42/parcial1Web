const URL = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let it = 0;
function cambiarMenu (cat){
    fetch(URL).then(res=>res.json().then(res=>{
        let data = res;
        let card = document.getElementById("menu");
        let titulo = document.getElementById("tituloMenu");
        titulo.textContent = cat.target.textContent;
        card.innerHTML = '';
        data.forEach(element => {
            if (element.name == cat.target.textContent){
                element.products.forEach(e => {
                    let col = document.createElement('col');
                    col.innerHTML = '<div class="card h-100">'+
                    '<img src="'+e.image+'" class="card-img-top" alt="image">'+
                    '<div class="card-body">'+
                    '<h5 class="card-title">'+e.name+'</h5>'+
                    '<p class="card-text">'+e.description+'<br>'+e.price+'</p>'+
                    '<button type="button" class="btn btn-dark" onclick="agregarCarrito()">Add to car</button>'+
                    '</div>'+
                    '</div>';
                    card.appendChild(col);
                });
            }
        });
    }))
}

function agregarCarrito (){
    it++;
    let itm = document.getElementById("item");
    itm.textContent = it+" items";
}
const bur = document.getElementById("bur");
const tac = document.getElementById("tac");
const sal = document.getElementById("sal");
const des = document.getElementById("des");
const drink = document.getElementById("drink");

bur.onclick = cambiarMenu;
tac.onclick = cambiarMenu;
sal.onclick = cambiarMenu;
des.onclick = cambiarMenu;
drink.onclick = cambiarMenu;