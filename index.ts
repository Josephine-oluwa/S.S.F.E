import express, { Application } from "express"

const port = 3355
const app: Application = express()

app.listen(port, ()=> {
    console.log()
    console.log("server connected")
})

process.on("uncaughtException", (error: any)=> {
    console.log("error due to uncaught Exception")
    console.log(error)
})

process.on("unhandledRejection", (reason: any)=> {
    console.log("error due to unhandled rejection")
    console.log(reason)
})