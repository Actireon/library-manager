# Library Manager Application

A vanilla JavaScript Single Page Application (SPA) for managing a library database. This project demonstrates CRUD operations, DOM manipulation, and state management without external frameworks.

## Live Demo
**Try the application here:** [View Live Demo](https://actireon.github.io/library-manager/)

## Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Flexbox, CSS Variables, and Responsive design for mobile/desktop.
- **JavaScript (ES6+):**
  - ES Modules (`import`/`export`) for code organization.
  - `localStorage` for data persistence.
  - Event Delegation for performance optimization.
  - Observer Pattern for reactive UI updates.

## Key Features

1.  **CRUD Operations:** Create, Read, Update, and Delete records for Authors, Books, and Genres.
2.  **Data Persistence:** All data is saved to the browser's LocalStorage, so data is not lost on refresh.
3.  **Relational Integrity:**
    - Prevents deletion of Authors/Genres if they are currently linked to existing Books.
    - Dynamically updates dropdown lists when related data changes.
4.  **Search & Sort:**
    - Real-time search filtering.
    - Column-based sorting (by name, page count, date, etc.).
5.  **Responsive UI:** Adapted for mobile devices and desktops.
