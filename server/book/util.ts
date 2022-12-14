import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Book} from './model';
import BookCollection from './collection';
import UserCollection from '../user/collection';
import {constructPageResponse, PageResponse} from '../page/util';
import PageCollection from '../page/collection';

// Update this if you add a property to the Book type!
type BookResponse = {
  _id: string;
  author: string; //user
  title: string;
  summary: string;
//   sharedWith: [string]; //TODO: how to have set of users 
  public: boolean;
  firstPage: string;
  pages: PageResponse[];
};

/**
 * Transform a raw Book object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Book>} book - A book object
 * @returns {BookResponse} - The book object without the password
 */
const constructBookResponse = async (book: HydratedDocument<Book>): Promise<BookResponse> => {
  const bookCopy: Book = {
    ...book.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  //TODO
  // const author = await UserCollection.findOneByUserId(bookCopy.author);
  // const username = author.username;
  // delete bookCopy.author;

  const firstPage = bookCopy.firstPage as unknown as string;

  const pages = await PageCollection.findAllByBookId(book._id);

  const pageResponses = [];
  for (const page of pages) {
    pageResponses.push(await constructPageResponse(page));
  }

  // delete bookCopy.sharedWith;
  delete bookCopy.firstPage
  return {
    ...bookCopy,
    _id: bookCopy._id.toString(),
    author: bookCopy.author.toString(),
    firstPage,
    pages: pageResponses
  };
};

export {
  constructBookResponse
};
