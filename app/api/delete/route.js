import { connectDB } from "@/app/lib/connectDb";
import Post from "@/app/Models/Post";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  try {
    const { id } = await request.json();

    await connectDB();
    const folder = await Post.findByIdAndDelete({ _id: id });

    if (!folder) {
      return new NextResponse("Folder not found", { status: 404 });
    }

    return new NextResponse("Post deleted successfully", { status: 200 });
  } catch (err) {
    console.error("Database connection error: ", err);
    return new NextResponse(
      "Error connecting to the database: " + err.message,
      { status: 500 }
    );
  }
};
