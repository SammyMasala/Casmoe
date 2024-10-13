"use strict";

function goToHome(){
    window.location.href = "/Home/";
}

function goToEditorHome(){
    window.location.href = "/Home/Editor/";
}

function goToEditorSearch(){
    window.location.href = "/Search/Editor/";
}


function goToEditorCaseView(){
    window.location.href = "/Case-View/Editor/";
}

function goToSearch(){
    window.location.href='/Search/';
}

function goToReview(){
    window.location.href='/Review/';
}

function goToGraph(case_id){
    window.location.href=`/Case-View/Graph/${case_id}`;
}

function goToLine(case_id){
    window.location.href=`/Case-View/Line/${case_id}`;
}

function goToSummary(case_id){
    window.location.href=`/Case-View/Summary/${case_id}`;
}