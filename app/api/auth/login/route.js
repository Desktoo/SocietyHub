import { connectToDB } from "@/libs/database";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { signJWT } from "@/libs/JWT";

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Generate JWT token with user information
    const token = signJWT({
      id: user._id,
      email: user.email,
      userName: user.userName,
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Failed to login" }), {
      status: 500,
    });
  }
};
