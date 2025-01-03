function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${read ? "read" : "not read yet"}.`
    }
}

function addBookToLibrary(book) {
    return null
}