let cardsContainer = document.querySelector('.cards-container')
let submit = document.querySelector('.submit')

submit.addEventListener('click', function () {
  console.log('submit')
})
const myLibrary = [
  { title: 'Star Wars', author: 'George Lucas', pages: 390, isRead: true },
  { title: 'Harry Potter', author: 'J.K Rowling', pages: 456, isRead: false },
  {
    title: 'Shawshank Redemption',
    author: 'Stephen King',
    pages: 350,
    isRead: false,
  },
  {
    title: 'Bourne Supremacy',
    author: 'Robert Ludlum',
    pages: 407,
    isRead: true,
  },
]

function Book(title, author, pages, isRead) {
  this.author = author
  this.title = title
  this.pages = pages
  this.isRead = isRead ? 'Read' : 'Not read yet'

  this.bookInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.isRead}`
  }
}

function createCard(book) {
  let cardDiv = document.createElement('div')
  let title = document.createElement('h5')
  let hr = document.createElement('hr')
  let author = document.createElement('h6')
  let pages = document.createElement('h6')
  let isReadBtn = document.createElement('button')

  cardDiv.className = 'card'
  title.className = 'title'

  isReadBtn.className = book.isRead ? 'button-primary' : 'button-danger'

  isReadBtn.textContent = book.isRead ? 'Read' : 'Unread'

  title.textContent = book.title
  author.textContent = 'By: ' + book.author
  pages.textContent = 'Pages ' + book.pages

  cardDiv.appendChild(title)
  cardDiv.appendChild(hr)
  cardDiv.appendChild(author)
  cardDiv.appendChild(pages)
  cardDiv.appendChild(isReadBtn)

  cardsContainer.appendChild(cardDiv)
}

// function deleteBookFromLibrary() {}

function addBookToLibrary(book) {
  createCard(book)
}

myLibrary.forEach((book) => addBookToLibrary(book))

const addBook = document.querySelector('.addBook')
addBook.addEventListener('click', function () {
  const dialog = document.querySelector('dialog')
  dialog.showModal() // Opens a modal
})

const dialog = document.querySelector('dialog')
dialog.addEventListener('click', (e) => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})

document.querySelector('.reset-fields').addEventListener('click', function () {
  document.querySelector('#book_title').focus()
})

document.querySelector('.cancel').addEventListener('click', function () {
  dialog.close()
})
