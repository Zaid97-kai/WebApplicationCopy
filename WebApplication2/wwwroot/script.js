// Получение всех книг
async function GetBook() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/books", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально

    if (response.ok === true) {
        // получаем данные
        const books = await response.json();
        let rows = document.querySelector("tbody");
        books.forEach(book => {
            // добавляем полученные элементы в таблицу
            rows.append(row(book));
        });
    }
}
// Получение одного отеля
async function GetBookById(id) {
    const response = await fetch("/api/books/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const book = await response.json();
        const form = document.forms["bookForm"];
        form.elements["id"].value = book.id;
        form.elements["name"].value = book.name;
        form.elements["author"].value = book.author;
        form.elements["price"].value = book.price;
    }
}

async function CreateBook(bookName, bookAuthor,
    bookPrice) {
    const response = await fetch("api/books", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            name: bookName,
            author: bookAuthor,
            price: bookPrice
        })
    });
    if (response.ok === true) {
        const book = await response.json();
        reset();
        document.querySelector("tbody").append(row(book));
    }
}

async function EditBook(bookId, bookName, bookAuthor,
    bookPrice) {
    const response = await fetch("/api/books/" + bookId, {
        method: "PUT",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            id: parseInt(bookId, 10),
            name: bookName,
            author: bookAuthor,
            price: bookPrice
        })
    });
    if (response.ok === true) {
        const book = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + book.id +"']").replaceWith(row(book));
    }
}
// Удаление пользователя
async function DeleteBook(id) {
    const response = await fetch("/api/books/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const book = await response.json();
        document.querySelector("tr[data-rowid='" + book.id + "']").remove();
    }
}
// сброс формы
function reset() {
    const form = document.forms["bookForm"];
    form.reset();
    form.elements["id"].value = 0;
}
// создание строки для таблицы
function row(book) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", book.id);
    const idTd = document.createElement("td");
    idTd.append(book.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(book.name);
    tr.append(nameTd);

    const authorTd = document.createElement("td");
    authorTd.append(book.author);
    tr.append(authorTd);

    const priceTd = document.createElement("td");
    priceTd.append(book.price);
    tr.append(priceTd);

    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", book.id);
    editLink.setAttribute("style", "cursor:pointer;padding:px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetBookById(book.id);
    });
    linksTd.append(editLink);
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", book.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteBook(book.id);
    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;
}

function InitialFunction() {
    // сброс значений формы
    document.getElementById("reset").click(function (e) {
        e.preventDefault();
        reset();
    })
    // отправка формы
    document.forms["bookForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["bookForm"];
        const id = form.elements["id"].value;
        const name = form.elements["name"].value;
        const author = form.elements["author"].value;
        const price = form.elements["price"].value;
        if (id == 0)
            CreateBook(name, author, price);
        else
            EditBook(id, name, author, price);
    });
    GetBook();
}
