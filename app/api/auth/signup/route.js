// ✅ api/auth/signup/route.js
import { connectToDB } from "@/libs/database"
import User from "@/models/userModel"
import bcrypt from 'bcrypt'

export const POST = async (req) => {
  try {
    const { userName, password, email } = await req.json()

    await connectToDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
    })

    await newUser.save()

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to register user" }), { status: 500 })
  }
}
