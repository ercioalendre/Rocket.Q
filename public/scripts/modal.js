export default function Modal(){
    const wrapperSelector = document.querySelector(".modal-wrapper");
    const cancelButton = document.querySelector(".button.cancel");

    cancelButton.addEventListener("click", close);

    window.addEventListener("keydown", function (event) {
        if (event.key == "Escape") {
          close();
        }else{
            return;
        }
      
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

    function open(){
        wrapperSelector.classList.add("active");
        document.getElementById("password").focus();
    }

    function close(){
        wrapperSelector.classList.remove("active");
    }

    return{
        open,
        close
    }
}