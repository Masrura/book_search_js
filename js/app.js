console.log('JS attached')

//Variables 
const displayField = document.getElementById('display-field');
const displayResultNo = document.getElementById('number-of-result');
const notFound = document.getElementById('not-found');
let bookName = '';
let authorName = '';
let publisher = '';
let firstPublished = '';
let image = '';

//spinner namagement

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('display-field').style.display = displayStyle;
}

//search onclick function

const searchBook = () => {
    //spinner on
    toggleSpinner('block');
    toggleSearchResult('none');

    //removing existing search results
    displayResultNo.textContent = '';
    displayField.textContent = '';
    notFound.textContent = ''
    
    //fetching Url Prepation and Fetch
    const searchField = document.getElementById('search-text');
    const url = `https://openlibrary.org/search.json?q=${searchField.value}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data, data.docs))
        .catch(error => show(error))
    searchField.value = '';
}
const show = (error) => {
    toggleSpinner('none');
    displayResultNo.innerHTML = `<h2 >${error}, Please try again</h2>`;
}
//display result function

const displayResult = (allBooks, booksInfo) => {
    
    //displaying number of search result found
    displayResultNo.innerHTML = `
        <h4>${allBooks.numFound} results found</h4>
    `;
    //if bookInfo array is not empty
    if (booksInfo.length > 0) {
        //for each book do this
        booksInfo.forEach(book => {

            //taking all the values
            book.title ? bookName = book.title : bookName = 'Book Name not Found';
            book.author_name ? authorName = book.author_name[0] : authorName = 'Author Name not Found';
            book.publisher ? publisher = book.publisher[0] : publisher = 'Publisher Not Found';
            book.first_publish_year ? firstPublished = book.first_publish_year : firstPublished = 'First Published Not found';
            book.cover_i ? image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : image = 'img/no-image-icon-23483.png';
            // console.log(bookName);
            // console.log(authorName);
            // console.log(publisher);
            // console.log(firstPublished);
            // console.log(image);

            
            //putting the values in UI
            const div = document.createElement('div');
            div.classList.add('col-md-3');
            div.innerHTML = `
            <div class="box">
                <img class="rounded" height=200 width=200 src=${image} alt="">
                <div class="details">
                    <h5 class="fw-bolder">${bookName}</h5>
                    <p class="fw-bolder">${authorName}</p>
                    <p class="fw-bolder">${publisher}</p>
                    <p class="fw-bolder">${firstPublished}</p>
                </div>
            </div>
            `;

            displayField.appendChild(div);
        });
        toggleSpinner('none');
        toggleSearchResult('flex');
    }

    //if bookInfo array is empty
    else {
        console.log('not found');
        notFound.innerHTML = `
        <h1 class="text-center fw-bolder">Nothing Found</h1>
        `;
        toggleSpinner('none');
    }
   
}