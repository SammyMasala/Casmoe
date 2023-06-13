"use strict"
function loadLine(){
    setMode();
    getCaseFromDatabase().then((caseData) => {
        lineFillFields(caseData);    
    });
}

function lineFillFields(caseData){
    if(!caseData){
        console.log("Error loading 'Case' data!");
        return;
    }

    var mainCol = document.getElementById("colmain");
    if(!mainCol){
        console.log("ERROR: failed to retrieve colmain element!");
        return;
    }

    for(var i in caseData){
        const lineBtn = document.createElement("button");
        lineBtn.className = "row mb-3 border border-light text-start";
        lineBtn.id = caseData[i].sentence_id;
        lineBtn.innerHTML = caseData[i].sentence_id+ ". " + caseData[i].text;
        lineBtn.addEventListener("click", function(e){
            var btnVal = document.getElementById("btnEdit").value;
            if(btnVal == "false"){
                fillPopout(caseData, e.target.id);
                openPopout();
            }else if(btnVal == "true"){
                fillEdit(caseData, e.target.id);
            }            
        });        
        mainCol.appendChild(lineBtn);
    }
    
}

function fillPopout(caseData, index){
    var popoutBody = document.getElementById("popoutbody");
    if(!popoutBody){
        console.log("ERROR: no popoutbody found!");
        return;
    }

    var popoutFooter = document.getElementById("popoutfooter");
    if(!popoutFooter){
        console.log("ERROR: no popoutfooter found!");
        return;
    }

    var details = caseData[index];

    //clear previous data
    if(!clearChild(popoutBody)){
        return;
    }
    if(!clearChild(popoutFooter)){
        return;
    }

    //load new data
    var newField = createDiv("row bg-transparent text-start", "");
    var text = "";
    if (i == getHeaderIndex("judge")){ // Judge                
        text = "Judge: " + details[5].toUpperCase();
    }else if(i == getHeaderIndex("text")){ // Sentence
        newField.style.fontStyle = "italic";
        text = details[getHeaderIndex("text")];
    }else if(i == getHeaderIndex("role")){ // Role                 
        text = "Role: " + details[i].toUpperCase();
    }else if(i == getHeaderIndex("align")){ // Summary alignment
        text = "Aligns with sentence " + details[i] + " of summary.";
    }   

    if(text){
        newField.appendChild(document.createTextNode(text));
        popoutBody.appendChild(newField);
    }

    //Close popout    
    var btn = document.createElement("button");
    btn.className = "btn btn-primary"
    btn.innerHTML = "Close";
    btn.addEventListener("click", function(){
        closePopout();
    });
    popoutFooter.appendChild(btn);
}

function fillEdit(data, index){
    var edit = document.getElementById("edittext");
    if(!edit){
        console.log("ERROR: no EditText found!");
    }
    
    var details = data[index];

    //clear previous data
    if (!clearChild(edit)){
        return;
    }

    //Line Nav
    var row = createDiv("row", "");
    var col = createDiv("col", "");

    var btn = document.createElement("button");
    btn.innerHTML = "< Prev";
    btn.value = index;
    if(index > 0){
        btn.className = "btn btn-light";
    }else{
        btn.className = "btn btn-light disabled";
    }
    btn.addEventListener("click", function(e){
        return FillEdit("edittext", data, parseInt(e.target.value) - 1);
    });
    col.appendChild(btn);
    row.appendChild(col);

    var col = createDiv("col", "");
    var btn = document.createElement("button");
    btn.innerHTML = "Next >";
    btn.value = index;

    if(index < data.length){
        btn.className = "btn btn-light";
    }else{
        btn.className = "btn btn-light disabled";
    }    
    
    btn.addEventListener("click", function(e){
        return FillEdit(data, parseInt(e.target.value) + 1);
    });
    col.appendChild(btn);
    row.appendChild(col);
    edit.appendChild(row);

    //Text
    var row = createDiv("bg-secondary bg-opacity-10 border", "");
    row.style.fontStyle = "italic";
    row.append(document.createTextNode(details[getHeaderIndex("text")]));
    edit.appendChild(row);

    //Data fields
    for(var i=0;i<details.length;i++){    

        row = createDiv("row bg-transparent text-start", "");

        var colText = createDiv("col-4", "");
        var colInput = createDiv("col", "");

        var text = "";

        var input = document.createElement("input");
        input.type = "text";
        input.id = "Input" + i;        
        
        if (i == getHeaderIndex("judge")){ // Judge                
            text = "Judge: ";
        }else if(i == getHeaderIndex("role")){ // Role                 
            text = "Role: ";
        }else if(i == getHeaderIndex("align")){ // Summary alignment
            text = "Summary Sentence:";
        }else if(i == getHeaderIndex("fullagr")){ // Summary alignment
            text = "Full Agr:";
        }  else if(i == getHeaderIndex("partagr")){ // Summary alignment
            text = "Part Agr:";
        }  else if(i == getHeaderIndex("fulldis")){ // Summary alignment
            text = "Full Dis:";
        }  else if(i == getHeaderIndex("partdis")){ // Summary alignment
            text = "Part Dis:";
        }    
        
        if(!text){
            continue;
        }else{
            input.value = details[i];

            colText.append(document.createTextNode(text));
            colInput.append(input);
            row.appendChild(colText);
            row.appendChild(colInput);
            edit.appendChild(row);
        }
    }

    //Submit
    var btn = document.getElementById("btnsubmit");
    var btnNew = btn.cloneNode(true);
    btn.parentNode.replaceChild(btnNew, btn);

    btnNew.addEventListener("click", function(){
        var file = getChanges();
        if(!file){
            file = [];
        }

        for(var i in file){
            if(file.length == 0){
                break;
            }
            if(file[i][getHeaderIndex("case_id")] == details[getHeaderIndex("case_id")]
             && file[i][getHeaderIndex("sentence_id")] == details[getHeaderIndex("sentence_id")]){
                file.splice(i, 1);
                i--;
            }            
        }

        for (var i in details){
            var elem = document.getElementById("Input" + i);
            if(elem && elem.value){
                details[i] = elem.value.trim();
            }
        }
        file.push(details);  
        console.log(file);       
        document.getElementById("btnexport").innerHTML = "Export as .csv (Changes:" + file.length + ")";
        saveChanges(file);
    });

    //Export
    var btn = document.getElementById("btnexport");
    var btnNew = btn.cloneNode(true);
    btn.parentNode.replaceChild(btnNew, btn);

    btnNew.addEventListener("click", function(){
        var file = createFile(createChanges(getChanges()));

        btnNew.setAttribute('href', window.URL.createObjectURL(file));
        btnNew.setAttribute('download', ("EDIT " + (new Date().toUTCString()) + ".csv"));

        document.getElementById("btnexport").innerHTML = "Exported!";

        return;
    });
    
    //Scroll To
    scrolltoText(details[getHeaderIndex("sentence_id")]);
}

function scrolltoText(id){
    return document.getElementById(id).scrollIntoView();
}


function setMode(){    
    var edit = document.getElementById("edit");
    if(!edit){
        console.log("Error: edit not found!");
        return;
    }
    var main = document.getElementById("main");
    if(!main){
        console.log("Error: main not found!");
        return;
    }
    var sidebar = document.getElementById("sidebar");
    if(!sidebar){
        console.log("Error: sidebar not found!");
        return;
    }

    var toggle = document.getElementById("editbtn");
    if(!toggle){
        console.log("Error: editbtn not found!");
        return;
    }

    toggle.addEventListener("click", function(){
        changeMode(edit, main, sidebar, toggle);
    });
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
                url:"get-case/",
                headers: {
                    'X-CSRFToken': csrf
                },
                success: function (response){
                    alert("yay");
                    resolve(response);
                },
                error: function () {
                    alert("mission failed");
                    return;
                }
            });
        });
    });    
}


function changeMode(edit, main, sidebar, toggle){
    if(toggle.value == "true"){
        toggle.className = "btn btn-primary text-white bg-primary";
        toggle.innerHTML = "Edit: OFF";            
        edit.style.opacity = "0%";
        edit.className = "col-2 bg-light";
        main.className = "col-8 bg-light";
        sidebar.className = "col-2 bg-light";
        sidebar.style.opacity = "100%";
        sidebar.style.pointerEvents ="auto";
        edit.style.pointerEvents = "none";
        
        toggle.value = "false";
    }else if(toggle.value == "false"){
        toggle.className = "btn btn-primary text-white bg-danger";
        toggle.innerHTML = "Edit: ON";
        edit.style.opacity = "100%";
        edit.className = "col-5 bg-light";
        main.className = "col-6 bg-light";
        sidebar.className = "col-1 bg-light";
        sidebar.style.opacity = "10%";
        sidebar.style.pointerEvents ="none";
        edit.style.pointerEvents = "auto";

        toggle.value = "true";
    }   
}

function openPopout(){
    if(document.getElementById("editbtn").value == "true"){
        return;
    }

    var body = document.getElementById("pagecontainer");
    body.style.opacity = "50%";
    body.style.pointerEvents = "none";

    var toggle = document.getElementById("editbtn");
    toggle.style.opacity = "20%";
    toggle.style.pointerEvents = "none";

    var popout = document.getElementById("popout");
    popout.style.width="40vw";
    popout.style.opacity="100%";
    popout.style.pointerEvents = "auto";
}

function closePopout(){
    var body = document.getElementById("pagecontainer");
    body.style.opacity = "100%";
    body.style.pointerEvents = "auto";

    var toggle = document.getElementById("editbtn");
    toggle.style.opacity = "100%";
    toggle.style.pointerEvents = "auto";

    var popout = document.getElementById("popout");
    popout.style.width="0";
    popout.style.opacity="0%";
    popout.style.pointerEvents = "none";
}