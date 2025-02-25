const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const imageUploadPath = '/var/www/fileUpload/media';
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
  try {
    res
      .status(200)
      .json({ message: `File uploaded successfully: ${fileName}` });
  } catch (error) {
    res.status(500).json({ error: error });
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
