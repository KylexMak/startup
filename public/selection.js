const Username = document.querySelector(".user");
Username.textContent = this.GetUserName();

function GetUserName(){
    return localStorage.getItem("Username") ?? "Unknown";
}

function displayQuote() {
    fetch('https://api.api-ninjas.com/v1/quotes?category=food')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector(".quote");

        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');

        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;

        // Clear previous quote and author
        containerEl.innerHTML = '';

        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
  }