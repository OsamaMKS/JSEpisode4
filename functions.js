/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  const result = books.find(book => book.id === bookId);
  return result;
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  const result = authors.find(
    author => author.name.toLowerCase() == authorName.toLowerCase()
  );
  return result;
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here

  return authors.map(author => ({
    author: author.name,
    bookCount: author.books.length
  }));
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};
  books.forEach(book => {
    if (colors[book.color]) {
      colors[book.color].push(book.title);
    } else {
      colors[book.color] = [book.title];
    }
  });

  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let author = getAuthorByName(authorName, authors);

  if (!author) {
    return [];
  } else {
    return author.books.map(bookId => getBookById(bookId, books).title);
  }
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let FirstAuthor = authors[0];

  authors.forEach(author => {
    if (author.books.length > FirstAuthor.books.length) {
      FirstAuthor = author;
    }
  });
  return FirstAuthor.name;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  const book = getBookById(bookId, books);
  let titles = [];

  book.authors.forEach(
    author =>
      (titles = titles.concat(titlesByAuthorName(author.name, authors, books)))

    /* BONUS */

    // titles = titles.concat(titlesByAuthorName(author.name, authors, books).filter(book => !titles.includes(book)))
  );

  /* Alternate BONUS */
  // titles = [...new Set(titles)];

  return titles;

  /* "One-liner" using reduce */
  // return getBookById(bookId, books).authors.reduce(
  //   (titles, author) => [
  //     ...new Set([
  //       ...titles,
  //       ...titlesByAuthorName(author.name, authors, books)
  //     ])
  //     ...new Set(titles.concat(titlesByAuthorName(author.name, authors, books)))
  //   ],
  //   []
  // );
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/

function friendliestAuthor(authors) {
  authors.forEach(author => {
    author.coauthoringCount = 0;
    authors.forEach(secondAuthor => {
      if (secondAuthor.name !== author.name) {
        const sharedBooks = secondAuthor.books.filter(bookId =>
          author.books.includes(bookId)
        );
        author.coauthoringCount += sharedBooks.length;
      }
    });

    /* Alternative with reduce */
    // author.coauthoringCount = authors.reduce(
    //   (coauthoringCount, secondAuthor) => {
    //     if (secondAuthor.name !== author.name)
    //       coauthoringCount += secondAuthor.books.filter(bookId =>
    //         author.books.includes(bookId)
    //       ).length;
    //     return coauthoringCount;
    //   },
    //   0
    // );
  });

  let friendlyAuthor = authors[0];

  authors.forEach(author => {
    if (author.coauthoringCount > friendlyAuthor.coauthoringCount) {
      friendlyAuthor = author;
    }
  });

  return friendlyAuthor.name;

  /* Alternative with sort */
  // return authors.sort(
  //   (authorA, authorB) => authorB.coauthoringCount - authorA.coauthoringCount
  // )[0].name;
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

// const authors = require("./authors.json");
// const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));
