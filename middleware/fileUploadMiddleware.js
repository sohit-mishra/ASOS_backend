const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/profile_pictures',
    filename : (req,res,next)=>{
        cb(null,file.filename+'-'+Date.now()+path.extname(file.originalname));
    }
})


const checkFileType = (file,cb)=>{
    const filetypes = /jpeg|jpg|png/;
    const extname = file.types.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error: Images Only!');
    }
};

const upload = multer({
    storage,
    limits : {
        fileSize: 1000000 
    },
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb);
    }
}).single('profilePicture');

module.exports = upload;