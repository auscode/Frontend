document.addEventListener("DOMContentLoaded", () => {
  async function loadMembers() {
    const response = await fetch("http://127.0.0.1:5000/users/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });

    const members = await response.json();
    console.log(members);
    const membersList = document.getElementById("membersList");
    membersList.innerHTML = "";

    members.forEach((member) => {
      const memberItem = document.createElement("div");
      memberItem.className = "member-item";

      const memberName = document.createElement("span");
      memberName.textContent = member.username;

      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.onclick = () => updateMember(member.id, member.username);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteMember(member.id);

      memberItem.appendChild(memberName);
      memberItem.appendChild(updateButton);
      memberItem.appendChild(deleteButton);
      membersList.appendChild(memberItem);
    });
  }

  async function updateMember(memberId, currentUsername) {
    const newUsername = prompt("Enter new username:", currentUsername);
    const newPassword = prompt("Enter new password ");

    if (newUsername) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/users/${memberId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({
              username: newUsername,
              password: newPassword,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Member updated successfully!");
          loadMembers();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to update member", error);
        alert("An error occurred while trying to update the member.");
      }
    }
  }

  async function deleteMember(memberId) {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/users/${memberId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Member deleted successfully!");
          loadMembers();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to delete member", error);
        alert("An error occurred while trying to delete the member.");
      }
    }
  }

  async function addMember() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    if (username && password) {
      try {
        const response = await fetch("http://127.0.0.1:5000/users/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Member added successfully!");
          loadMembers();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Failed to add member", error);
        alert("An error occurred while trying to add the member.");
      }
    } else {
      alert("Username and password are required.");
    }
  }

  loadMembers();
  const addMemberButton = document.getElementById("addMemberButton");
  addMemberButton.addEventListener("click", addMember);
});
