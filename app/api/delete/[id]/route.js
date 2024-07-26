import { connectDB } from "@/app/lib/connectDb";
import Post from "@/app/Models/Post";
import { NextResponse } from "next/server";

// DELETE IMAGES FROM ALBUM
export const PATCH = async (request, { params }) => {
  const { id } = params;
  const { imagesToRemove } = await request.json();

  try {
    await connectDB();

    // Check if imagesToRemove is an array
    if (Array.isArray(imagesToRemove)) {
      // Fetch the post to confirm the images field is an array
      const post = await Post.findById(id);
      if (!post) {
        throw new Error("Post not found");
      }

      if (Array.isArray(post.images)) {
        // Perform the $pull operation to remove images
        await Post.findByIdAndUpdate(
          id,
          { $pull: { images: { $in: imagesToRemove } } },
          { new: true }
        );
      } else {
        throw new Error("Images field in database is not an array");
      }
    } else {
      throw new Error("imagesToRemove is not an array");
    }

    // Fetch the updated post
    const updatedPost = await Post.findById(id);

    // Return the updated post as a response
    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error("Error occurred:", err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};

// DELETE THE ENTIRE FOLDER/ALBUM
