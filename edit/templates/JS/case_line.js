"use strict"
var debug = 1;

function loadLine(){
    if(debug){
        console.log("DEBUG: Init loadLine()");
    }    
    
    lineDrawMain("mainbody");
    lineDrawEdit("editbody");
    setMode("edit", "main", "sidebar", "editbtn");
    lineFillFields(JSON.parse(localStorage.getItem("Case")), "colmain", "editbtn", "editbody", "popout", "popoutbody", "popoutfooter", "pagecontainer");
}

function lineDrawMain(_mainBody){
    var cont = document.getElementById(_mainBody);
    if(!cont){
        console.log("Error: mainbody not found");
        return;
    }

    var row = createDiv("row", "");
    var col = createDiv("col border", "colmain");

    row.appendChild(col);
    cont.appendChild(row); 
}

function lineDrawEdit(_editBody){
    var cont = document.getElementById(_editBody);   
    if(!cont){
        console.log("Error: editbody not found");
        return;
    }
    
    var row = createDiv("row", "edithotbar");
    cont.appendChild(row);
    
    row = createDiv("row", "edittext");
    cont.appendChild(row);
}

function lineFillFields(data, _colMain, _btnEdit, _edit, _popout, _popoutbody, _popoutfooter, _pagecontainer){
    if(!data){
        console.log("Error loading 'Case' data!");
        return;
    }

    var c = document.getElementById(_colMain);
    if(!c){
        console.log("ERROR: failed to retrieve ColMain element!");
        return;
    }

    for(var i in data){
        const s = document.createElement("button");
        s.className = "row mb-3 border border-light text-start";
        s.id = data[i][getHeaderIndex("sentence_id")];
        s.innerHTML = data[i][getHeaderIndex("sentence_id")] + ". " + data[i][getHeaderIndex("text")];
        s.addEventListener("click", function(e){
            var val = document.getElementById(_btnEdit).value;
            if(val == "false"){
                fillPopout(_popoutbody, _popoutfooter,_btnEdit, _pagecontainer, _popout, data, e.target.id);
                openPopout(_btnEdit, _pagecontainer, _popout);
            }else if(val == "true"){
                fillEdit(_edit, data, e.target.id);
            }            
        });        
        c.appendChild(s);

    }
    
}

function fillPopout(_popoutbody, _popoutfooter, _btnEdit, _pagecontainer, _popout, data, index){
    var popoutbody = document.getElementById(_popoutbody);
    if(!popoutbody){
        console.log("ERROR: no popoutbody found!");
        return;
    }

    var popoutfooter = document.getElementById(_popoutfooter);
    if(!popoutfooter){
        console.log("ERROR: no popoutfooter found!");
        return;
    }

    var details = data[index];

    //clear previous data
    if(!clearChild(popoutbody)){
        return;
    }
    if(!clearChild(popoutfooter)){
        return;
    }

    //load new data
    for(var i=0;i<details.length;i++){
        var e = createDiv("row bg-transparent text-start", "");
        var text = "";
        if (i == getHeaderIndex("judge")){ // Judge                
            text = "Judge: " + details[5].toUpperCase();
        }else if(i == getHeaderIndex("text")){ // Sentence
            e.style.fontStyle = "italic";
            text = details[getHeaderIndex("text")];
        }else if(i == getHeaderIndex("role")){ // Role                 
            text = "Role: " + details[i].toUpperCase();
        }else if(i == getHeaderIndex("align")){ // Summary alignment
            text = "Aligns with sentence " + details[i] + " of summary.";
        }   

        if(text){
            e.appendChild(document.createTextNode(text));
            popoutbody.appendChild(e);
        }
    }

    //Close popout    
    var btn = document.createElement("button");
    btn.className = "btn btn-primary"
    btn.innerHTML = "Close";
    btn.addEventListener("click", function(){
        closePopout(_btnEdit, _pagecontainer, _popout);
    });
    popoutfooter.appendChild(btn);
}

function fillEdit(_edit, data, index){
    var edit = document.getElementById(_edit);
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
        return FillEdit("edittext", data, parseInt(e.target.value) + 1);
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


function setMode(_edit, _main, _sidebar, _toggle){    
    var edit = document.getElementById(_edit);
    if(!edit){
        console.log("Error: edit not found!");
        return;
    }
    var main = document.getElementById(_main);
    if(!main){
        console.log("Error: main not found!");
        return;
    }
    var sidebar = document.getElementById(_sidebar);
    if(!sidebar){
        console.log("Error: sidebar not found!");
        return;
    }

    var toggle = document.getElementById(_toggle);
    if(!toggle){
        console.log("Error: toggle not found!");
        return;
    }

    toggle.addEventListener("click", function(){
        changeMode(_edit, _main, _sidebar, _toggle);
    });
}

function changeMode(_edit, _main, _sidebar, _toggle){
    var toggle = document.getElementById(_toggle);
    if (!toggle){
        console.log("Element editbtn not found!");
        return;
    }

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

function openPopout(_editbtn, _pagecontainer, _popout){
    if(document.getElementById(_editbtn).value == "true"){
        return;
    }

    var body = document.getElementById(_pagecontainer);
    body.style.opacity = "50%";
    body.style.pointerEvents = "none";

    var toggle = document.getElementById(_editbtn);
    toggle.style.opacity = "20%";
    toggle.style.pointerEvents = "none";

    var popout = document.getElementById(_popout);
    popout.style.width="40vw";
    popout.style.opacity="100%";
    popout.style.pointerEvents = "auto";
}

function closePopout(_editbtn, _pagecontainer, _popout){
    var body = document.getElementById(_pagecontainer);
    body.style.opacity = "100%";
    body.style.pointerEvents = "auto";

    var toggle = document.getElementById(_editbtn);
    toggle.style.opacity = "100%";
    toggle.style.pointerEvents = "auto";

    var popout = document.getElementById(_popout);
    popout.style.width="0";
    popout.style.opacity="0%";
    popout.style.pointerEvents = "none";
}