import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Book} from '../book/model';
import type {Page} from '../page/model';

/**
 * This file defines the properties stored in a Connection
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Connection on the backend
export type Connection = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  parent: Types.ObjectId;
  child: Types.ObjectId;
  text: string;
  book: Types.ObjectId;
};

export type PopulatedConnection = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  parent: Page;
  child: Page;
  text: string;
  book: Book;
}

// Mongoose schema definition for interfacing with a MongoDB table
// Connections stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ConnectionSchema = new Schema({
  // The connection's parent
  parent: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The connection's child
  child: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The connecting text
  text: {
    type: String,
    required: true
  },
  // 
  book: {
    type: Schema.Types.ObjectId,
    required: true
  },
});

const ConnectionModel = model<Connection>('Connection', ConnectionSchema);
export default ConnectionModel;
