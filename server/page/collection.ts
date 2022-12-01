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
   * @param {string} pagename - The pagename of the page
   * @param {string} password - The password of the page
   * @return {Promise<HydratedDocument<Page>>} - The newly created page
   */
  static async addOne(title: string, summary: string, author: Types.ObjectId|string): Promise<HydratedDocument<Page>> {
    const dateCreated = new Date(); //TODO: delete if we don't add date aspect
    const page = new PageModel({title, summary, author, public: false});
    await page.save(); // Saves page to MongoDB
    return page;
  }

  /**
   * Find a page by pageId.
   *
   * @param {string} pageId - The pageId of the page to find
   * @return {Promise<HydratedDocument<Page>> | Promise<null>} - The page with the given pagename, if any
   */
  static async findOneByPageId(pageId: Types.ObjectId | string): Promise<HydratedDocument<Page>> {
    return PageModel.findOne({_id: pageId});
  }

  /**
   * Find all pages by authorId
   * 
   * @param {string} authorId - the userId of the person whose pages we are fetching
   * @return {Promise<HydratedDocument<Page>[]> | Promise<[]>} - A list of pages by the given author, if any
   */
  static async findAllByAuthorId(authorId: Types.ObjectId | string): Promise<Array<HydratedDocument<Page>>> {
    return PageModel.find({authorId});
  }

  /**
   * Update page's information
   *
   * @param {string} pageId - The pageId of the page to update
   * @param {Object} pageDetails - An object with the page's updated credentials
   * @return {Promise<HydratedDocument<Page>>} - The updated page
   */
  static async updateOne(pageId: Types.ObjectId | string, pageDetails: {title?: string; text?: string; public?:boolean; changingFirstPage?: boolean; firstPage?: Types.ObjectId|string}): Promise<HydratedDocument<Page>> {
    //TODO: see if there's a more efficient way to update the first page
    const page = await PageModel.findOne({_id: pageId});
    if (pageDetails.title) {
      page.title = pageDetails.title;
    }

    if (pageDetails.text) {
      page.text = pageDetails.text;
    }

    // if (pageDetails.public) {
    //     page.public = pageDetails.public;
    // }

    // if (pageDetails.changingFirstPage) {
    //   page.firstPage = pageDetails.firstPage;
    // }

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
    return page !== null;
  }

  /**
   * Deletes all pages from author
   * 
   * @param {string} authorId
   * @return {Promise<Boolean>}
   */
  static async deleteAllByAuthor(authorId: Types.ObjectId | string): Promise<boolean> {
    const page = await PageModel.deleteMany({authorId});
    return page !== null;
  }
}

export default PageCollection;
