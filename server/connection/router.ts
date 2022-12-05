import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ConnectionCollection from './collection';
import * as userValidator from '../user/middleware';
import * as connectionValidator from '../connection/middleware';
import * as util from './util';
import PageCollection from '../page/collection';

const router = express.Router();



/**
 *  `GET /api/connection/?bookId=bookId` - Get all connections in book
 * `GET /api/connection/?pageId=pageId` - Get all outgoing connections
 * `GET /api/connection/:connectionId` - Get specific connection
 *
 * @name GET /api/connection
 *
 * @return {ConnectionResponse[]} - A list of all the connections sorted in descending
 *                      order by date modified
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.query.bookId;
    const pageId = req.query.pageId;
    const connectionId = req.params.connectionId;
    if (bookId !== undefined || pageId !== undefined) {
      next();
      return;
    }
    if (connectionId == undefined){
        const response = {message: "Please provide info for which connection you'd like"};
        res.status(400).json(response);
    }
    //Yes connectionId
    const connection = await ConnectionCollection.findOneByConnectionId(connectionId);
    //TODO: if not valid connection, error

    // const allConnections = await ConnectionCollection.findAllByBook(bookId as string);
    // const response = allConnections.map(util.constructConnectionResponse);
    const response = util.constructConnectionResponse(connection);
    res.status(200).json(response);
  },
  [connectionValidator.isValidBookOrPage], 
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.query.bookId;
    const pageId = req.query.pageId;
    if (pageId !=undefined){
        next();
        return;
    }
    //TODO: check that book is valid ig
    //bookId
    const allConnections = await ConnectionCollection.findAllByBook(bookId as string);
    const response = allConnections.map(util.constructConnectionResponse);
    res.status(200).json(response)
  },
  [
    connectionValidator.isValidPage
  ],
  async (req: Request, res: Response) => {
    const pageId = req.query.pageId;
    const authorConnections = await ConnectionCollection.findAllByParent(pageId as string);
    const response = authorConnections.map(util.constructConnectionResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new connection.
 *
 * @name POST /api/connection
 *
 * @body {string} parent - pageId
 * @body {string} child - pageId
 * @body {string} text - text
 * @return {ConnectionResponse} - The created connection
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the connection content is empty or a stream of empty spaces
 * @throws {413} - If the connection content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    // connectionValidator.isValidParentChildPage
  ],
  async (req: Request, res: Response) => {
    console.log("you're posting!!!!")
    const parentId = req.body.parent;
    const childId = req.body.child;
    const text = req.body.text;
    const author = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const parent = await PageCollection.findOneByPageId(parentId);
    const bookId = parent.bookId;
    console.log(" the four things youre adding with", parentId, childId, text, author, bookId, "done");
    const connection = await ConnectionCollection.addOne(parentId, childId, text, author, bookId);

    res.status(201).json({
      message: 'Your connection was created successfully.',
      connection: util.constructConnectionResponse(connection)
    });
  }
);

/**
 * Delete a connection
 *
 * @name DELETE /api/connection/:id
 *
 * @param {string} - connectionId
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the connection
 * @throws {404} - If the connectionId is not valid
 */
router.delete(
  '/:connectionId?',
  [
    userValidator.isUserLoggedIn,
    connectionValidator.isConnectionExists,
    connectionValidator.isValidConnectionModifier
  ],
  async (req: Request, res: Response) => {
    await ConnectionCollection.deleteOne(req.params.connectionId);
    res.status(200).json({
      message: 'Your connection was deleted successfully.'
    });
  }
);

/**
 * Modify a connection
 *
 * @name PATCH /api/connection/:id
 *
 * @body connectionDetails {text?: string, child?: string}
 * @return {ConnectionResponse} - the updated connection
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the connection
 * @throws {404} - If the connectionId is not valid
 * @throws {400} - If the connection content is empty or a stream of empty spaces
 */
router.patch(
  '/:connectionId?',
  [
    userValidator.isUserLoggedIn,
    connectionValidator.isConnectionExists,
    connectionValidator.isValidConnectionModifier,
    // connectionValidator.isValidConnectionContent
  ],
  async (req: Request, res: Response) => {
    const connection = await ConnectionCollection.updateOne(req.params.connectionId, req.body);
    res.status(200).json({
      message: 'Your connection was updated successfully.',
      connection: util.constructConnectionResponse(connection)
    });
  }
);

export {router as connectionRouter};