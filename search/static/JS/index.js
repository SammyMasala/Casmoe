"use strict"
this.addEventListener("load", start);

function start(){
    var f = document.getElementById("CorpusField");
    if (!f){
        console.log("Error: Element 'CorpusField' not found!");
    }else{
        f.addEventListener("input", function(){
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
            success: function (data){
                alert("yay");
                /*window.location.href = "case.html"*/

            },
            error: function (data) {
                alert("mission failed");
            }
        });
    });
}

////Deprecated due to Django views
// function changePage(dir){
//     // window.location.href = dir;
// }
