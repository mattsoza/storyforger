// S3/image code from https://aws.plainenglish.io/how-to-upload-photos-to-amazon-s3-bucket-using-node-js-b567188a662a
import multer from 'multer';
import Aws from 'aws-sdk';
import type {Page} from './model';
require("dotenv/config")


// creating the storage variable to upload the file and providing the destination folder, 
// if nothing is provided in the callback it will get uploaded in main directory

const storage = multer.memoryStorage();

// below variable is define to check the type of file which is uploaded

const filefilter = (_req: any, file: { mimetype: string; }, cb: (arg0: any, arg1: boolean) => void) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
        console.log(file.mimetype + " rejected");
    }
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET
});

export {
    upload,
    s3
};