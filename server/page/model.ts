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
  text: string;
//   image: 
  author: Types.ObjectId;
  book: Types.ObjectId;
};

export type PopulatedPage = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  title: string;
  text: string;
  author: User;
  book: Book;
}

// Mongoose schema definition for interfacing with a MongoDB table
// Pages stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const PageSchema = new Schema({
  // The page's parent
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The page's child
  title: {
    type: String,
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

const PageModel = model<Page>('Page', PageSchema);
export default PageModel;
