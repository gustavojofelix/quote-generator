const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const whatsappBtn = document.getElementById("whatsapp");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // generate a random number
  const index = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[index];

  if (!quote.author) {
    authorText.textContent = "--Unknown";
  } else {
    authorText.textContent = "--" + quote.author;
  }

  if (quote.text.length > 150) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

//Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();

  setTimeout(async () => {
    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
      // Catch Error Here
    }
  }, 1000);
}

// Twee Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Whatsapp Quote
function whatsappQuote() {
  const twitterUrl = `whatsapp://send?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
whatsappBtn.addEventListener("click", whatsappQuote);

// On Load
getQuotes();
//loading();
//complete();
