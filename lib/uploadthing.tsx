"use client";

import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { FileUploader } from "react-drag-drop-files";
import { useUploadThing } from "@/utils/uploadthing";

type UploadDropzoneProps = {
  endpoint: string;
  onClientUploadComplete?: (
    res?: { fileKey: string; fileUrl: string }[]
  ) => void;
  onUploadError?: (error: Error) => void;
  allowedFileTypes?: string[];
  maxSize?: number;
};

export const UploadDropzone = ({
  endpoint,
  onClientUploadComplete,
  onUploadError,
  allowedFileTypes = ["JPG", "PNG", "PDF", "DOCX", "WEBP", "JPEG"],
  maxSize = 10, // in MB
}: UploadDropzoneProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { startUpload } = useUploadThing(endpoint as any);

  const handleFileChange = useCallback(
    async (files: File[]) => {
      setIsUploading(true);
      try {
        const res = await startUpload(files);

        if (res) {
          onClientUploadComplete?.(
            res.map((r) => ({ fileKey: r.key, fileUrl: r.url })) as {
              fileKey: string;
              fileUrl: string;
            }[]
          );
        } else {
          onUploadError?.(new Error("Upload failed"));
        }
      } catch (e: any) {
        onUploadError?.(e);
      } finally {
        setIsUploading(false);
      }
    },
    [startUpload, onClientUploadComplete, onUploadError]
  );

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500">Uploading your files...</p>
        </div>
      ) : (
        <FileUploader
          handleChange={(files: any) =>
            handleFileChange(Array.isArray(files) ? files : [files])
          }
          name="files"
          types={allowedFileTypes}
          maxSize={maxSize}
          onDragOver={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDrop={() => setDragActive(false)}
        >
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="rounded-full bg-blue-50 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm font-medium text-blue-600">
                Drag & drop files here
              </p>
              <p className="text-xs text-gray-500">
                or <span className="font-semibold text-blue-500">browse</span>{" "}
                to upload
              </p>
              <p className="text-xs text-gray-400">
                {allowedFileTypes.join(", ")} (max {maxSize}MB)
              </p>
            </div>
          </div>
        </FileUploader>
      )}
    </div>
  );
};
