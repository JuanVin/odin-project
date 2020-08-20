const addBtn=document.getElementById("addBtn"),
        closeBtn=document.getElementById("closeBtn"),
        overlay=document.getElementById("overlay"),
        popup=document.getElementById("popup"),
        submit=document.getElementById("submitBtn");

    addBtn.addEventListener("click", function(){
        overlay.classList.add("active");
        popup.classList.add("active");
        h2=document.getElementById("modify").innerHTML="Add a new Book!";
        submit.setAttribute("value","Add!");
    });  

    closeBtn.addEventListener("click", function(){
        overlay.classList.remove("active");
        popup.classList.remove("active");
    });      

    submit.addEventListener("click", function(){
        overlay.classList.remove("active");
        popup.classList.remove("active");
    });   