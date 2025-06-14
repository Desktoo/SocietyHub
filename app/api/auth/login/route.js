import { connectToDB } from "@/libs/database"
import User from "@/models/userModel"
import bcrypt from "bcrypt"
import { signJWT } from "@/libs/JWT"

export const POST = async (req) => {
  try {
    const { email, password } = await req.json()

    await connectToDB()

    const user = await User.findOne({ email })
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 })
    }

    const token = signJWT({ id: user._id, email: user.email, userName: user.userName })

    return new Response(JSON.stringify({ token }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to login" }), { status: 500 })
  }
}
