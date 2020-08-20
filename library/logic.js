
//global variables
let myLibrary = [],
    submitBtn,
    name=document.getElementById("name"),
    author=document.getElementById("author"),
    pages=document.getElementById("pages"),
    myBooks=document.getElementById("myBooks"),
    myObject,
    newBook,
    dispName,
    dispAuthor,
    dispPages,
    dispCheck,
    removeBtn=document.getElementsByClassName("removeBtn"),
    modifyBtn=document.getElementsByClassName("modifyBtn"),
    h2,
    checkbox=document.getElementById("checked");

//functions
function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    while (myBooks.firstChild) {
        myBooks.removeChild(myBooks.lastChild);
    }
    render();  
}   

function render(){
    for (i=0; i<=myLibrary.length-1; i++){   
        newBook = document.createElement("div");
        dispName = document.createElement("h3"),
        dispAuthor = document.createElement("p");
        dispPages = document.createElement("p");
        dispCheck = document.createElement("p");
        removeBtn = document.createElement("button");
        modifyBtn = document.createElement("button");   

        newBook.classList.add("newBook");

        removeBtn.classList.add("removeBtn");
        removeBtn.setAttribute("id", i);
        removeBtn.setAttribute("onclick", "removeBook(id)");

        modifyBtn.classList.add("modifyBtn");
        modifyBtn.setAttribute("id", i);
        modifyBtn.setAttribute("onclick", "modifyBook(id)");

        removeBtn.textContent="Remove";
        modifyBtn.textContent="Modify";

        dispName.textContent=myLibrary[i].name;
        dispAuthor.textContent="Written by: "+myLibrary[i].author;
        dispPages.textContent="Pages: "+myLibrary[i].pages;
        if (myLibrary[i].status === true){
            dispCheck.innerHTML="Read? "+'<i class="fas fa-check"></i>';
        }
        else {
            dispCheck.innerHTML="Read? "+'<i class="fas fa-times"></i>';
        }
        
        newBook.appendChild(dispName);
        newBook.appendChild(dispAuthor); 
        newBook.appendChild(dispPages);
        newBook.appendChild(dispCheck);
        newBook.appendChild(removeBtn);
        newBook.appendChild(modifyBtn);
        myBooks.appendChild(newBook);         
    }  
}

function removeBook(idBtn){
    myLibrary.splice(idBtn, 1);
    addBookToLibrary();
}

function modifyBook(idBtn){
    overlay.classList.add("active");
    popup.classList.add("active");    
    h2=document.getElementById("modify").innerHTML="Modify Book!";

    submitBtn = document.getElementById("submitBtn").setAttribute("value","Modify!");
    submitBtn = document.getElementById("submitBtn").setAttribute("onclick","addModifiedBook("+idBtn+")");
}

function addBook(){
    myObject = new Book(name.value, author.value, pages.value, checkbox.checked);
    myLibrary.push(myObject);
    addBookToLibrary();
}

function addModifiedBook(idBtn){
    myLibrary[idBtn]=new Book(name.value, author.value, pages.value, checkbox.checked);
    submitBtn = document.getElementById("submitBtn").setAttribute("onclick","addBook()");
    addBookToLibrary();
}
       
    


