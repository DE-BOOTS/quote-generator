const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// new quote

function newQuote() {
  //loading function call
  loading();

  //pick a random quote from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //populating text context
  //author text

  //check if author is null to replace with "unknown"

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //check if quote length to  determine styling

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //set the quote and hide loader
  quoteText.textContent = quote.text;

  //complete function call to hide loader
  complete();
}

//Get quotes from API
async function getQuotes() {
  //loading function call
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  //try catch

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //this is were you will handle an error
  }
}

//Tweet Quote function
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -  ${authorText.textContent}`;
  window.open(twitterUrl, "_blank"); //open twitter window in new tab
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();

//on load using manual quotes
// newQuote();
