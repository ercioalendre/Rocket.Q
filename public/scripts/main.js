import Modal from "./modal.js";

const modal = Modal();

const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalConfirmButton = document.querySelector(".modal button");
const checkCheckButtons = document.querySelectorAll(".actions a.check");
const checkTrashButtons = document.querySelectorAll(".actions a.trash");
const buttonRoomId = document.getElementById("room-id");
const buttonCloseErrorWrapper = document.getElementById("close-error");

buttonRoomId.addEventListener("click", (event) => CopyToClipboard(event, buttonRoomId, true));

if(buttonCloseErrorWrapper){
    buttonCloseErrorWrapper.addEventListener("click", (event) => RemoveErrorWrapper());
}

checkCheckButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, true));
});

checkTrashButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true){
    event.preventDefault();
    const title = check ? "Marcar pergunta como lida" : "Excluir pergunta";
    const description = check ? "marcar esta pergunta como lida?" : "excluir esta pergunta?";
    const text = check ? "Marcar como lida" : "Excluir";
    const slug = check ? "mark-as-read" : "delete";
    const questionId = event.target.dataset.id;
    const roomId = document.querySelector("#room-id").dataset.id;

    document.getElementById("questionAction").value = slug;
    document.getElementById("questionId").value = questionId;

    const form = document.querySelector(".modal form");
    form.setAttribute("action", `/room/${roomId}/manage-question`);

    modalTitle.innerHTML= `${title}`;
    modalDescription.innerHTML= `Você tem certeza que deseja ${description.toLowerCase()}`;
    modalConfirmButton.innerHTML= `${text}`;
    check ? modalConfirmButton.classList.remove("red") : modalConfirmButton.classList.add("red");
    
    modal.open();
}

async function CopyToClipboard(event, element, dataId){
    event.preventDefault();
    const toCopy = dataId ? element.getAttribute("data-id") : element;
    await navigator.clipboard.writeText(toCopy);
}

function RemoveErrorWrapper(){
    document.getElementById("message-wrapper").remove();
}