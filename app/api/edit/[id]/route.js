import { connectDB } from "@/app/lib/connectDb";
import Post from "@/app/Models/Post";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const { id } = params;

  const { images } = await request.json();

  try {
    await connectDB();
    const post = await Post.findById(id);
    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    post.images = [...post.images, ...images];
    const updatedPost = await post.save();

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message, { status: 500 });
  }
};
