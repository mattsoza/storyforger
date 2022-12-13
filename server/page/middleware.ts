import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import BookCollection from '../book/collection';
import PageCollection from './collection';

const isNotFirstPage = async (req: Request, res: Response, next: NextFunction) => {
  const pageId = req.params.pageId as string;
  const page = await PageCollection.findOneByPageId(pageId);
  const bookId = page.bookId;
  const book = await BookCollection.findOneByBookId(bookId);
  const firstPageId = book.firstPage.toString();
  if (pageId === firstPageId) {
    res.status(403).json({
        error: `Cannot delete the first page of the book.`
      });
      return;
  }
  next();
};

export {
  isNotFirstPage
}