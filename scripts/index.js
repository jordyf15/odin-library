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
        const newBookForm = document.querySelector('#new-book-form');
        main.removeChild(newBookForm);
        const newBookCard = createBookCard(newBook);
        const bookList = document.querySelector('#book-list');
        bookList.appendChild(newBookCard);
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
    const newBookForm = document.createElement('form');
    newBookForm.id='new-book-form';

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

    const readSpan = document.createElement('span');
    readSpan.textContent = 'Have you read this? ';
    readSpan.id = 'read-span';
    const readCheckbox = document.createElement('input');
    readCheckbox.type = 'checkbox';
    readCheckbox.id='read-cb';

    readContainer.appendChild(readSpan);
    readContainer.appendChild(readCheckbox);
    newBookForm.appendChild(readContainer);

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Add';
    submitBtn.type = 'button';
    submitBtn.id = 'submitBtn';
    submitBtn.addEventListener('click', addBookToLibrary)
    newBookForm.appendChild(submitBtn);

    const alertMsg = document.createElement('p');
    alertMsg.id = 'alert-msg';
    newBookForm.appendChild(alertMsg);

    const main = document.querySelector('main');
    main.appendChild(newBookForm);
}

function createBookCard({id, author, title, pages, read}) {
    const bookCard = document.createElement('li');
    bookCard.id = `book-${id}`;
    const bookAuthor = document.createElement('p');
    bookAuthor.className='book-author';
    bookAuthor.textContent = author;
    bookCard.appendChild(bookAuthor);

    const bookTitle = document.createElement('p');
    bookTitle.className='book-title';
    bookTitle.textContent = title;
    bookCard.appendChild(bookTitle);

    const bookPages = document.createElement('p');
    bookPages.className='book-pages';
    bookPages.textContent = `${pages} pages`;
    bookCard.appendChild(bookPages);

    const bookReadBtn = document.createElement('button');
    bookReadBtn.className = 'book-read';
    bookReadBtn.id = `book-read-${id}`;
    bookReadBtn.textContent = read? 'Read' : 'Not read'; 
    bookReadBtn.addEventListener('click', toggleReadBook);
    bookCard.appendChild(bookReadBtn);

    const removeBookBtn = document.createElement('button');
    removeBookBtn.className = 'remove-book-btn';
    removeBookBtn.id = `remove-book-${id}`;
    removeBookBtn.textContent = 'Remove';
    removeBookBtn.addEventListener('click', removeBook);
    bookCard.appendChild(removeBookBtn);

    return bookCard;
}

function toggleReadBook() {
    const bookIndex = parseInt(this.id.split('-')[2]);
    const editedBook = myLibrary[bookIndex];
    editedBook.toggleRead();
    this.textContent = editedBook.read ? 'Read' : 'Not read';
}

function removeBook() {
    const deletedBookIndex = parseInt(this.id.split('-')[2]);
    myLibrary.splice(deletedBookIndex, 1);
    const deletedBookCard = document.querySelector(`#book-${deletedBookIndex}`);
    const bookList = document.querySelector('#book-list');
    bookList.removeChild(deletedBookCard);
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