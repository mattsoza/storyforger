import type {Request, Response} from 'express';
import express from 'express';
import PageCollection from './collection';
import * as userValidator from '../user/middleware';
import * as util from './util';
import PageModel from './model';

const router = express.Router();

router.get(
  '/:pageId',
  [],
  async (req: Request, res: Response) => {
    const page = await PageCollection.findOneByPageId(req.params.pageId);
    res.status(200).json({
      message: 'Page found.',
      page: await util.constructPageResponse(page)
    });
  }
);

router.post(
  '/:bookId',
  [],
  async (req: Request, res: Response) => {
    console.log("creating new page");
    const page = await PageCollection.addOne(req.params.bookId, req.session.userId);
    console.log("our new page!", page);

    res.status(200).json({
      message: 'Page created.',
      page: await util.constructPageResponse(page)
    });
  }
);

router.delete(
  '/:pageId',
  [],
  async (req: Request, res: Response) => {
    const deleted = await PageCollection.deleteOne(req.params.pageId);
    res.status(200).json({
      message: 'Page deleted.'
    });
  }
);

router.patch(
  '/:pageId',
  [
    util.upload.single('image')
  ],
  async (req: Request, res: Response) => {
    let imageUrl: string = null;
    if (req.body.image) {
      console.log((req.body.image as string).slice(0,1000));
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.pageId,
        Body: req.body.image,
        ACL: "public-read-write", // permissions to get the public link
        ContentType: "image/jpeg" // define the image content-type to view the photo in the browser with the link
      };
      try {
        const response = await util.s3.upload(params).promise();
        imageUrl = response.Location;
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: error
        });
      }
    }
    const pageDetails = {
      title: req.body.title,
      text: req.body.text,
      imageUrl: imageUrl
    };
    const page = await PageCollection.updateOne(req.params.pageId, pageDetails);
    res.status(200).json({
      message: 'Page updated.',
      page: await util.constructPageResponse(page)
    });
  }
);

export {router as pageRouter};
