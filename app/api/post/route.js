import { connectDB } from "@/app/lib/connectDb";
import Post from "@/app/Models/Post";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  // Check if the request method is POST
  if (request.method === "POST") {
    try {
      // Parse the JSON body of the request
      const { userId, title, images, showPublic } = await request.json();
      console.log("Received data:", { userId, title, images, showPublic });
      // Connect to the database
      await connectDB();

      // Create a new post
      const newPost = await Post.create({
        userId,
        title,
        images,
        showPublic,
      });

      // Return a successful response with the new post ID
      return new NextResponse(
        JSON.stringify({
          message: `Post with ID ${newPost._id} is created successfully`,
        }),
        { status: 201 } // Use 201 Created status
      );
    } catch (err) {
      console.error(err); // Log error for debugging
      return new NextResponse(JSON.stringify({ message: err.message }), {
        status: 500,
      });
    }
  } else {
    // Return an error for unsupported methods
    return new NextResponse("Method is not allowed", { status: 405 });
  }
};
