import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Book
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Book on the backend
export type Book = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  author: Types.ObjectId; //user
  title: string;
  summary: string;
  sharedWith: [Types.ObjectId]; //TODO: how to have set of users 
  public: boolean;
  firstPage: Types.ObjectId |string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Books stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const BookSchema = new Schema({
  // The book's bookname
  title: {
    type: String,
    required: true
  },
  // The book's password
  author: {
    type: Types.ObjectId,
    required: true
  },
  // The date the book joined
  summary: {
    type: String,
    required: false
  },
  sharedWith:{
    type: Array<Types.ObjectId>,
    required: false
  },

  public: {
    type: Boolean,
    required: true
  },

  firstPage:{
    type: Types.ObjectId,
    required: false
  }

});

const BookModel = model<Book>('Book', BookSchema);
export default BookModel;
