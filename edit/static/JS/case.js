"use strict"
this.addEventListener("load", function(){
    start();
});

function start(){
    var btnHome = document.getElementById("btntohome");
    if(!btnHome){
        console.log("ERROR: btntohome not found!");
        return;
    }
    btnHome.addEventListener("click", backToHome);

    var btnLine = document.getElementById("btntoline");
    if(!btnLine){
        console.log("ERROR: btntoline not found!");
        return;

    }
    btnLine.addEventListener("click", function(){
        loadLine();
    });

    // var btnASMO = document.getElementById(_asmobtn);
    // if(!btnASMO){
    //     console.log("ERROR: btntoasmo not found!");
    //     return;
    // }
    // btnASMO.addEventListener("click", function(){
    //     loadContent("asmo");
    // });

    loadLine();
}

function clearContent(){
    var cont = document.getElementById("mainbody");
    if(!cont){
        console.log("ERROR: mainbody not found!");
        return;
    }
    
    var child = cont.lastElementChild;
    while(child){
        cont.removeChild(child);
        child = cont.lastElementChild;
    }
}

function createDiv(_className, _id){
    var div = document.createElement("div");
    div.className = _className;
    div.id = _id;
    
    return div;
}

function clearChild(cont){
    var child = cont.lastElementChild;
    while(child){
        cont.removeChild(child);
        child = cont.lastElementChild;
    }

    return true;
}

function backToHome(){
    window.location.href = "index.html";
}