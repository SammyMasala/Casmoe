"use strict"
this.addEventListener("load", start);

function start(){
    var f = document.getElementById("CorpusField");
    if (!f){
        console.log("Error: Element 'CorpusField' not found!");
    }else{
        f.value = null;
        f.addEventListener("change", function(){
            showSearch();
        });
    }
}

function getCookie(name){
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;

}

function writeCasetoDjango(selectedCase){
    var csrf = getCookie('csrftoken');

    $(document).ready(function(){
        $.ajax({
            method: "POST",
            url:"save-case/",
            headers: {
                'X-CSRFToken': csrf
            },
            data:{"SelectedCase": JSON.stringify(selectedCase)},
            success: function (response){
                console.log("Callback received: ", response);
            },
            error: function (response) {
                alert("Failed to save to Django! See console...");
                console.log("Callback received: ", response);
            }
        });
    });
}