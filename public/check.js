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

    const data = await res.json();

    if (data.status === "pass") {
      window.location.href = `pass.html?name=${encodeURIComponent(data.name)}`;
    } else {
      window.location.href = `fail.html?name=${encodeURIComponent(data.name || "")}`;
    }
  } catch (err) {
    alert("Something went wrong. Please try again.");
    console.error(err);
  }
});
