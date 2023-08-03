// returns account object that has the matching id
function findAccountById(accounts, id) {

  const accountRec = accounts.find((account) => account.id === id);
  return accountRec;
}

// returns the sorted array of the provided account objects, 
// Objects are sorted alpha by last name
function sortAccountsByLastName(accounts) {

  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1: -1 );
  return accounts;
}

// It returns a _number_ that represents the number of times 
// the account's ID appears in any book's `borrows` array.
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
 
  const borrowCount = books.reduce((total, book, borrowsIndex) => {
    const borrowedBook = book.borrows.some((borrow) => borrow.id == accountId);
    total = borrowedBook ? total+=1 : total
    return (total); 
  }, 0);

  return borrowCount;
}

// It returns an array of book objects, including author information, that represents all books 
// _currently checked out_ by the given account. 
// Return object also includes the author object nested inside of it.
function getBooksPossessedByAccount(account, books, authors) {

  const checkedOutBooks = books.reduce((filteredBookList, book) => {
      const [firstTransaction, ...rest] = book.borrows;
      
      if (firstTransaction.returned == false && book.borrows[0].id == account.id){
          const author = authors.find((author) => book.authorId == author.id);
          book.author = author;
          filteredBookList.push(book)
      }
      return filteredBookList;
  }, [] );

   return checkedOutBooks;
}


/* TEST DATA */
// ---------------------------------//
//const accounts = require("../data/accounts.js");
//const books = require("../data/books.js");
//const authors = require("../data/authors.js");

const oneAccount = {
  id: "5f446f2efa7fe184c4014dd2",
  picture: "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
  age: 25,
  name: {
    first: "Esther",
    last: "Tucker",
  },
  company: "ZILLACON",
  email: "esther.tucker@zillacon.me",
  registered: "Thursday, May 28, 2015 2:51 PM",
}


// TEST RUNS
// ---------------------------------//

//let account = findAccountById(accounts, "5f446f2e637138095dcc3db2" )
//console.log(account);

//let sortedAccounts = sortAccountsByLastName(accounts) 
//console.log(sortedAccounts)

//let borrowCount = getTotalNumberOfBorrows(oneAccount, books)
//console.log(borrowCount)

//let bookSummary = getBooksPossessedByAccount(oneAccount, books, authors);
//console.log(bookSummary);

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
