import cloudinary from "./utils/cloudinary";
import streamifier from "streamifier"

const uploadStream = (req: any)=> {
return new Promise(async(resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error: Error, result: any) => {
        if (result){
            return resolve(result)
        } else {
            return reject (error)
        }
    })
    streamifier.createReadStream(req.file.buffer)
})
}

