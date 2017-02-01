/**
 * Created by borga on 01/02/17.
 */
var modal = document.getElementById('modal');
var span = document.getElementsByClassName("modal-close")[0];
var body = document.getElementsByTagName("body")[0];

span.onclick = function() {
    modal.style.display = "none";
    body.classList.remove("modal-open");
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        body.classList.remove("modal-open")
    }
};

window.onload = function(){
    modal.style.display = "block";
    body.classList.add("modal-open");
};