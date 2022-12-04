import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ConnectionCollection from './collection';
import PageCollection from '../page/collection';
import BookCollection from '../book/collection';

/**
 * Checks if a connection with connectionId is req.params exists
 */
const isConnectionExists = async (req: Request, res: Response, next: NextFunction) => {
  var connectionId= req.params.connectionId;
  if (!connectionId){ 
    connectionId = req.query.connectionId as string;
  }
  if (!connectionId){ 
    connectionId = req.body.connectionId as string;
  }
  // console.log("our connection id is", connectionId);
  const validFormat = Types.ObjectId.isValid(connectionId);
  const connection = validFormat ? await ConnectionCollection.findOneByConnectionId(connectionId) : '';
  if (!connection) {
    res.status(404).json({
      error: `Connection with connection ID ${req.params.connectionId} does not exist.`
    });
    return;
  }

  next();
};

/**
 * Checks if the parent and child pages exist
 */
const isValidConnectionContent = async (req: Request, res: Response, next: NextFunction) => {
  const {parent, child} = req.body as {parent: string, child:string};
  //TODO: reflect, is this the best way to do this? or is it better if we more directly findpage from 
  //the page collection and make sure it's not null??
  const parentPage = await PageCollection.findOneByPageId(parent);
  const childPage = await PageCollection.findOneByPageId(child);
  if (!parentPage || !childPage){
    res.status(400).json({
      error: `Al least one of the pages you are trying to link does not exist.`
    });
    return;
  }

  next();
};

/**
 * Can user edit/delete connection with connectionId
 */
const isValidConnectionModifier = async (req: Request, res: Response, next: NextFunction) => {
  const connectionId = req.params.connectionId;
  const userId = req.session.userId;
  const connection = ConnectionCollection.findOneByConnectionId(connectionId);
  const connectionAuthor = (await connection).author as unknown as string;
  if (connectionAuthor!==userId){
    res.status(401).json({
      error: `Signed in User cannot modify connections for this book`
    });
    return;
  }
  next();
};

const isValidBookOrPage = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.query.bookId;
  const pageId = req.query.pageId;
  const page = PageCollection.findOneByPageId(pageId as string);
  const book = BookCollection.findOneByBookId(bookId as string);
  if(!page && !book){
    res.status(400).json({
      error: `You did not provide a valid book or page id`
    });
    return;
  }
  next();
};

const isValidPage = async (req: Request, res: Response, next: NextFunction) => {
  const pageId = req.query.pageId;
  const page = await PageCollection.findOneByPageId(pageId as string);
  if (!page){
    res.status(400).json({
      error: `Page does not exist.`
    });
    return;
  }
  next();
};


const isValidParentChildPage = async (req: Request, res: Response, next: NextFunction) => {
  const parentId = req.body.parent;
  const childId = req.body.child;
  const parentPage =  await PageCollection.findOneByPageId(parentId as string);
  const childPage =  await PageCollection.findOneByPageId(childId as string);
  if (!parentPage || !childPage){
    res.status(400).json({
      error: `At least one of pages you are trying to connect does not exist.`
    });
    return;
  }
  const parentBook = parentPage.bookId._id;
  const childBook = childPage.bookId._id;
  const book = await BookCollection.findOneByBookId(parentBook);
  const bookAuthor = book.author._id as unknown as string;
  const userId = req.session.userId as string;
  if (parentBook!==childBook || bookAuthor!==userId){
    res.status(401).json({
      error: `This user cannot link these two pages together. Make sure user is author of this book.`
    })
  }
  next();
};



export {
  isValidConnectionContent,
  isConnectionExists,
  isValidConnectionModifier,
  isValidBookOrPage,
  isValidParentChildPage,
  isValidPage
};