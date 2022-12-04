import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Book} from '../book/model';

/**
 * This file defines the properties stored in a Page
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Page on the backend
export type Page = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  title: string;
  bookId: Types.ObjectId;
  text: string;
  imageUrl: string;
};

// export type PopulatedPage = {
//   _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
//   title: string;
//   text: string;
//   book: Book;
// }

// Mongoose schema definition for interfacing with a MongoDB table
// Pages stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const PageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  bookId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  }
});

const PageModel = model<Page>('Page', PageSchema);
export default PageModel;
