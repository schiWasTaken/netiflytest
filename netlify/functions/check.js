document.getElementById("checkForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("idInput").value;

  const res = await fetch("/.netlify/functions/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  });

  const data = await res.json();

  if (data.status === "pass") {
    window.location.href = "pass.html";
  } else {
    window.location.href = "fail.html";
  }
});
