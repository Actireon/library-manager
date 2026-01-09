import {
  getBooks,
  setBooks,
  getAuthors,
  getGenres,
  nextId,
  onBooksChanged,
  onAuthorsChanged,
  onGenresChanged,
} from './data.js';

const booksTableBody = document.querySelector('#books-table-body');
const bookFormContainer = document.querySelector('#book-form-container');
const bookForm = document.querySelector('#book-form');
const addBookBtn = document.querySelector('#btn-add-book');
const bookCancelBtn = document.querySelector('#book-cancel-btn');
const bookSearchInput = document.querySelector('#book-search');
const bookAuthorSelect = document.querySelector('#book-author-select');
const bookGenreSelect = document.querySelector('#book-genre-select');
const bookSortHeaders = document.querySelectorAll(
  '#section-books th[data-sort]'
);

let sortDirection = 1;
let currentSortColumn = '';

const getAuthorFullName = id => {
  const author = getAuthors().find(a => a.id === id);
  return author ? `${author.surname} ${author.name}` : 'Unknown';
};

const getGenreName = id => {
  const genre = getGenres().find(g => g.id === id);
  return genre ? genre.name : 'Unknown';
};

export const updateFormSelects = () => {
  bookAuthorSelect.innerHTML =
    '<option value="" disabled selected hidden>Choose an author</option>';
  bookGenreSelect.innerHTML =
    '<option value="" disabled selected hidden>Choose a genre</option>';

  getAuthors().forEach(author => {
    const option = document.createElement('option');
    option.value = author.id;
    option.textContent = `${author.surname} ${author.name}`;
    bookAuthorSelect.append(option);
  });

  getGenres().forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.id;
    option.textContent = genre.name;
    bookGenreSelect.append(option);
  });
};

export const renderBooks = (data = null) => {
  const books = data || getBooks();
  booksTableBody.innerHTML = '';
  books.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${getAuthorFullName(book.authorId)}</td>
      <td>${getGenreName(book.genreId)}</td>
      <td>${book.pages}</td>
      <td>
        <button class="btn-small btn-edit" data-id="${book.id}">Edit</button>
        <button class="btn-small btn-delete" data-id="${
          book.id
        }">Delete</button>
      </td>
    `;
    booksTableBody.append(row);
  });
};

const closeBookForm = () => {
  bookForm.reset();
  bookFormContainer.classList.add('hidden');
};

const handleFormSubmit = event => {
  event.preventDefault();
  const bookIdInput = document.querySelector('#book-id').value;
  const titleVal = document.querySelector('#book-title').value;
  const authorIdVal = +document.querySelector('#book-author-select').value;
  const genreIdVal = +document.querySelector('#book-genre-select').value;
  const pagesVal = +document.querySelector('#book-pages').value;

  if (!titleVal || !genreIdVal || !pagesVal) {
    alert('Please fill in required fields');
    return;
  }

  const books = getBooks();

  if (bookIdInput) {
    const bookIndex = books.findIndex(b => b.id === +bookIdInput);
    if (bookIndex !== -1) {
      books[bookIndex] = {
        id: +bookIdInput,
        title: titleVal,
        authorId: authorIdVal || null,
        genreId: genreIdVal,
        pages: pagesVal,
      };
    }
  } else {
    const newBook = {
      id: nextId(books),
      title: titleVal,
      authorId: authorIdVal || null,
      genreId: genreIdVal,
      pages: pagesVal,
    };
    books.push(newBook);
  }

  setBooks(books);
  renderBooks();
  closeBookForm();
};

const handleDeleteBook = id => {
  if (confirm('Are you sure you want to delete this book?')) {
    const newBooks = getBooks().filter(b => b.id !== id);
    setBooks(newBooks);
    renderBooks();
  }
};

const handleEditBook = id => {
  const book = getBooks().find(b => b.id === id);
  if (book) {
    updateFormSelects();
    document.querySelector('#book-id').value = book.id;
    document.querySelector('#book-title').value = book.title;
    document.querySelector('#book-pages').value = book.pages;
    document.querySelector('#book-author-select').value = book.authorId || '';
    document.querySelector('#book-genre-select').value = book.genreId;
    bookFormContainer.classList.remove('hidden');
  }
};

const handleSearch = event => {
  const searchTerm = event.target.value.toLowerCase();
  const filtered = getBooks().filter(b =>
    b.title.toLowerCase().includes(searchTerm)
  );
  renderBooks(filtered);
};

const handleSort = sortType => {
  if (currentSortColumn === sortType) sortDirection *= -1;
  else {
    currentSortColumn = sortType;
    sortDirection = 1;
  }

  const sortedBooks = [...getBooks()].sort((a, b) => {
    let valA, valB;
    switch (sortType) {
      case 'title':
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
        break;
      case 'pages':
        valA = a.pages;
        valB = b.pages;
        break;
      case 'author':
        valA = getAuthorFullName(a.authorId).toLowerCase();
        valB = getAuthorFullName(b.authorId).toLowerCase();
        break;
      case 'genre':
        valA = getGenreName(a.genreId).toLowerCase();
        valB = getGenreName(b.genreId).toLowerCase();
        break;
      default:
        return 0;
    }
    if (valA < valB) return -1 * sortDirection;
    if (valA > valB) return 1 * sortDirection;
    return 0;
  });

  renderBooks(sortedBooks);
};

export const setupBookHandlers = () => {
  renderBooks();

  // Add new book
  addBookBtn.addEventListener('click', () => {
    updateFormSelects();
    bookForm.reset();
    document.querySelector('#book-id').value = '';
    bookFormContainer.classList.remove('hidden');
  });

  bookCancelBtn.addEventListener('click', closeBookForm);

  bookForm.addEventListener('submit', handleFormSubmit);

  // Event delegation for delete and edit
  booksTableBody.addEventListener('click', event => {
    const id = +event.target.dataset.id;
    if (event.target.classList.contains('btn-delete')) {
      handleDeleteBook(id);
    }

    if (event.target.classList.contains('btn-edit')) {
      handleEditBook(id);
    }
  });

  bookSearchInput.addEventListener('input', handleSearch);

  bookSortHeaders.forEach(th => {
    th.addEventListener('click', () => {
      const sortType = th.dataset.sort;
      handleSort(sortType);
    });
  });

  // Update selects when authors change
  onAuthorsChanged(() => {
    updateFormSelects();
    renderBooks();
  });

  // Update selects when genres change
  onGenresChanged(() => {
    updateFormSelects();
    renderBooks();
  });
};
