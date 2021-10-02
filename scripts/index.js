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
    submitBtn.textContent = 'Add book';
    submitBtn.id = 'submitBtn';
    newBookForm.appendChild(submitBtn);

    const alertMsg = document.createElement('p');
    alertMsg.id = 'alert-msg';
    newBookForm.appendChild(alertMsg);

    const main = document.querySelector('main');
    main.appendChild(newBookForm);
}

const addBookBtn = document.querySelector('#add-book');
addBookBtn.addEventListener('click', () => {
    displayForm();
});