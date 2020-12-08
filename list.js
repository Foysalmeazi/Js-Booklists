class Book {
  constructor(bid, title, author, isbn) {
    this.bid = bid;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Store {
  static getBooks() {
    let bk;
    if (localStorage.getItem("bks") === null) {
      bk = [];
    } else {
      bk = JSON.parse(localStorage.getItem("bks"));
    }

    return bk;
  }

  static addBook(book) {
    const mybooks = Store.getBooks();
    mybooks.push(book);
    localStorage.setItem("bks", JSON.stringify(mybooks));
  }
}
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-lists");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.bid}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

    list.appendChild(row);
  }

  static clearFields() {
    document.getElementById("bid").value = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  static deleteBook(event) {
    if (event.classList.contains("delete")) {
      event.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, clasName) {
    const div = document.createElement("div");
    div.className = `alert alert-${clasName}`;

    div.appendChild(document.createTextNode(message));
    const list_title = document.querySelector(".book-list-title");
    const forms = document.querySelector("#book-form");

    list_title.insertBefore(div, forms);

    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }
}
document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const bid = document.querySelector("#bid").value;
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  if (bid==="" || title === "" || author === "" || isbn === "") {
    UI.showAlert("Please Fill the required field", "danger");
  } else {
    const book = new Book(bid,title, author, isbn);

    // Add Book To UI
    UI.addBookToList(book);
    // Add Book To Storage
    Store.addBook(book);

    UI.clearFields();
    UI.showAlert("Book Addeed,You have done your work", "success");
  }
});

// document.getElementById('book-lists').addEventListener('click',(e)=>
// {
//     UI.deleteBook(e.target);
// })

var rowdelete = document.getElementById("book-lists");
rowdelete.onclick = function (e) {
  UI.deleteBook(e.target);
  UI.showAlert("Book Removed Successfully", "warning");
};
