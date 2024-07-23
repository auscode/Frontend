document.addEventListener("DOMContentLoaded", () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const role = payload.role;

    if (role === "LIBRARIAN") {
      window.location.href = "librarian/dashboard.html";
    } else if (role === "MEMBER") {
      window.location.href = "member/dashboard.html";
    }
  }

  const logoutButton = document.getElementById("Logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/auth/logout", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.removeItem("accessToken");
          alert(data.message);
          window.location.href = "../index.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Logout failed", error);
        alert("An error occurred during logout.");
      }
    });
  }
});
async function deleteOwnAccount() {
  if (confirm("Are you sure you want to delete your own account?")) {
    try {
      const response = await fetch("http://127.0.0.1:5000/users/me", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("accessToken");
        window.location.href = "../index.html";
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Failed to delete your own account", error);
      alert("An error occurred while trying to delete your own account.");
    }
  }
}

const deleteOwnAccountButton = document.getElementById(
  "deleteOwnAccountButton"
);
deleteOwnAccountButton.addEventListener("click", deleteOwnAccount);
