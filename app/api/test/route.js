import { connectDB } from "@/app/lib/connectDb";
import User from "@/app/Models/User";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    // Connect to the database
    await connectDB();

    // Query all users from the User model
    const users = await User.find({}).lean(); // Convert to plain JavaScript objects

    // Stringify the result to JSON
    const responseBody = JSON.stringify(users);

    // Return the response with status 200
    return new NextResponse(responseBody, { status: 200 });
  } catch (err) {
    // Log the error
    console.error("Database connection error: ", err);

    // Return an error response with status 500
    return new NextResponse(
      "Error in connecting to the database " + err.message,
      { status: 500 }
    );
  }
};
