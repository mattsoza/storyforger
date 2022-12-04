import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from 'server/user/collection';
import BookCollection from '../book/collection';


/**
* Checks if a book with bookId in req.params exists
*/
const isBookExists = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.query.bookId ? req.query.bookId : req.params.bookId;
    const validFormat = Types.ObjectId.isValid(bookId as string);
    const book = validFormat ? await BookCollection.findOneByBookId(bookId as string) : '';
    if (!book) {
      res.status(404).json({
        error: {
          bookNotFound: `Book with book ID ${req.params.bookId} does not exist.`
        }
      });
      return;
    }
   
    next();
   };

/**
 * Checks if a bookname in req.body is valid, that is, it matches the bookname regex
 */
const isValidTitle = (req: Request, res: Response, next: NextFunction) => {
//   const booknameRegex = /^\w+$/i;
//   if (!booknameRegex.test(req.body.bookname)) {
//     res.status(400).json({
//       error: 'Bookname must be a nonempty alphanumeric string.'
//     });
//     return;
//   }
  next();
};

const isAuthorizedReader = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.query.bookId ? req.query.bookId : req.params.bookId;
    const book = await BookCollection.findOneByBookId(bookId as string);
    const authorId = req.session.userId;
    const author = await UserCollection.findOneByUserId(authorId);
    if (!book.public && book.author._id !== author._id){ //private and not author
        res.status(404).json({
            error: {
              inValidUser: `User is NOT allowed access to this book`
            }
          });
          return;
    }
      next();
    };

const isBookAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.query.bookId ? req.query.bookId : req.params.bookId;
    const authorId = req.session.userId;
    const author = await UserCollection.findOneByUserId(authorId);
    const book = await BookCollection.findOneByBookId(bookId as string);
    if (book.author._id !== author._id){ 
        res.status(404).json({
            error: {
              inValidUser: `Logged in User is NOT the author of the book.`
            }
          });
          return;
    }

      next();
    };



export {
  isAuthorizedReader,
  isBookExists,
  isBookAuthor
};
