let myLibrary = [];

function Book(author, title, pages, read) {
    this.id = myLibrary.length;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

if(localStorage.getItem('myLibrary')) {
    const storedMyLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    storedMyLibrary.forEach((book) => {
        const {author, title, pages, read} = book;
        const newBook = new Book(author, title, pages, read);
        myLibrary.push(newBook);
    });
}

function addBookToLibrary() {
    const author = document.querySelector('#author-input').value;
    const title = document.querySelector('#title-input').value;
    const pages = document.querySelector('#pages-input').value;
    const read = document.querySelector('#read-cb').checked;

    const valid = validate(author, title, pages, read);

    if(valid) {
        const newBook = new Book(author, title, pages, read);
        myLibrary.push(newBook);
        const main = document.querySelector('main');
        const formContainer = document.querySelector('#form-container');
        main.removeChild(formContainer);
        const newBookCard = createBookCard(newBook);
        const bookList = document.querySelector('#book-list');
        bookList.appendChild(newBookCard);

        const jsonMyLibrary = JSON.stringify(myLibrary);
        localStorage.setItem('myLibrary', jsonMyLibrary);
    } else{
        const alertMsg = document.querySelector('#alert-msg');
        alertMsg.textContent = 'Please fill all form\'s columns.';
    }
}

function validate(author, title, pages, read) {
    if(author.length == 0 || title.length == 0 || pages.length == 0 || isNaN(pages)) return false
    else return true;
}

function displayForm() {
    const formContainer = document.createElement('div');
    formContainer.id = 'form-container';
    
    const newBookForm = document.createElement('form');
    newBookForm.id='new-book-form';
    newBookForm.addEventListener('click', (e)=>{
        e.stopPropagation();
    });

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Add new book';
    formTitle.id = 'form-title';
    newBookForm.appendChild(formTitle);
    
    const authorInput = document.createElement('input');
    authorInput.id = 'author-input';
    authorInput.placeholder = 'Author';
    authorInput.type = 'text';
    authorInput.required = true;
    newBookForm.appendChild(authorInput);
    
    const titleInput = document.createElement('input');
    titleInput.id = 'title-input';
    titleInput.placeholder = 'Title';
    titleInput.type = 'text';
    titleInput.required = true;
    newBookForm.appendChild(titleInput);

    const pagesInput = document.createElement('input');
    pagesInput.id = 'pages-input';
    pagesInput.placeholder = 'Pages';
    pagesInput.type = 'number';
    pagesInput.required = true;
    newBookForm.appendChild(pagesInput);

    const readContainer = document.createElement('div');
    readContainer.id = 'read-container';

    const readCheckbox = document.createElement('input');
    readCheckbox.type = 'checkbox';
    readCheckbox.id='read-cb';
    const readSpan = document.createElement('span');
    readSpan.textContent = 'Have you read this? ';
    readSpan.id = 'read-span';

    readContainer.appendChild(readCheckbox);
    readContainer.appendChild(readSpan);
    newBookForm.appendChild(readContainer);

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Add';
    submitBtn.type = 'button';
    submitBtn.id = 'submit-btn';
    submitBtn.addEventListener('click', addBookToLibrary)
    newBookForm.appendChild(submitBtn);

    const alertMsg = document.createElement('p');
    alertMsg.id = 'alert-msg';
    newBookForm.appendChild(alertMsg);

    const main = document.querySelector('main');
    formContainer.appendChild(newBookForm);
    main.appendChild(formContainer);
    formContainer.addEventListener('click',()=>{
        main.removeChild(formContainer);
    })
}

function createBookCard({id, author, title, pages, read}) {
    const bookCard = document.createElement('li');
    bookCard.className = 'book-cards'
    bookCard.id = `book-${id}`;

    const bookTitle = document.createElement('p');
    bookTitle.className='book-title';
    bookTitle.textContent = `"${title}"`;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.className='book-author';
    bookAuthor.textContent = author;
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement('p');
    bookPages.className='book-pages';
    bookPages.textContent = `${pages} Pages`;
    bookCard.appendChild(bookPages);

    const buttonContainer = document.createElement('div');
    buttonContainer.className='book-card-btn-container';


    const bookReadBtn = document.createElement('button');
    bookReadBtn.className = 'book-read-btn';
    bookReadBtn.id = `book-read-${id}`;
    bookReadBtn.textContent = read? 'Read' : 'Not read'; 
    bookReadBtn.addEventListener('click', toggleReadBook);
    buttonContainer.appendChild(bookReadBtn);

    const removeBookBtn = document.createElement('button');
    removeBookBtn.className = 'remove-book-btn';
    removeBookBtn.id = `remove-book-${id}`;
    removeBookBtn.textContent = 'Remove';
    removeBookBtn.addEventListener('click', removeBook);
    buttonContainer.appendChild(removeBookBtn);

    bookCard.appendChild(buttonContainer);
    return bookCard;
}

function toggleReadBook() {
    const bookIndex = parseInt(this.id.split('-')[2]);
    const editedBook = myLibrary[bookIndex];
    editedBook.toggleRead();
    this.textContent = editedBook.read ? 'Read' : 'Not read';
    const jsonMyLibrary = JSON.stringify(myLibrary);
    localStorage.setItem('myLibrary', jsonMyLibrary);
}

function removeBook() {
    const deletedBookIndex = parseInt(this.id.split('-')[2]);
    myLibrary.splice(deletedBookIndex, 1);
    const deletedBookCard = document.querySelector(`#book-${deletedBookIndex}`);
    const bookList = document.querySelector('#book-list');
    bookList.removeChild(deletedBookCard);
    const jsonMyLibrary = JSON.stringify(myLibrary);
    localStorage.setItem('myLibrary', jsonMyLibrary);
}

const addBookBtn = document.querySelector('#add-book');
addBookBtn.addEventListener('click', () => {
    displayForm();
});

const bookList = document.querySelector('#book-list');
myLibrary.forEach(function(book) {
    const bookCard = createBookCard(book);
    bookList.appendChild(bookCard);
});