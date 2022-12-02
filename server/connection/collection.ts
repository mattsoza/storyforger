import type {HydratedDocument, Types} from 'mongoose';
import type {Connection} from './model';
import ConnectionModel from './model';
import PageCollection from '../page/collection';

/**
 * This file contains a class with functionality to interact with connections stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Connection> is the output of the ConnectionModel() constructor,
 * and contains all the information in Connection. https://mongoosejs.com/docs/typescript.html
 */
class ConnectionCollection {
  /**
   * Add a new connection
   *
   * @param 
   * @return {Promise<HydratedDocument<Connection>>} - The newly created connection
   */
  static async addOne(parent: Types.ObjectId|string, child: Types.ObjectId|string, text: string): Promise<HydratedDocument<Connection>> {
    const connection = new ConnectionModel({parent, child, text});
    await connection.save(); // Saves connection to MongoDB
    return connection;
  }

  /**
   * Find a connection by connectionId.
   *
   * @param {string} connectionId - The connectionId of the connection to find
   * @return {Promise<HydratedDocument<Connection>> | Promise<null>} - The connection with the given connectionname, if any
   */
  static async findOneByConnectionId(connectionId: Types.ObjectId | string): Promise<HydratedDocument<Connection>> {
    return ConnectionModel.findOne({_id: connectionId});
  }

  /**
   * Find all connections from a specific page
   * 
   * @param {string} parent - the starting point of the connections we are fetching
   * @return {Promise<HydratedDocument<Connection>[]> | Promise<[]>} - A list of connections from parent page to another page
   */
  static async findAllByParent(parent: Types.ObjectId | string): Promise<Array<HydratedDocument<Connection>>> {
    return ConnectionModel.find({parent});
  }

  /**
   * Find all connections in book
   * 
   * @param {string} bookId - the id of the book
   * @return {Promise<Array<HydratedDocument<Connection>>>} - A list of connections in the book
   */
  static async findAllByBook(bookId: Types.ObjectId | string) :Promise<Array<HydratedDocument<Connection>>> {
    return ConnectionModel.find({bookId});
  }

  /**
   * Update connection's information
   *
   * @param {string} connectionId - The connectionId of the connection to update
   * @param {Object} connectionDetails - An object with the connection's updated credentials
   * @return {Promise<HydratedDocument<Connection>>} - The updated connection
   */
  static async updateOne(connectionId: Types.ObjectId | string, connectionDetails: {text?: string; child?: Types.ObjectId | string}): Promise<HydratedDocument<Connection>> {
    //TODO: see if there's a more efficient way to update the first page
    const connection = await ConnectionModel.findOne({_id: connectionId});
    if (connectionDetails.text) {
      connection.text = connectionDetails.text;
    }

    if (connectionDetails.child) {
      const child = await PageCollection.findOneByPageId(connectionDetails.child);
      connection.child = child._id;
    }

    await connection.save();
    return connection;
  }

  /**
   * Delete a connection from the collection.
   *
   * @param {string} connectionId - The connectionId of connection to delete
   * @return {Promise<Boolean>} - true if the connection has been deleted, false otherwise
   */
  static async deleteOne(connectionId: Types.ObjectId | string): Promise<boolean> {
    const connection = await ConnectionModel.deleteOne({_id: connectionId});
    return connection !== null;
  }

  /**
   * Deletes all connections from author
   * 
   * @param {string} authorId
   * @return {Promise<Boolean>}
   */
  static async deleteAllByAuthor(authorId: Types.ObjectId | string): Promise<boolean> {
    const connection = await ConnectionModel.deleteMany({authorId});
    return connection !== null;
  }

    /**
   * Deletes all connections from author
   * 
   * @param {string} book
   * @return {Promise<Boolean>}
   */
     static async deleteAllByBook(book: Types.ObjectId | string): Promise<boolean> {
        const connection = await ConnectionModel.deleteMany({book});
        return connection !== null;
      }
}

export default ConnectionCollection;
