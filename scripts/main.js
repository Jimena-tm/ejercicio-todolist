//seleccionar los elementos

const  clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = []
let id = 0;

// Mostrar la fecha de hoy
const options = {weekday : "long", month:"long", day: "numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("es-ES", options);

// función añadir

function addToDo (toDo, id, done, trash) {
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li> 
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//Agregar un item a la lista usando enter

document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //si el input no está vacío
        if (toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            id++;
        }
        input.value = "";
    }
});

// el to do item completo
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//eliminar elemento del to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dinamycally

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

});



