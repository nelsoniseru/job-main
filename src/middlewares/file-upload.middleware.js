import multer from "multer";

const storageConfig = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null, 'public/resumes/')
    }, 
    filename: (req, file, cb) => {
        const fileName = Date.now()+"-"+file.originalname;
        cb(null, fileName)
    }
});

export const uploadFile = multer({
    storage: storageConfig,
});