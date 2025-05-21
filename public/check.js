document.getElementById("checkForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const id = document.getElementById("idInput").value.trim();
  
    try {
      const res = await fetch("/.netlify/functions/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
  
      if (!res.ok) {
        throw new Error("Server error");
      }
  
      const data = await res.json();
  
      if (data.status === "pass") {
        window.location.href = "pass.html";
      } else {
        window.location.href = "fail.html";
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  });
  