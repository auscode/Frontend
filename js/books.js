const renderUrl = "https://lib-mgmt.onrender.com";
document.addEventListener("DOMContentLoaded", () => {
  const addBookForm = document.getElementById("addBookForm");
  const updateBookForm = document.getElementById("updateBookForm");
  const borrowBookForm = document.getElementById("borrowBookForm");
  const returnBookForm = document.getElementById("returnBookForm");
  const deleteBookForm = document.getElementById("deleteBookForm");
  const booksList = document.getElementById("booksList");

  if (addBookForm) {
    addBookForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;

      try {
        const response = await fetch(`${renderUrl}/books/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: JSON.stringify({ title, author }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Book added successfully!");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to add book", error);
        alert("An error occurred while adding the book.");
      }
    });
  }

  if (updateBookForm) {
    updateBookForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("id").value;
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;

      try {
        const response = await fetch(`${renderUrl}/books/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: JSON.stringify({ title, author }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Book updated successfully!");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to update book", error);
        alert("An error occurred while updating the book.");
      }
    });
  }

  if (borrowBookForm) {
    borrowBookForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("id").value;
      console.log(id);
      try {
        const response = await fetch(`${renderUrl}/books/${id}/borrow`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          alert("Book borrowed successfully!");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to borrow book", error);
        alert("An error occurred while borrowing the book.");
      }
    });
  }

  if (returnBookForm) {
    returnBookForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("id").value;

      try {
        const response = await fetch(`${renderUrl}/books/${id}/return`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        const data = await response.json();
        if (response.ok) {
          alert("Book returned successfully!");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to return book", error);
        alert("An error occurred while returning the book.");
      }
    });
  }

  if (booksList) {
    async function loadBooks() {
      try {
        const response = await fetch(`${renderUrl}/books/view`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          booksList.innerHTML = "";

          const table = document.createElement("table");
          const thead = document.createElement("thead");
          const tbody = document.createElement("tbody");

          const headers = ["Book ID", "Title", "Author", "Status"];
          const headerRow = document.createElement("tr");
          headers.forEach((headerText) => {
            const header = document.createElement("th");
            header.textContent = headerText;
            headerRow.appendChild(header);
          });
          thead.appendChild(headerRow);
          table.appendChild(thead);
          table.appendChild(tbody);

          data.forEach((book) => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = book.id;
            row.appendChild(idCell);

            const titleCell = document.createElement("td");
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            const authorCell = document.createElement("td");
            authorCell.textContent = book.author;
            row.appendChild(authorCell);

            const statusCell = document.createElement("td");
            statusCell.textContent = book.status;
            row.appendChild(statusCell);

            tbody.appendChild(row);
          });

          booksList.appendChild(table);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to load books", error);
        alert("An error occurred while loading the books.");
      }
    }

    loadBooks();
  }

  if (deleteBookForm) {
    deleteBookForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("id").value;

      try {
        const response = await fetch(`${renderUrl}/books/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        const data = await response.json();
        if (response.ok) {
          alert("Book deleted successfully!");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to delete book", error);
        alert("An error occurred while deleting the book.");
      }
    });
  }
});
