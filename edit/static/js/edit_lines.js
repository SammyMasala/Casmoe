"use strict";

//// THIS IS BAD IMPLEMENTATION (COPYPASTA-ING DIRECT). NEEDS TO CHANGE  
function fillAnnotations(annotBodyId, caseData, index){
    var annotBody = document.getElementById(annotBodyId);
    if(!annotBody){
        console.log("Exception trace: Element annotBody not found!");
        return false;
    }

    var lineAnnot = caseData[index];

    //clear previous data
    if(!clearChild(annotBodyId)){
        console.log("Exception trace: clearChild()");
        return false;
    }

    //load new data
    for(let details in lineAnnot){
        if(details == "id"){
            continue;
        }
        var newEntry = document.createElement("div");
        newEntry.className = "p-1";

        var newEntryInput = document.createElement("input");
        if(details == "text"){
            newEntryInput.type = "hidden";
        }else{
            newEntryInput.type = "text";
        }
        newEntry.className = "form-control";
        newEntryInput.name = details;
        newEntryInput.value = lineAnnot[details];
        newEntry.appendChild(newEntryInput);

        var newEntryLabel = document.createElement("div");
        newEntryLabel.className = "form-text";
        newEntryLabel.innerHTML = details;
        newEntry.appendChild(newEntryLabel); 

        annotBody.appendChild(newEntry);       
    }

    //CSRF token
    var csrfToken = document.createElement("input");
    csrfToken.name = "csrfmiddlewaretoken";
    csrfToken.type = "hidden";
    csrfToken.value = getCookie('csrftoken');
    annotBody.appendChild(csrfToken);    

    //Submit button
    var submitBtn = document.createElement("input");
    submitBtn.type = "submit";
    submitBtn.className = "btn btn-danger";
    submitBtn.value = "Submit";

    annotBody.appendChild(submitBtn);

    return true;
}

function submitChanges(form){   
    if(!form){
        console.log('Exception trace: Invalid form received!');
        return false;
    }

    var formData = new FormData(form);
    if(!postLineChangetoDB(formData)){
        console.log("Exception trace: postLineChangetoDB()");
        return false;
    }

    return true;
}