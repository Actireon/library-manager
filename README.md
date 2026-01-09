# 📚 Library Manager Application

A vanilla JavaScript Single Page Application (SPA) for managing a library database. This project demonstrates CRUD operations, DOM manipulation, and state management without external frameworks.

## 🔗 Live Demo
**Try the application here:** [View Live Demo](https://actireon.github.io/library-manager/)

## 🚀 Overview

This application allows users to manage a collection of Books, Authors, and Genres. It is designed to simulate a real-world admin dashboard with relational data checks (e.g., you cannot delete an author if they have linked books).

## 🛠 Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Flexbox, CSS Variables, and Responsive design for mobile/desktop.
- **JavaScript (ES6+):**
  - ES Modules (`import`/`export`) for code organization.
  - `localStorage` for data persistence.
  - Event Delegation for performance optimization.
  - Observer Pattern for reactive UI updates.

## 📂 Project Structure & Architecture

The project follows a modular architecture to ensure separation of concerns:

- **`index.html`**: The main entry point containing the layout and module imports.
- **`styles.css`**: Contains all styles, using CSS Variables (`:root`) for consistent theming and responsive media queries.
- **`js/data.js`**: The **Data Layer**. It handles all interactions with `localStorage` and implements a simple **Observer Pattern** (callbacks) to notify other modules when data changes (e.g., updating the "Author" dropdown in the "Add Book" form when a new author is created).
- **`js/app.js`**: The main controller that initializes the app, renders initial data, and handles tab navigation.
- **`js/books.js`, `authors.js`, `genres.js`**: Feature-specific modules. Each file contains the logic for rendering tables, handling form submissions, sorting, searching, and validation for its respective entity.

## ✨ Key Features

1.  **CRUD Operations:** Create, Read, Update, and Delete records for Authors, Books, and Genres.
2.  **Data Persistence:** All data is saved to the browser's LocalStorage, so data is not lost on refresh.
3.  **Relational Integrity:**
    - Prevents deletion of Authors/Genres if they are currently linked to existing Books.
    - Dynamically updates dropdown lists when related data changes.
4.  **Search & Sort:**
    - Real-time search filtering.
    - Column-based sorting (by name, page count, date, etc.).
5.  **Responsive UI:** Adapted for mobile devices and desktops.

## ⚙️ How to Run

Since this project uses **ES Modules** (`type="module"`), it requires a local HTTP server to avoid CORS errors (browsers block file system imports for security).

1.  Clone the repository.
2.  Open the project folder in VS Code.
3.  Use the **Live Server** extension (or any local server like `http-server`) to launch `index.html`.
