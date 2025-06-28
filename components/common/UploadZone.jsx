"use client";

import React from "react";
import { UploadDropzone } from "@uploadthing/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const UploadZone = ({ onUploadComplete, onUploadStart, imageUrl }) => {
  return (
    <div className="space-y-2 mb-6">
      <label className="block text-sm font-semibold text-gray-700">
        Product Image <span className="text-red-500">*</span>
      </label>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4 flex justify-center"
          >
            <img
              src={imageUrl}
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-emerald-200 shadow-md"
            />
          </motion.div>
        )}

        <UploadDropzone
          endpoint="imageUploader"
          onBeforeUploadBegin={(files) => {
            const file = files[0];

            if (file.size > 4 * 1024 * 1024) {
              toast.error("File too large!");
              return [];
            }

            return files;
          }}
          onUploadBegin={(name) => {
            onUploadStart(true);
            console.log("Uploading: ", name);
          }}
          onClientUploadComplete={(res) => {
            onUploadStart(false);
            const url = res?.[0]?.url;
            if (url) {
              onUploadComplete(url);
              toast.success("Image uploaded successfully!");
            }
          }}
          onUploadError={(error) => {
            onUploadStart(false);
            console.error("Upload error:", error);
            toast.error("Image upload failed. Please try again.");
          }}
          config={{
            mode: "auto",
          }}
          className="border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition-all duration-200"
          appearance={{
            container: "p-6",
            uploadIcon: "text-emerald-600",
            label: "text-gray-700 font-medium",
            allowedContent: "text-gray-500 text-sm",
            button:
              "bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg ut-ready:bg-emerald-600 ut-uploading:cursor-not-allowed ut-uploading:bg-emerald-400",
          }}
        />
      </motion.div>

      <p className="text-xs text-gray-500 mt-2">
        Drag and drop your image here, or click to browse. Supports PNG, JPG up
        to 4MB.
      </p>
    </div>
  );
};

export default UploadZone;
