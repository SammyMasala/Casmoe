"use strict";

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

function postCaseLinestoDB(caseLines){    

    return new Promise((resolve) => {
        var csrf = getCookie('csrftoken');
        if(!csrf){
            console.log("Exception trace: getCookie()");
            return false;
        }

        $(document).ready(function(){
            $.ajax({
                type: "POST",
                url:"/Search/save/",
                headers: {
                    'X-CSRFToken': csrf,
                },
                data:{"case_data": JSON.stringify(caseLines)},
                success: function (response){
                    console.log("Callback received: ", response.message);
                    resolve(true);                    
                },

                error: function (response) {
                    alert("Failed to save to Django! See console...");
                    console.log("Callback received: ", response.message);
                    resolve(false);
                }
            });
        });
        resolve(false);
    });         
}


// Legacy
function postCasetoDB(selectedCase){    
    return new Promise((resolve) => {
        var csrf = getCookie('csrftoken');
        if(!csrf){
            console.log("Exception trace: getCookie()");
            return false;
        }

        $(document).ready(function(){
            $.ajax({
                type: "POST",
                url:"/Search/Save-Case/",
                headers: {
                    'X-CSRFToken': csrf,
                },

                data:{"SelectedCase": JSON.stringify(selectedCase)},
                success: function (response){
                    console.log("Callback received: ", response.message);
                    resolve(true);                    
                },

                error: function (response) {
                    alert("Failed to save to Django! See console...");
                    console.log("Callback received: ", response.message);
                    resolve(false);
                }
            });
        });

        resolve(false);
    });         
}

function postLineChangetoDB(formData){    
    return new Promise((resolve) => {
        var csrf = getCookie('csrftoken');
        if(!csrf){
            console.log("Exception trace: getCookie()");
            return false;
        }

        $(document).ready(function(){
            $.ajax({
                type: "post",
                url:"/Case-View/Submit-Changes/",
                headers: {
                    'X-CSRFToken': csrf,
                },
                data: formData,
                processData: false,
                contentType: false,
                success: function (response){
                    console.log("Callback received: ", response.message);
                    resolve(true);                    
                },

                error: function (response) {
                    alert("Failed to save to Django! See console...");
                    console.log("Callback received: ", response.message);
                    resolve(false);
                }
            });
        });

        resolve(false);
    });         
}

function getCaseListFromDB(){
    return new Promise((resolve) => {
        var csrf = getCookie('csrftoken');

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                url:"/Search/list/",
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

function getCaseFromDB(case_id){
    return new Promise((resolve) => {
        var csrf = getCookie('csrftoken');

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                url:`/Search/case/${case_id}`,
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

// LEGACY
function legacyGetCaseFromDB(){
    return new Promise((resolve) => {
        var csrf = getCookie('csrftoken');

        $(document).ready(function(){
            $.ajax({
                type: "GET",
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

function getChangesFromDB(){
    return new Promise((resolve) => {
        var csrf = getCookie('csrftoken');

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                url:"/Review/Get-Changes/",
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

function handleLogin(){
    return goToEditorHome();
}