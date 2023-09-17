import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import bcrypt, { genSalt } from "bcrypt"
import {PrismaClient} from "@prisma/client"
import { role } from "../utils/role"
import { sendAccountOpeningMail } from "../utils/email"


const prisma = new PrismaClient()

export const registerAccount = async(res: Response, req: Request)=> {
try {
    const {userName, email, password} = req.body;

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const value = crypto.randomBytes(16).toString("hex")
    const token = jwt.sign(value, "justRand");

    const user = await prisma.authModel.create({
        data: {
           userName,
           email, 
           password: hash,
           token,
           role: role.USER
        }
    })

    const tokenID = jwt.sign({id: user.id}, "justRand");
    sendAccountOpeningMail(user, tokenID);

    return res.status(201).json({
        message: "Account created",
        data: user,
    })
} catch (error) {
    return res.status(404).json({
        message: "Error creating Account"
    })
}
}


export const registerAdminAccount = async (req: Request, res: Response)=> {
    try {
        const {userName, email, password, adminSecret} = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const value = crypto.randomBytes(16).toString("hex")
        const token = jwt.sign(value, "justRand");

        const user = await prisma.authModel.create({
            data: {
                userName,
                email,
                password: hash,
                adminSecret: hash,
                token,
                role: role.ADMIN
            }
        })
        return res.status(200).json({
            message: "Admin Account Created",
            data: user
        })
    } catch (error){
        return res.status(404).json({
            message: "Error creating Account",
            data: error
        })
    }
}


export const viewAccounts = async(req: Request, res: Response)=> {
    try {
        const user = await prisma.authModel.findMany({})
        console.log("reading");
        return res.status(200).json({
            message: "Account found",
            data: user
        })
    } catch (error){
        return res.status(404).json({
            message: "Error viewing Accounts",
            data: error
        })
    }
}

export const viewAccount = async(req: Request, res: Response) => {
    try {
        const userID = req.params
        const user = await prisma.authModel.findUnique({
            where : {Id : userID}
        })

        return res.status(200).json({
            message: "Account found",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            messgae: "Error viewing Accounts",
            data: error
        })
    }
}

export const signInAccount = async (req: Request, res: Response)=> {
    try {
        const {email, password} = req.body
        
        const user = await prisma.authModel.findUnique({
            where: {email}
        })
        if (user) {
            const check = await bcrypt.compare(password, user.password);

            if(check){
                if (user.verified && user.token === "") {
                const token = jwt.sign(
                    {
id: user.id
                    },
                    "secret",
                    {expressIn: 3d}
                );
                        return res.status(200).json({
                            message: "welcome back"
                            user: token
                        })
                    
                }
            }
        }
    } catch (error){

    }
}