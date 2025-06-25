const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dpcxpouvs',
  api_key: '283272198963122',
  api_secret: 'dVpKw1De3Dg96VkLzvtrqboIyz8',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'moodboards', // Optional folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

module.exports = upload;
