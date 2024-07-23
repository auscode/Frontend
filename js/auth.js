document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const renderUrl = "https://lib-mgmt.onrender.com";

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch(`${renderUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("accessToken", data.access_token);

          const payload = JSON.parse(atob(data.access_token.split(".")[1]));
          const role = payload.sub.role;

          if (role === "LIBRARIAN") {
            window.location.href = "librarian/dashboard.html";
          } else if (role === "MEMBER") {
            window.location.href = "member/dashboard.html";
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Login failed", error);
        alert("An error occurred during login.");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;

      try {
        const response = await fetch(`${renderUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, role }),
        });

        const data = await response.json();
        if (response.ok) {
          window.location.href = "login.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Registration failed", error);
        alert("An error occurred during registration.");
      }
    });
  }
});
