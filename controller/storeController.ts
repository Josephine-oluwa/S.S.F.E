import {prismaClient} from "@prisma/client"
import {Request, Response} from "express" 
import {HTTP} from "../Error/mainError"
import cloudinary from "../utils/cloudinary"

export const readProduct = async (req: Request, res: Response) => {
    try {
        // const product = await prismaClient.store.findmany({});
        return res.status(HTTP.OK).json({
            message: "view products",
            // data: products
        })
    } catch (error) {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "error"
        })
    }
}
export const createProduct = async (req: Request, res: Response) => {
    try {
        const {title, cost} = req.body

        const image = await cloudinary.uploader.upload(req.filter.path)

        const product = await prisma.store.create({
            data: {title, cost, image: image.secure_url}
        })
        return res.status(HTTP.CREATED).json({
            message: "create products",
            data: products
        })
    } catch (error) {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "Error"
        })
    }
}