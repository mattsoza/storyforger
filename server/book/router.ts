import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import BookCollection from './collection';
import * as bookValidator from './middleware';
import * as userValidator from '../user/middleware';
import * as util from './util';
import * as pageUtil from '../page/util';
import BookModel from './model';
import PageCollection from '../page/collection';

const router = express.Router();

/**
 * Get a list of all books
 *
 * @name GET /api/book
 *
 * @return - 
 */
/**
 * Get a single book
 * 
 * @name Get /api/book/bookId
 * 
 * @return - single book object
 */
router.get(
  '/',
  [],
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.bookId !== undefined){
        next();
        return;
    }
    const user = req.session.userId;

    //Getting all books
    //if user is logged in, list all books made by user
    //TODO
    const books = await BookCollection.findAllByAuthorId(user);
    const response = await books.map(util.constructBookResponse);
    res.status(200).json(response);
    
  },
  [bookValidator.isAuthorizedReader], //isAuthorizedReader (either user is logged in and is author/shared OR book is public), isValidBook
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.query.bookId as string;
    const book = await BookCollection.findOneByBookId(bookId);
    const pages = await PageCollection.findAllByBookId(bookId);
    res.status(200).json({
      message: 'Your session info was found successfully.',
      book: book ? await util.constructBookResponse(book) : null,
      pages: pages ? pages.map(pageUtil.constructPageResponse): null
    });
  }
);

/**
 * Create New Book
 *
 * @name POST /api/book
 *
 * @param {string} title - The book's summary
 * @param {string} summary - The book's summary
 * @param {}
 *
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    // bookValidator.isValidTitle,
    // bookValidator.isValidSummary,
  ],
  async (req: Request, res: Response) => {
    const book = await BookCollection.addOne(
      req.body.title, req.body.summary, req.session.userId
    ); 

    res.status(201).json({
      message: 'You have logged in successfully',
      book: await util.constructBookResponse(book)
    });
  }
);

/**
 * Delete a book
 *
 * @name DELETE /api/book/session
 *
 * @return - None
 * @throws {403} - If book is not logged in
 *
 */
router.delete(
  '/bookId',
  [
    bookValidator.isBookAuthor,
    bookValidator.isBookExists
  ],
  async (req: Request, res: Response) => {
    const bookId = req.query.bookId ? req.query.bookId : req.params.bookId;
    const deleted = await BookCollection.deleteOne(bookId as string);
    if (!deleted){
        res.status(400).json({
            message: 'Unable to delete book'
        });
        return;
    }
    res.status(200).json({
      message: 'You have been logged out successfully.'
    });
  }
);


/**
 * Update a book's profile.
 *
 * @name PATCH /api/book
 *
 * @param {string} bookId -
 * @param {string?} title?
 * @param {string?} summary?
 * @param {string?} public?
 * @throws 
 */
router.patch(
  '/',
  [
    userValidator.isUserLoggedIn,
    bookValidator.isBookExists,
    bookValidator.isBookAuthor
  ],
  async (req: Request, res: Response) => {
    const bookId = (req.body.bookId as string) ?? ''; 
    const book = await BookCollection.updateOne(bookId, req.body);
    res.status(200).json({
      message: 'Your book was updated successfully.',
      book: await util.constructBookResponse(book)
    });
  }
);

// /**
//  * Gets the bookId of a book if they exist, or null if they don't
//  *
//  * @name GET /api/book/:bookname
//  *
//  * @return {ObjectId} - The bookId of a book if they exist, or null if they don't
//  */
// router.get(
//   '/:bookId',
//   [],
//   async (req: Request, res: Response) => {
//     const book = await BookModel.findOne({bookId: req.params.bookId});
//     res.status(200).json(book !== null ? book._id : null);
//   }
// );

// export {router as bookRouter};
export {router as bookRouter};
