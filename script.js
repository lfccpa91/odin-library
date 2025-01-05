const myLibrary = [];
const bookForm = document.querySelector("form#newbook");
const submitButton = document.querySelector("#submitButton");
const bookshelf = document.querySelector("#bookshelf");
let updateVal = false;
let updateIndex = "";

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read, update=updateVal, index=updateIndex) {
    if(!update) {
        myLibrary.push(new Book(title, author, pages, read));
    } else {
        myLibrary[updateIndex].title = title;
        myLibrary[updateIndex].author = author;
        myLibrary[updateIndex].pages = pages;
        myLibrary[updateIndex].read = read;
        updateVal=false;
        updateIndex = "";
        
    }
    displayBooks();
}

function displayBooks() {
    bookshelf.innerHTML="";
    
    myLibrary.forEach((book, index) => {
        let bookToAdd = document.createElement("div");
        bookToAdd.classList.add("book");
        let titleLabel = document.createElement("div");
        titleLabel.textContent = "Title:";
        let title = document.createElement("div");
        title.textContent = book.title;
        let authorLabel = document.createElement("div");
        authorLabel.textContent="Author:";
        let author = document.createElement("div");
        author.textContent = book.author;
        let pagesLabel = document.createElement("div");
        pagesLabel.textContent = "Pages:";
        let pages = document.createElement("div");
        pages.textContent = book.pages;
        let readLabel = document.createElement("div");
        readLabel.textContent = "Status:"
        let updateStatusButton = document.createElement("button");
        updateStatusButton.classList.add("changeStatus")
        if (book.read) {
            updateStatusButton.textContent = "Read!";
        } else {
            updateStatusButton.textContent = "Not yet :/"
        }
        let deleteButton = document.createElement('button');
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent="Delete";
        let editButton = document.createElement('button');
        editButton.textContent="Edit Book Info";
        bookToAdd.appendChild(titleLabel);
        bookToAdd.appendChild(title);
        bookToAdd.appendChild(authorLabel);
        bookToAdd.appendChild(author);
        bookToAdd.appendChild(pagesLabel);
        bookToAdd.appendChild(pages);
        bookToAdd.appendChild(readLabel);
        bookToAdd.appendChild(updateStatusButton);
        bookToAdd.appendChild(deleteButton);
        bookToAdd.appendChild(editButton);
        bookshelf.appendChild(bookToAdd);

        deleteButton.addEventListener("click",() => {
            myLibrary.splice(book.index,1);
            displayBooks();
        });
        updateStatusButton.addEventListener("click", () => {
            book.read = !book.read;
            if (book.read) {
                updateStatusButton.textContent = "Read!";
            } else {
                updateStatusButton.textContent = "Not yet :/";
            }
        });

        editButton.addEventListener("click", () => {
            document.querySelector("#title").value = book.title;
            document.querySelector("#author").value = book.author;
            document.querySelector("#pages").value = book.pages;
            document.querySelector("#read").checked = book.read;  
            updateVal=true;
            updateIndex= index;
            submitButton.textContent = "Update";

        });
    });
}

submitButton.addEventListener("click", () => {
    event.preventDefault();
    if (!bookForm.checkValidity()) {
        bookForm.reportValidity();
        return;
    }
    let newTitle = document.querySelector("#title").value;
    let newAuthor = document.querySelector("#author").value;
    let newPages = document.querySelector("#pages").value;
    let newRead = document.querySelector("#read").checked;
    addBookToLibrary(newTitle, newAuthor, newPages, newRead);
    bookForm.reset();
    submitButton.textContent= "Add Book";
});



