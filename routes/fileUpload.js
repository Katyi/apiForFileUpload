const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const sizeOf = require('image-size');

const imageUploadPath = '/var/www/fileUpload/uploaded_files/media';

// For local testing
// const imageUploadPath = 'assets/images';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/image-upload', upload.single('file'), (req, res) => {
  const fileName = req.file.filename;
  const filePath = `${imageUploadPath}/${fileName}`;
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const dimensions = sizeOf.default(fileBuffer);
    // console.log(dimensions.width, dimensions.height);
    res.status(200).json({
      message: `File uploaded successfully: ${fileName}`,
      width: dimensions.width,
      height: dimensions.height,
      fileName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/image-delete', (req, res) => {
  const fileName = req.body.fileName;
  fs.unlink(imageUploadPath + '/' + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not delete the file. ' + err,
      });
    }
    res.status(200).send({
      message: 'File is deleted.',
    });
  });
});

module.exports = router;
