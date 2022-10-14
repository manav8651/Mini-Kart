import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'


const authUser = asyncHandler(async(req, res)=>{
    const { email, password } = req.body

    // res.send({email, password})
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid')
    }
})



const registerUser = asyncHandler(async(req, res)=>{
    const { name, email, password } = req.body

    // res.send({email, password})
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User exists")
    }
    const user = await User.create({
        name, 
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error("Inavlid data")
    }
})


const getUserProfile = asyncHandler(async(req, res)=>{
    
    // res.send("Success")
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // token: generateToken(user._id),
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser, getUserProfile, registerUser
}