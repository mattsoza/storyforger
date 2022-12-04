import type {HydratedDocument, Types} from 'mongoose';
import PageCollection from '../page/collection';
import PageModel from '../page/model';
import type {Book} from './model';
import BookModel from './model';

/**
 * This file contains a class with functionality to interact with books stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Book> is the output of the BookModel() constructor,
 * and contains all the information in Book. https://mongoosejs.com/docs/typescript.html
 */
class BookCollection {
  /**
   * Add a new book
   *
   * @param {string} bookname - The bookname of the book
   * @param {string} password - The password of the book
   * @return {Promise<HydratedDocument<Book>>} - The newly created book
   */
  static async addOne(title: string, summary: string, author: Types.ObjectId|string): Promise<HydratedDocument<Book>> {
    const dateCreated = new Date(); //TODO: delete if we don't add date aspect
    const book = new BookModel({title, summary, author, public: false});
    await book.save(); // Saves book to MongoDB
    return book;
  }

  /**
   * Find a book by bookId.
   *
   * @param {string} bookId - The bookId of the book to find
   * @return {Promise<HydratedDocument<Book>> | Promise<null>} - The book with the given bookname, if any
   */
  static async findOneByBookId(bookId: Types.ObjectId | string): Promise<HydratedDocument<Book>> {
    return BookModel.findOne({_id: bookId});
  }

  /**
   * Find all books by authorId
   * 
   * @param {string} authorId - the userId of the person whose books we are fetching
   * @return {Promise<HydratedDocument<Book>[]> | Promise<[]>} - A list of books by the given author, if any
   */
  static async findAllByAuthorId(authorId: Types.ObjectId | string): Promise<Array<HydratedDocument<Book>>> {
    return BookModel.find({authorId});
  }

  /**
   * Update book's information
   *
   * @param {string} bookId - The bookId of the book to update
   * @param {Object} bookDetails - An object with the book's updated credentials
   * @return {Promise<HydratedDocument<Book>>} - The updated book
   */
  static async updateOne(bookId: Types.ObjectId | string, bookDetails: {title?: string; summary?: string; public?:boolean; changingFirstPage?: boolean; firstPage?: Types.ObjectId|string}): Promise<HydratedDocument<Book>> {
    //TODO: see if there's a more efficient way to update the first page
    const book = await BookModel.findOne({_id: bookId});
    if (bookDetails.title) {
      book.title = bookDetails.title;
    }

    if (bookDetails.summary) {
      book.summary = bookDetails.summary;
    }

    if (bookDetails.public) {
        book.public = bookDetails.public;
    }

    if (bookDetails.changingFirstPage) {
      const page = await PageCollection.findOneByPageId(bookDetails.firstPage);
      book.firstPage = page._id;
    }

    await book.save();
    return book;
  }

  /**
   * Delete a book from the collection.
   *
   * @param {string} bookId - The bookId of book to delete
   * @return {Promise<Boolean>} - true if the book has been deleted, false otherwise
   */
  static async deleteOne(bookId: Types.ObjectId | string): Promise<boolean> {
    const book = await BookModel.deleteOne({_id: bookId});
    return book !== null;
  }

  /**
   * Deletes all books from author
   * 
   * @param {string} authorId
   * @return {Promise<Boolean>}
   */
  static async deleteAllByAuthor(authorId: Types.ObjectId | string): Promise<boolean> {
    const book = await BookModel.deleteMany({authorId});
    return book !== null;
  }
}

export default BookCollection;
