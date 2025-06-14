import sendEmail from '../config/sendEmail'
import UserModel from '../model/user.model'
import bcryptjs from 'bcryptjs'


export async function registerUserController(request, response) {

    try {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return response.status(400).json({
                message: 'provide email ,name, password',
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (user) {
            return response.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }

        const salt=await bcryptjs.genSalt(10)
        const hashPassword=await bcryptjs.hash(password,salt)
         

        const payload={
            name,
            email,
            password:hashPassword
        }

        const newUser=new UserModel(payload)
        const save =await newUser.save()

        const verifyemail =await sendEmail({
            sendTo:email,
            subject:"Verify email frim  Blinkeyit"
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}