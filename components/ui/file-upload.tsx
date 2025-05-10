"use client";
// @ts-ignore
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: string;
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-40 w-40">
        <div className="absolute inset-0">
          <Image
            fill
            src={value}
            alt="Upload"
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
        <button
          onClick={() => onChange("")}
          className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm hover:bg-rose-600 transition-colors"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res: any) => {
        if (res && res.length > 0) {
          onChange(res[0].fileUrl);
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
      }}
      appearance={{
        container: "border-2 border-dashed border-gray-300 rounded-lg p-4",
        allowedContent: "text-sm text-gray-500",
        button:
          "bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90",
      }}
    />
  );
};
