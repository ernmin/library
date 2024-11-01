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

function addBookToLibrary(book){
    let newBook = {
        title: book.title,
        author: book.author,
        pages: book.pages,
        read: book.read
    }
    myLibrary.push(newBook);
}

const theHobbit = new Book('Hobbit', 'Tolkien', '100', 'yes');
console.log(theHobbit.info());
addBookToLibrary(theHobbit);


for(let i = 0; i < myLibrary.length; i++){
    console.log(myLibrary[i]);
}

}
)