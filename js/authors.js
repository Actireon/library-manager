import {
  getAuthors,
  setAuthors,
  getBooks,
  nextId,
  onBooksChanged,
} from './data.js';

const authorsList = document.querySelector('#authors-table-body');
const authorFormContainer = document.querySelector('#author-form-container');
const addAuthorBtn = document.querySelector('#btn-add-author');
const authorForm = document.querySelector('#author-form');
const authorFormCancelBtn = document.querySelector('#author-cancel-btn');
const authorSearchInput = document.querySelector('#author-search');
const authorSortHeaders = document.querySelectorAll(
  '#section-authors th[data-sort]'
);

let sortDirection = 1;
let currentSortColumn = '';

export const renderAuthors = (data = null) => {
  const authors = data || getAuthors();
  const books = getBooks();

  authorsList.innerHTML = '';
  authors.forEach(author => {
    const authorBooks = books.filter(book => book.authorId === author.id);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${author.surname}</td>
      <td>${author.name}</td>
      <td>${author.birthDate}</td>
      <td>${authorBooks.length}</td>
      <td>
        <button class="btn-small btn-edit" data-id="${author.id}">Edit</button>
        <button class="btn-small btn-delete" data-id="${author.id}">Delete</button>
      </td>
    `;
    authorsList.append(row);
  });
};

const closeAuthorForm = () => {
  authorForm.reset();
  authorFormContainer.classList.add('hidden');
};

const handleDeleteAuthor = id => {
  const isAuthorUsed = getBooks().some(book => book.authorId === id);

  if (isAuthorUsed) {
    alert(
      'Cannot delete this author because books are linked to it. Please delete or reassign those books first.'
    );
    return;
  }

  if (confirm('Are you sure you want to delete this author?')) {
    const deleteAuthor = getAuthors().filter(author => author.id !== id);
    setAuthors(deleteAuthor);
    renderAuthors();
  }
};

const handleEditAuthor = id => {
  const authorToEdit = getAuthors().find(a => a.id === id);
  if (!authorToEdit) return;

  document.querySelector('#author-name').value = authorToEdit.name;
  document.querySelector('#author-surname').value = authorToEdit.surname;
  document.querySelector('#author-patronymic').value =
    authorToEdit.patronymic || '';
  document.querySelector('#author-dob').value = authorToEdit.birthDate;
  document.querySelector('#author-id').value = authorToEdit.id;
  authorFormContainer.classList.remove('hidden');
};

const handleFormSubmit = event => {
  event.preventDefault();

  const authors = getAuthors();
  const idVal = document.querySelector('#author-id').value;

  if (idVal) {
    // Edit existing author
    const authorId = +idVal;
    const authorIndex = authors.findIndex(a => a.id === authorId);
    if (authorIndex !== -1) {
      authors[authorIndex] = {
        id: authorId,
        name: document.querySelector('#author-name').value,
        surname: document.querySelector('#author-surname').value,
        patronymic: document.querySelector('#author-patronymic').value,
        birthDate: document.querySelector('#author-dob').value,
      };
      setAuthors(authors);
    }
  } else {
    // Create new author
    const newAuthor = {
      id: nextId(authors),
      name: document.querySelector('#author-name').value,
      surname: document.querySelector('#author-surname').value,
      patronymic: document.querySelector('#author-patronymic').value,
      birthDate: document.querySelector('#author-dob').value,
    };
    authors.push(newAuthor);
    setAuthors(authors);
  }

  renderAuthors();
  closeAuthorForm();
};

const handleSearch = event => {
  const searchTerm = event.target.value.toLowerCase();
  const filtered = getAuthors().filter(
    author =>
      author.surname.toLowerCase().includes(searchTerm) ||
      author.name.toLowerCase().includes(searchTerm)
  );
  renderAuthors(filtered);
};

const handleSort = sortType => {
  if (currentSortColumn === sortType) sortDirection *= -1;
  else {
    currentSortColumn = sortType;
    sortDirection = 1;
  }

  const sortedAuthors = [...getAuthors()].sort((a, b) => {
    let valA, valB;
    switch (sortType) {
      case 'surname':
        valA = a.surname.toLowerCase();
        valB = b.surname.toLowerCase();
        break;
      case 'name':
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case 'dob':
        valA = new Date(a.birthDate).getTime();
        valB = new Date(b.birthDate).getTime();
        break;
      default:
        return 0;
    }

    if (valA > valB) return sortDirection;
    if (valA < valB) return -sortDirection;
    return 0;
  });

  renderAuthors(sortedAuthors);
};

export const setupAuthorHandlers = () => {
  // Event delegation for delete and edit
  authorsList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-delete')) {
      const id = +event.target.dataset.id;
      handleDeleteAuthor(id);
    }

    if (event.target.classList.contains('btn-edit')) {
      const id = +event.target.dataset.id;
      handleEditAuthor(id);
    }
  });

  addAuthorBtn.addEventListener('click', () => {
    document.querySelector('#author-id').value = '';
    authorForm.reset();
    authorFormContainer.classList.remove('hidden');
  });

  authorForm.addEventListener('submit', handleFormSubmit);

  authorFormCancelBtn.addEventListener('click', closeAuthorForm);

  authorSearchInput.addEventListener('input', handleSearch);

  authorSortHeaders.forEach(th => {
    th.addEventListener('click', () => {
      const sortType = th.dataset.sort;
      handleSort(sortType);
    });
  });

  // Update book count when books change
  onBooksChanged(() => {
    renderAuthors();
  });
};
