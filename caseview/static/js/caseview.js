"use strict"

this.addEventListener("load", function(){
    if(!loadLineView()){
        console.log("Exception trace: loadCaseView()");
        return;
    };
});

function clearChild(elemId){
    var elem = document.getElementById(elemId)
    if(!elem){
        console.log("Exception trace: Element elem not found!");
        return false;
    }
    var child = elem.lastElementChild;
    while(child){
        elem.removeChild(child);
        child = elem.lastElementChild;
    }

    return true;
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

function getCaseFromDatabase(){
    return new Promise((resolve) => {
        var csrf = getCookie('csrftoken');

        $(document).ready(function(){
            $.ajax({
                method: "GET",
                url:"/Case-View/Get-Case/",
                headers: {
                    'X-CSRFToken': csrf
                },
                success: function (response){
                    // console.log("Retrieved case data!");
                    resolve(response);
                },
                error: function () {
                    alert("Failed to read file from database! See error log...");
                    return;
                }
            });
        });
    });    
}
