import mongoose,{model, Schema} from "mongoose"

const studentSchema = new Schema({
    roll: Number,
    fullName: String,
    mobile: Number
})

const Student = model("Student", studentSchema)

export default Student