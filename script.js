const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader')
let apiQuotes=[];
console.log("Testing");

function showLoadingSpinner ()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}
//Remove Loading Spinner
function removeLoadingSpinner()
{
    quoteContainer.hidden=false;
    loader.hidden=true;
    
}
// Show new quotes 
function newQuote(){
    // Pick a random quote from api quotes array
    showLoadingSpinner();
    const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // If Author field is blank replace it with Unknown
    if(!quote.author)
    {
        authorText.textContent='Unknown';
    }
    else
    {
        authorText.textContent=quote.author;
    }
    // Check quote length to determine the styling
    if(quote.text.length > 120)
    {
        quoteText.classList.add('long-quote');
    }
    else
    {
        quoteText.classList.remove('long-quote');
    }
//set quote and hide loader
    quoteText.textContent=quote.text;
    removeLoadingSpinner();
}
//get quotes from API
async function getQuotes()
{
    showLoadingSpinner();
    const apiUrl='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();
    } catch (error) {
        //Catch Error Here
    }
}
function tweetQuote()
{
    // using template string to pass in a variable ; i.e why using back case instead of double quotes
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank')// _blank opens the url in new window
}
//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote)

// OnLoad
getQuotes();
