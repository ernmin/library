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

const theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', '100 pages', 'true');
const chess = new Book('How to Win at Chess', 'Levy Rozman', '300 pages', 'true');
console.log(theHobbit.info());
addBookToLibrary(theHobbit);
addBookToLibrary(chess);

for(let i = 0; i < myLibrary.length; i++){
    console.log(myLibrary[i]);
    createCard(myLibrary[i], i);
}

function createCard(bookObject, book_id) {
    const card = document.createElement('div');
    card.classList.add('book-card');
    const div1 = document.createElement('div');
    div1.appendChild(document.createTextNode(bookObject.title));
    card.appendChild(div1);
    let items = [];
    const div2 = document.createElement('div');
    card.appendChild(div2);

    for (const property in bookObject) {
        items.push(bookObject[property]);   
    }
    for (let i = 1; i < items.length; i++){
        let div = document.createElement('div');
        if (i != 3){
            div.appendChild(document.createTextNode(items[i]));
        }
        div2.appendChild(div);
        if (i == 1){
            div.classList.add('card-author');
        }
        else if (i == 2){
            div.classList.add('card-pages');
        }
        else if (i == 3){
            div.classList.add('card-read');
        }
    }
    div1.classList.add('card-title');
    card.id = book_id;
    div2.classList.add('card-others');
    
    document.getElementById('books').appendChild(card);
    addCheckbox(book_id);
}

function addCheckbox(book_id){
    const card = document.querySelector(`[id=${CSS.escape(book_id)}]`);
    const card_read = card.querySelector('.card-read');
    const create_text_read = document.createElement('div');
    /*create_text_read.classList.add('create-text-read');*/
    create_text_read.appendChild(document.createTextNode('Conquered'));
    card_read.appendChild(create_text_read);
    const create_check_box = document.createElement("INPUT");
    create_check_box.setAttribute("type", "checkbox");
    card_read.appendChild(create_check_box);
}

/*create event listener to listen to submit button
store form data into the array of objects*/

/*https://www.w3schools.com/jsref/dom_obj_checkbox.asp
https://bito.ai/resources/javascript-set-checkbox-checked-javascript-explained/
Use book ID to change if read or not read
*/
