
// returns the author object that has the matching ID.
function findAuthorById(authors, id) {

  const matchingAuthor = authors.find((author) => author.id == id);
  return matchingAuthor;
}

// returns the book object that has the matching ID.
function findBookById(books, id) {

  const matchingBook = books.find((book) => book.id == id);
  return matchingBook;
}

// returns an array with two arrays inside of it. 
// All of the inputted books are present in either the first or second array.
// First array contains book objects that represent the books _that are currently checked out.
// Second array contains book objects that represent the books _that have been returned.
function partitionBooksByBorrowedStatus(books) {
let bookStatuses = [];
const checkedOut = 0;
const returned = 1;

  // call function to get all checked out books
  bookStatuses[checkedOut] = getBooksByReturnStatus(books, false);

  // call function to get all returned books
  bookStatuses[returned] = getBooksByReturnStatus(books, true);

  // return book array containing all book status
  return bookStatuses;
}

// return an array of books by return status
// helper function for partitionBooksByBorrowedStatus(books)
function getBooksByReturnStatus(books, returnStatus){
  let booklist;

  if (returnStatus){
    booklist = books.filter((book) => (book.borrows.every((borrow) => borrow.returned == returnStatus)));
  }else{
    booklist = books.filter((book) => (book.borrows.some((borrow) => borrow.returned == returnStatus)));
  }

  return booklist;
}

// return an array of ten or fewer account objects that represents the accounts
// given by the IDs in the provided book's `borrows` array
function getBorrowersForBook(book, accounts) {
  const arrayLimit = 10;
  const isLongerThanLimit = (value, index) => index > arrayLimit;
  let arrayCeiling = 0;

  // get borrower account info
  const totalBorrowerAccounts = accounts.filter((account, accountIndex, accountArray) => {
    const borrowEntry = book.borrows.find((borrow) => borrow.id == account.id)
    
    // append the returned status and condition for filter
    if (typeof borrowEntry != "undefined") {
      accountArray[accountIndex].returned = borrowEntry.returned;  
      return true;
    } else {
      return false; 
    }
  });

  // restrict to maximum returned rows
  arrayCeiling = (totalBorrowerAccounts.findIndex(isLongerThanLimit) - 1);
  arrayCeiling = (arrayCeiling < 0) ? (totalBorrowerAccounts.length) : arrayCeiling;

  // return the array entries that fit within the ceiling. 
  const maxBorrowerAccounts = totalBorrowerAccounts.slice(0, arrayCeiling)

  return maxBorrowerAccounts; 
}

/* TEST DATA */
// ---------------------------------//
//const accounts = require("../data/accounts.js");
//const books = require("../data/books.js");
//const authors = require("../data/authors.js");


const oneBook = {
  id: "5f44713259117092ab5b7361",
  title: "anim dolor sint quis ipsum",
  genre: "Psychology",
  authorId: 18,
  borrows: [
    {
      id: "5f446f2e91c2af00cb74e82b",
      returned: false,
    },
    {
      id: "5f446f2e0f8e52a3ee861543",
      returned: true,
    },
    {
      id: "5f446f2ec32d71dabec35b06",
      returned: true,
    },
    {
      id: "5f446f2e5a23764338868b10",
      returned: true,
    },
    {
      id: "5f446f2ef795e593cd3cd19d",
      returned: true,
    },
    {
      id: "5f446f2ede4d3317692340da",
      returned: true,
    },
    {
      id: "5f446f2e0b3e2ff72fc503e7",
      returned: true,
    },
    {
      id: "5f446f2eae901a82e0259947",
      returned: true,
    },
    {
      id: "5f446f2e0cb6abe0576cf60d",
      returned: true,
    },
    {
      id: "5f446f2e0f8e52a3ee861543",
      returned: true,
    },
    {
      id: "5f446f2efa2e5110917e5929",
      returned: true,
    },
    {
      id: "5f446f2e189628dfd4e6225e",
      returned: true,
    },
    {
      id: "5f446f2e91c2af00cb74e82b",
      returned: true,
    },
    {
      id: "5f446f2e189628dfd4e6225e",
      returned: true,
    },
    {
      id: "5f446f2e0b3e2ff72fc503e7",
      returned: true,
    },
    {
      id: "5f446f2e409f8883af2955dd",
      returned: true,
    },
    {
      id: "5f446f2e136866e4fe60c893",
      returned: true,
    },
    {
      id: "5f446f2e3900dfec59489477",
      returned: true,
    },
    {
      id: "5f446f2ede4d3317692340da",
      returned: true,
    },
    {
      id: "5f446f2ea508b6a99c3e42c6",
      returned: true,
    },
    {
      id: "5f446f2ee5be00208a4481e0",
      returned: true,
    },
  ],
}
/* TEST RUNS */
// ---------------------------------//
//let author = findAuthorById(authors, 49);
//console.log(author);

//let book = findBookById(books, "5f447132c30e8abe6c988a8b") 
//console.log(book);

//let bookStatuses= partitionBooksByBorrowedStatus(books);
//console.log(bookStatuses[0])
//console.log(bookStatuses[1])

//onst borrowerAccounts = getBorrowersForBook(oneBook, accounts)
//console.log(borrowerAccounts)

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
