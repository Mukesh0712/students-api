import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

import Student from "./models/Student.js"

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("Connected to MongoDB");
})

app.get('/health', (req, res) => {
    res.json({
        status: 'Ok',
        message: "All Good"
    })
})

app.post('/create-student', async (req, res) => {
    const { roll, fullName, mobile } = req.body

    const newStudent = new Student({
        roll: roll,
        fullName: fullName,
        mobile: mobile
    })

    const savedStudent = await newStudent.save()

    res.json({
        success: true,
        data: savedStudent
    })

})

app.get('/all-students', async (req, res)=>{
    const students = await Student.find()

    res.json({
        success: true,
        data: students
    })
})

app.post('/find-by-roll', async (req, res)=>{
    const {roll} = req.body
    
    const student = await Student.findOne({
        roll: roll
    })

    res.json({
        success:true,
        data: student
    })

})

app.post('/update-student', async (req, res)=>{
    const {roll, fullName, mobile} = req.body

    const result = await Student.updateOne(
        {
            roll:roll
        },
        {
            fullName: fullName,
            mobile: mobile
        })

        res.json({
            success: true,
            message: "Student Updated Successfully"
        })
})

app.post('/delete-student', async (req, res)=>{
    const {roll} = req.body

    const result = await Student.deleteOne({roll: roll})

    res.json({
        success: true,
        message: "Student Deleted"
    })
})

app.listen(5000, () => {
    console.log("Server Started Running on PORT 5000");
})