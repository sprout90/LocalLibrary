// returns a _number_ that represents the number of book objects inside of the array.
function getTotalBooksCount(books) {
  return books.length;
}

// returns a _number_ that represents the number of account objects inside of the array.
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// returns a _number_ that represents the number of books that are currently checked out of the library. 
// this number can be found by looking at the first transaction object in the `borrows` array of each book. 
//  If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.
function getBooksBorrowedCount(books) {
  const firstTransaction = 0;

  const borrowedCount = books.reduce((total, book) => {
    total = (book.borrows[firstTransaction].returned == false) ? total+=1 : total
    return (total); 
  }, 0);

  return borrowedCount;
}

// returns an array containing five objects or fewer that represents the 
// most common occurring genres, ordered from most common to least.
function getMostCommonGenres(books) {
   
  // for each genre, count the total occurrences
  let genreList = [...new Set(books.map((book) => book.genre))].map((genre) => {
    return {
      name: genre,
      count: books.reduce((count,book) => (book.genre == genre) ? count+=1 : count ,0)
    }
  },[])

  const maxSize = 5;
  return sortByCountAndShrink(genreList, maxSize);
}


// returns an array containing five objects or fewer that represents the most popular books in the library.
// Popularity is represented by the number of times a book has been borrowed.
function getMostPopularBooks(books) {

  // for each book, count the total checkout transactions
  let popularBookList = books.map((book) => {
    return {
      name: book.title,
      count: book.borrows.reduce((count,borrow) => count+=1 ,0)
    }
  },[]) 

  const maxSize = 5;
  return sortByCountAndShrink(popularBookList, maxSize);
}

// returns an array containing five objects or fewer that represents the most popular authors
// whose books have been checked out the most. 
// Popularity is represented by finding all of the books written by the author and 
// then adding up the number of times those books have been borrowed.
function getMostPopularAuthors(books, authors) {

 // for each book, count the total checkout transactions
 let popularAuthorList = authors.map((author) => {
  return {
    name: `${author.name.first} ${author.name.last}`,
    count: books.reduce((totalAuthorCount, book) =>  
      {
        const bookCount = ((book.authorId == author.id) ? book.borrows.reduce((borrowCount,borrow) => borrowCount+=1 ,0) : 0);
        return (bookCount + totalAuthorCount);
      }, 0)
  }
},[]) 

 // sort and shrink, then return
 const maxSize = 5;
 return sortByCountAndShrink(popularAuthorList, maxSize);
}

// HELPER function to sort and reduce to max length
function sortByCountAndShrink(inputList, maxListLength){

  inputList.sort((itemA, itemB) => itemB.count - itemA.count);
  return inputList.slice(0,maxListLength)
}

/* TEST DATA */
// ---------------------------------//
//const accounts = require("../data/accounts.js");
const books = require("../data/books.js");
//const authors = require("../data/authors.js");


/* TEST RUN */
// ---------------------------------//


//const total = getBooksBorrowedCount(books)
//console.log(total)

//myArray = getMostCommonGenres(books)
//console.log(myArray)

//myArray = getMostPopularBooks(books)
//console.log(myArray)

//myArray = getMostPopularAuthors(books, authors)
//console.log(myArray)

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
