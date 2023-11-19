const Username = document.querySelector(".user");
console.log(Username);
Username.textContent = this.GetUserNameDisplay();

function GetUserNameDisplay(){
  return localStorage.getItem("Username") ?? "Unknown";
}

function displayAllUsers(){
  const cardContainer = document.querySelector('.card-position');

}
function displayQuote() {
    fetch('https://api.api-ninjas.com/v1/quotes?category=food', {
      headers: {"X-Api-Key": "caCA71eRKvvseR5VWyFlsA==ioyhOOJ5bfExL29G"}
    })
      .then((response) => response.json())
      .then((data) => {
        const quoteEl = document.querySelector(".quoteBody");
        const authorEl = document.querySelector(".author");

        quoteEl.textContent = data[0].quote;
        authorEl.textContent = data[0].author;

        console.log(data);
      });
  }
  displayQuote();