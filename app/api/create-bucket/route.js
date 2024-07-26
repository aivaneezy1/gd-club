import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  },
});

export const POST = async (request) => {
  if (request.method === "POST") {
    const { folderName } = await request.json();

    if (!folderName) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }
    const folderKey = `${folderName}/`; // Simulates a folder in S3
    try {
      // Upload an empty object to simulate the folder
      await s3.send(
        new PutObjectCommand({
          Bucket: "gd-pictures",
          Key: folderKey,
          Body: "", // Empty body
          ContentType: "application/x-directory",
        })
      );
      return NextResponse.json(
        { success: true, message: "Created successfully" },
        { status: 200 }
      );
    } catch (err) {
      console.error(`Error creating folder: ${err}`);
      return NextResponse.json(
        { error: "Error creating folder" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
};
