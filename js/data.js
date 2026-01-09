// All data is synchronized with localStorage
let authors = JSON.parse(localStorage.getItem('authors')) || [];
let books = JSON.parse(localStorage.getItem('books')) || [];
let genres = JSON.parse(localStorage.getItem('genres')) || [];

// Callbacks for notifying about data changes
let onAuthorsChange = null;
let onBooksChange = null;
let onGenresChange = null;

// Initialize default data
export const initData = () => {
  if (authors.length === 0) {
    authors = [
      {
        id: 1,
        name: 'Taras',
        surname: 'Shevchenko',
        patronymic: 'Hryhorovych',
        birthDate: '1814-03-03',
      },
      {
        id: 2,
        name: 'Lesya',
        surname: 'Ukrainka',
        patronymic: 'Kosach',
        birthDate: '1871-02-25',
      },
      {
        id: 3,
        name: 'Ivan',
        surname: 'Franko',
        patronymic: 'Yakovych',
        birthDate: '1856-08-27',
      },
    ];
    localStorage.setItem('authors', JSON.stringify(authors));
  }

  if (books.length === 0) {
    books = [
      { id: 1, title: 'Kobzar', authorId: 1, genreId: 1, pages: 256 },
      { id: 2, title: 'Forest Song', authorId: 2, genreId: 2, pages: 128 },
      { id: 3, title: 'Withered Leaves', authorId: 3, genreId: 3, pages: 320 },
    ];
    localStorage.setItem('books', JSON.stringify(books));
  }

  if (genres.length === 0) {
    genres = [
      { id: 1, name: 'Poetry' },
      { id: 2, name: 'Fiction' },
      { id: 3, name: 'Drama' },
    ];
    localStorage.setItem('genres', JSON.stringify(genres));
  }
};

export const getAuthors = () => authors;

export const getBooks = () => books;

export const getGenres = () => genres;

export const onAuthorsChanged = cb => (onAuthorsChange = cb);

export const onBooksChanged = cb => (onBooksChange = cb);

export const onGenresChanged = cb => (onGenresChange = cb);

// Update authors
export const setAuthors = newAuthors => {
  authors = newAuthors;
  localStorage.setItem('authors', JSON.stringify(authors));
  if (onAuthorsChange) onAuthorsChange(authors);
};

// Update books
export const setBooks = newBooks => {
  books = newBooks;
  localStorage.setItem('books', JSON.stringify(books));
  if (onBooksChange) onBooksChange(books);
};

// Update genres
export const setGenres = newGenres => {
  genres = newGenres;
  localStorage.setItem('genres', JSON.stringify(genres));
  if (onGenresChange) onGenresChange(genres);
};

// Take all IDs, find the maximum one, and add 1. If the array is empty, return 1
export const nextId = collection =>
  Math.max(0, ...collection.map(i => i.id)) + 1;
