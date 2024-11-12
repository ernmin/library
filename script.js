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

function addBookToLibraryForm(){
    document.querySelector('#newbookform').addEventListener("submit", function(event){
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        console.log(formObject);
        let newbook = null;
        if(formObject.read == 'true'){
            newbook = new Book(formObject.title, formObject.author, formObject.pages + ' pages', formObject.read);
            console.log(newbook);
        }
        else{
            newbook = new Book(formObject.title, formObject.author, formObject.pages + ' pages', 'false');
            console.log(newbook);
        }
        addBookToLibrary(newbook);
        document.querySelector('#newbookform').reset();
        let popup = document.querySelector('#pop-up');
        popup.classList.remove('bg-active');
        let overlaybg = document.querySelector('#overlay-bg');
        overlaybg.classList.remove('bg-active');
        createCard(myLibrary[myLibrary.length - 1], myLibrary.length - 1);
        
    })
}


const theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', '100 pages', 'true');
const chess = new Book('How to Win at Chess', 'Levy Rozman', '300 pages', 'true');
const murray = new Book('Tuesdays with Murray', 'D. L. Moody', '200 pages', 'false');
console.log(theHobbit.info());
addBookToLibrary(theHobbit);
addBookToLibrary(chess);
addBookToLibrary(murray);
displayCard();

addBookToLibraryForm();


function displayCard() {
    for(let i = 0; i < myLibrary.length; i++){
    console.log(myLibrary[i]);
    createCard(myLibrary[i], i);
    }
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
    deleteBookButton(book_id);
    addCheckbox(bookObject, book_id);
    deleteBook(book_id);
    updateCheckbox(bookObject, book_id);
}

function addCheckbox(bookObject, book_id){
    const card = document.querySelector(`[id=${CSS.escape(book_id)}]`);
    const card_read = card.querySelector('.card-read');
    const conquered_container = document.createElement('div');
    const create_text_read = document.createElement('div');
    conquered_container.appendChild(document.createTextNode('Conquered'));
    card_read.appendChild(create_text_read);
    const create_check_box = document.createElement("INPUT");
    create_check_box.setAttribute("type", "checkbox");
    conquered_container.appendChild(create_check_box);
    card_read.appendChild(conquered_container);
    conquered_container.classList.add('conquered-container');
    create_check_box.id = book_id + '-conquered';
    if (bookObject.read == 'true') {
        document.querySelector("[id=" +CSS.escape(book_id) + "-conquered" + "]").checked = true;
    }
}

function updateCheckbox(bookObject, book_id){
    let checkbox = document.querySelector("[id=" +CSS.escape(book_id) + "-conquered" + "]");
    checkbox.addEventListener('change', function(){
        if (this.checked){
            bookObject.read = 'true';
            /*console.log(bookObject.title, bookObject.read, bookObject);*/
        }
        else {
            bookObject.read = 'false';
            /*console.log(bookObject.title, bookObject.read, bookObject);*/
        }
    })
    /*console.log(bookObject.title, bookObject.read);*/
}

function deleteBookButton(book_id){
    const card = document.querySelector(`[id=${CSS.escape(book_id)}]`);
    const card_read = card.querySelector('.card-read');
    const create_button = document.createElement('button');
    create_button.classList.add('banish');
    create_button.textContent = 'Banish';
    card_read.appendChild(create_button);
}

function deleteBook(book_id){
    let deleteBook = document.querySelectorAll('.banish');
    deleteBook[book_id].id = book_id + '-book';
    let deleteButton = document.querySelector("[id=" +CSS.escape(book_id) + "-book" + "]")
    deleteButton.addEventListener('click', function(){
        /*let books = document.querySelector('.books');
        let bookToDelete = document.querySelector(`[id=${CSS.escape(book_id)}]`)
        books.removeChild(bookToDelete);*/
        deleteAllBooksDisplay();
        if(book_id == 0){
            myLibrary.shift();
        }
        else{
            myLibrary.splice(book_id, book_id);
        }
        displayCard();
    })
}

function deleteAllBooksDisplay(){
    let books = document.querySelector('.books');
    let allbooks = document.querySelectorAll('.book-card');
    for(let i = 0; i < myLibrary.length; i++){
        books.removeChild(allbooks[i]);
    }
}


/*create event listener to listen to submit button
store form data into the array of objects*/

/*https://www.w3schools.com/jsref/dom_obj_checkbox.asp
https://bito.ai/resources/javascript-set-checkbox-checked-javascript-explained/
Use book ID to change if read or not read
*/

/*Form data to javascript object*/