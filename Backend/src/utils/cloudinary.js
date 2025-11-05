import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError.js";
import { connectCloudinary } from "../config/cloudinaryConfig.js";

const extractPublicId = (imageUrl) => {
  //   const publicId = imageUrl.split("/")[7].split(".")[0];
  const parts = imageUrl.split("/");
  const lastPart = parts[parts.length - 1];
  const publicId = lastPart.split(".")[0];
  return publicId;
};

export const uploadToCloudinary = async (filepath) => {
  try {
    await connectCloudinary();
    if (!filepath) throw new ApiError(404, "File path is required for upload");

    const result = await cloudinary.uploader.upload(filepath);

    fs.unlinkSync(filepath); // Remove the file after upload

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    throw new ApiError(500, "Error uploading file to Cloudinary");
  }
};

export const deleteFromCloudinary = async (filepath) => {
  try {
    const publicId = extractPublicId(filepath);

    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.log(`The error occured while deleting image:
      ${error}`);
  }
};
