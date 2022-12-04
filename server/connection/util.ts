import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Connection} from './model';
import ConnectionCollection from './collection';
import UserCollection from '../user/collection';
import PageCollection from '../page/collection';
import BookCollection from '../book/collection';

// Update this if you add a property to the Connection type!
type ConnectionResponse = {
  _id: string;
  parent: string; //user
  child: string;
  text: string;
  book: string;
  author: string;
};

/**
 * Transform a raw Connection object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Connection>} connection - A connection object
 * @returns {ConnectionResponse} - The connection object without the password
 */
const constructConnectionResponse = async (connection: HydratedDocument<Connection>): Promise<ConnectionResponse> => {
  const connectionCopy: Connection = {
    ...connection.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  //TODO
  const author = await UserCollection.findOneByUserId(connectionCopy.author);
  const parentPage = await PageCollection.findOneByPageId(connectionCopy.parent);
  const childPage = await PageCollection.findOneByPageId(connectionCopy.child);
  const bookItem = await BookCollection.findOneByBookId(connectionCopy.book);
  const username = author.username;
  const parent = parentPage._id as unknown as string;
  const child = childPage._id as unknown as string;
  const book = bookItem._id as unknown as string;
  delete connectionCopy.author;
  delete connectionCopy.parent;
  delete connectionCopy.child;
  delete connectionCopy.book;

  return {
    ...connectionCopy,
    _id: connectionCopy._id.toString(),
    author: username,
    parent,
    child,
    book
  };
};

export {
  constructConnectionResponse
};
