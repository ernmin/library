const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay-bg');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = button.closest('.window');
        closeModal(modal);
    })
})

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('bg-active');
    overlay.classList.add('bg-active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('bg-active');
    overlay.classList.remove('bg-active');
}

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

/*geeksforgeeks.org/how-to-create-an-html-table-from-an-object-array-using-javascript/ */
