const form = document.getElementById("form");
const input = document.querySelector("#URL");
const linkWrapper = document.querySelector(".link-wrapper");
const errorDiv = document.querySelector(".error");
const shortenedLink = document.querySelector(".short-link");

const API_BASE_URL = "http://13.233.7.83:80" || "http://localhost:9600"; 


const handleSubmit = async () => {
  const longUrl = input.value.trim();

  if (!longUrl) {
    input.style.border = "2px solid red";
    errorDiv.textContent = "Please enter a valid URL.";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/short-url`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ longUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      input.style.border = "2px solid red";
      errorDiv.textContent = data.message || "Something went wrong. Please try again!";
      return;
    }

    // Display the shortened link
    linkWrapper.style.display = "flex";
    shortenedLink.innerHTML = `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
    input.style.border = "1px solid #ddd";
  } catch (error) {
    errorDiv.textContent = "Failed to connect to the server. Please try again later.";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
  input.value = ""; // Clear the input field after submission
  errorDiv.textContent = ""; // Clear any previous error messages
});
