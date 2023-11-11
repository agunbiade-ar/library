let myLibrary = [
  {
    id: 1,
    title: 'Star Wars',
    author: 'George Lucas',
    pages: 390,
    isRead: true,
  },
  {
    id: 2,
    title: 'Harry Potter',
    author: 'J.K Rowling',
    pages: 456,
    isRead: false,
  },
  {
    id: 3,
    title: 'Shawshank Redemption',
    author: 'Stephen King',
    pages: 350,
    isRead: false,
  },
  {
    id: 4,
    title: 'Bourne Supremacy',
    author: 'Robert Ludlum',
    pages: 407,
    isRead: true,
  },
];

let cardsContainer = document.querySelector('.cards-container');
let submit = document.querySelector('.dialog1-submit');
let tableOfBooks = document.querySelector('.see-all-books');

submit.addEventListener('click', function (e) {
  e.preventDefault();

  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let isRead = document.querySelector('#isRead').checked;

  let requiredFields = document.querySelectorAll('input[required]');
  let emptyFields = false;

  for (var i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i].value.trim() === '') {
      alert('Please fill in all required fields.');
      emptyFields = true;
      break;
    }
  }

  if (!emptyFields) {
    let book = new Book(title, author, pages, isRead);
    let length = addBookToLibrary(book);
    createCard(length, book);
    dialog1.close();
  }
});

class Book {
  constructor(title, author, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;

    this.bookInfo = function () {
      return `${this.title} by ${this.author}, ${this.pages}, ${this.isRead}`;
    };
  }
}

// function Book(title, author, pages, isRead) {
//   this.author = author
//   this.title = title
//   this.pages = pages
//   this.isRead = isRead

//   this.bookInfo = function () {
//     return `${this.title} by ${this.author}, ${this.pages}, ${this.isRead}`
//   }
// }

function createCard(id, book) {
  book.id = id;

  let cardDiv = document.createElement('div');
  let title = document.createElement('h5');
  let hr = document.createElement('hr');
  let author = document.createElement('h6');
  let pages = document.createElement('h6');
  let isReadBtn = document.createElement('button');
  let removeBtn = document.createElement('button');

  cardDiv.classList.add('card', book.id);
  title.className = 'title';

  isReadBtn.id = book.id;
  removeBtn.id = Math.pow(1.5, book.id);

  isReadBtn.className = book.isRead
    ? 'button button-primary'
    : 'button button-unread';
  isReadBtn.textContent = book.isRead ? 'Read' : 'Unread';

  removeBtn.textContent = 'Remove Book';
  removeBtn.className = 'button button-danger';

  title.textContent = book.title.toUpperCase();
  author.textContent = 'By: ' + book.author;
  pages.textContent = 'Pages ' + book.pages;

  cardDiv.appendChild(title);
  cardDiv.appendChild(hr);
  cardDiv.appendChild(author);
  cardDiv.appendChild(pages);
  cardDiv.appendChild(isReadBtn);
  cardDiv.appendChild(removeBtn);
  cardsContainer.appendChild(cardDiv);

  cardsContainer.addEventListener('click', function (e) {
    //this forces type coercion
    if (e.target.id == book.id) {
      book = toggleButton(book);
      if (book.isRead) {
        isReadBtn.classList.remove('button-unread');
        isReadBtn.classList.add('button-primary');
        isReadBtn.textContent = 'Read';
      } else {
        isReadBtn.classList.remove('button-primary');
        isReadBtn.classList.add('button-unread');
        isReadBtn.textContent = 'Unread';
      }
    }

    removeBtn.addEventListener('click', function () {
      console.log(book.id);
      myLibrary = deleteBookFromLibrary(book.id);
      removeAllCards();
      loadBooks();
    });
  });
}

function deleteBookFromLibrary(cardId) {
  return myLibrary.filter((book) => book.id !== cardId);
}

function toggleButton(book) {
  return { ...book, isRead: !book.isRead };
}

//returns length of library and uses it as the book id
function addBookToLibrary(book) {
  myLibrary.push(book);
  return myLibrary.length;
}

function removeAllCards() {
  let allCards = document.querySelectorAll('.card');
  for (let i = 0; i < allCards.length; i++) {
    cardsContainer.removeChild(allCards[i]);
  }
}

const addBook = document.querySelector('.addBook');

addBook.addEventListener('click', function () {
  const dialog = document.querySelector('.dialog1');
  dialog.showModal(); // Opens a modal
});

const dialog1 = document.querySelector('.dialog1');
dialog1.addEventListener('click', (e) => {
  const dialogDimensions1 = dialog1.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions1.left ||
    e.clientX > dialogDimensions1.right ||
    e.clientY < dialogDimensions1.top ||
    e.clientY > dialogDimensions1.bottom
  ) {
    dialog1.close();
  }
});

function loadBooks() {
  myLibrary.forEach((book) => {
    createCard(book.id, book);
  });
}

window.onload = loadBooks;

document.querySelector('.reset-fields').addEventListener('click', function () {
  document.querySelector('#title').focus();
});

document.querySelector('.cancel').addEventListener('click', function () {
  dialog1.close();
});
