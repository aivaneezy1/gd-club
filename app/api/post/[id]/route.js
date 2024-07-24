import { connectDB } from "@/app/lib/connectDb";
import Post from "@/app/Models/Post";
import { NextResponse } from "next/server";
export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connectDB();
    const posts = await Post.findOne({
      _id: id,
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error("Database connection error: ", err);
    return new NextResponse(
      "Error in connecting to the database " + err.message,
      { status: 500 }
    );
  }
};
