// bookname
// author(handle error if doesn't exist)
// publisher
// first published
// all function should be arrow function
// in case of array use forEach
// triple equal(if use)

// ১.UI তে search input থাকবে এন্ড একটা বাটন থাকবে।
// ২.বাটনে এ click করলে search field থেকে ভ্যালু নিয়ে Api থেকে রেজাল্ট দেখাবে।
// ৩.Book name দেখাতে হবে।
// ৪.author.এর নাম দেখাইতে হবে
// ৫.First published date দেখাইতে হবে
// ৬.search bar এর নিচে কয়টা search result পাওয়া গেছে সেগুলা দেখাইতে হবে।
// ৭.search দেওয়ার পর কোন কিছু পাওয়া না গেলে No Result দেখাবে
// বোনাস
// 1. arrow function use
// 2. For each loop
// 3. If needed use equal then use ===
//     4. When data loop  show cover_i url

console.log('JS attached')
const displayField = document.getElementById('display-field');
const displayResultNo = document.getElementById('number-of-result');
const notFound = document.getElementById('not-found');
let bookName = '';
let authorName = '';
let publisher = '';
let firstPublished = '';
let image = '';

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('display-field').style.display = displayStyle;
}

const searchBook = () => {
    toggleSpinner('block');
    toggleSearchResult('none');
    displayResultNo.textContent = '';
    displayField.textContent = '';
    notFound.textContent=''
    const searchField = document.getElementById('search-text');
    const url = `https://openlibrary.org/search.json?q=${searchField.value}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data, data.docs))
    searchField.value = '';
}

const displayResult = (allBooks, booksInfo) => {
    
    displayResultNo.innerHTML = `
        <h4>${allBooks.numFound} results found</h4>
    `;
    //console.log(allBooks.numFound);
   // console.log(booksInfo);
    if (booksInfo.length > 0) {
       
        booksInfo.forEach(book => {
            book.title ? bookName = book.title : bookName = 'Book Name not Found';
            book.author_name ? authorName = book.author_name[0] : authorName = 'Author Name not Found';
            book.publisher ? publisher = book.publisher[0] : publisher = 'Publisher Not Found';
            book.first_publish_year ? firstPublished = book.first_publish_year : firstPublished = 'First Published Not found';
            book.cover_i ? image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : image = 'img/no-image-icon-23483.png';
            console.log(bookName);
            console.log(authorName);
            console.log(publisher);
            console.log(firstPublished);
            console.log(image);
            
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
    else {
        console.log('not found');
        notFound.innerHTML = `
        <h1 class="text-center fw-bolder">Nothing Found</h1>
        `;
        toggleSpinner('none');
    }
   
}