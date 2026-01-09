import { getGenres, setGenres, getBooks, nextId } from './data.js';

const genresList = document.querySelector('#genres-list');
const addGenreBtn = document.querySelector('#btn-add-genre');
const genreFormContainer = document.querySelector('#genre-form-container');
const genreForm = document.querySelector('#genre-form');
const genreFormCancelBtn = document.querySelector('#genre-cancel-btn');

export const renderGenres = () => {
  const genres = getGenres();
  genresList.innerHTML = '';
  genres.forEach(genre => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${genre.name}</span>
      <button class="btn-small btn-delete" data-id="${genre.id}">Delete</button>
    `;
    genresList.append(listItem);
  });
};

const closeGenreForm = () => {
  genreForm.reset();
  genreFormContainer.classList.add('hidden');
};

const handleDeleteGenre = genreId => {
  const isGenreUsed = getBooks().some(book => book.genreId === genreId);

  if (isGenreUsed) {
    alert(
      'Cannot delete this genre because books are linked to it. Please delete or reassign those books first.'
    );
    return;
  }

  if (confirm('Are you sure you want to delete this genre?')) {
    const updatedGenres = getGenres().filter(g => g.id !== genreId);
    setGenres(updatedGenres);
    renderGenres();
  }
};

const handleFormSubmit = event => {
  event.preventDefault();
  const genres = getGenres();
  const newGenre = {
    id: nextId(genres),
    name: document.querySelector('#genre-name').value,
  };
  genres.push(newGenre);
  setGenres(genres);
  renderGenres();
  closeGenreForm();
};

// Initialize event handlers
export const setupGenreHandlers = () => {
  // Event delegation for deletion
  genresList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-delete')) {
      const genreId = +event.target.dataset.id;
      handleDeleteGenre(genreId);
    }
  });

  // Add new genre
  addGenreBtn.addEventListener('click', () => {
    genreFormContainer.classList.remove('hidden');
  });

  genreForm.addEventListener('submit', handleFormSubmit);

  genreFormCancelBtn.addEventListener('click', closeGenreForm);
};
