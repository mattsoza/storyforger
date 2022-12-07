import type {HydratedDocument, Types} from 'mongoose';
import type {Page} from './model';
import PageModel from './model';

//TODO: entire collection.ts. I have not done anything except find and replace "page"

/**
 * This file contains a class with functionality to interact with pages stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Page> is the output of the PageModel() constructor,
 * and contains all the information in Page. https://mongoosejs.com/docs/typescript.html
 */
class PageCollection {
  /**
   * Add a new page
   *
   * @param {Types.ObjectId} bookId - The id of the book to add the page to
   * @return {Promise<HydratedDocument<Page>>} - The newly created page
   */
  static async addOne(bookId: Types.ObjectId | String, authorId: Types.ObjectId | String): Promise<HydratedDocument<Page>> {
    const page = new PageModel({
      title: 'New Page',
      bookId: bookId,
      text: "",
      imageUrl: null,
      authorId: authorId
    });
    await page.save(); // Saves page to MongoDB
    return page;
  }

  /**
   * Find a page by pageId.
   *
   * @param {string} pageId - The pageId of the page to find
   * @return {Promise<HydratedDocument<Page>> | Promise<null>} - The page with the given pageId, if any
   */
  static async findOneByPageId(pageId: Types.ObjectId | string): Promise<HydratedDocument<Page>> {
    return PageModel.findOne({_id: pageId});
  }

  /**
   * Find all pages by bookId
   * 
   * @param {string} bookId - the bookId of the book whose pages we are fetching
   * @return {Promise<HydratedDocument<Page>[]> | Promise<[]>} - A list of pages in the given book, if any
   */
  static async findAllByBookId(bookId: Types.ObjectId | string): Promise<Array<HydratedDocument<Page>>> {
    return PageModel.find({bookId});
  }

  /**
   * Update page's information
   *
   * @param {string} pageId - The pageId of the page to update
   * @param {Object} pageDetails - An object with the page's updated details
   * @return {Promise<HydratedDocument<Page>>} - The updated page
   */
  static async updateOne(
    pageId: Types.ObjectId | string,
    pageDetails: {
      title?: string;
      text?: string;
      imageUrl?: string;
    }): Promise<HydratedDocument<Page>> {
    const page = await PageModel.findOne({_id: pageId});

    if (pageDetails.title) {
      page.title = pageDetails.title;
    }

    if (pageDetails.text) {
      page.text = pageDetails.text;
    }

    if (pageDetails.imageUrl) {
      page.imageUrl = pageDetails.imageUrl;
    }

    await page.save();
    return page;
  }

  /**
   * Delete a page from the collection.
   *
   * @param {string} pageId - The pageId of page to delete
   * @return {Promise<Boolean>} - true if the page has been deleted, false otherwise
   */
  static async deleteOne(pageId: Types.ObjectId | string): Promise<boolean> {
    const page = await PageModel.deleteOne({_id: pageId});
    return page.deletedCount !== 0;
  }

  /**
   * Deletes all pages in book
   * 
   * @param {string} bookId - The bookId of pages to delete
   * @return {Promise<number>} - The number of pages deleted
   */
  static async deleteAllByBookId(bookId: Types.ObjectId | string): Promise<number> {
    const result = await PageModel.deleteMany({bookId: bookId});
    return result.deletedCount;
  }

  /**
   * Deletes all pages from author
   * 
   * @param {string} authorId - The authorId of pages to delete
   * @return {Promise<number>} - The number of pages deleted
   */
  static async deleteAllByAuthorId(authorId: Types.ObjectId | string): Promise<number> {
    const result = await PageModel.deleteMany({authorId: authorId});
    return result.deletedCount;
  }
}

export default PageCollection;
