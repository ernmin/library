document.addEventListener('DOMContentLoaded', function() {
const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let book_info = this.title + ' by ' + this.author + ', ' + this.pages + ', ' + this.read;
        return book_info;
    }
}

function addBookToLibrary(newTitle, newAuthor, newPages, newRead){
    let newBook = {
        title: newTitle,
        author: newAuthor,
        pages: newPages,
        read: newRead
    }
    myLibrary.push(newBook);
}

}
)