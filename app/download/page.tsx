"use client";

import { useFileContext } from "@/components/FileContext";
import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DownloadImages() {
  const { files } = useFileContext();
  const [urlsList, setUrlsList] = useState<string[]>([]);
  const router = useRouter();

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed-file.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.5, // Max 1MB output
      maxWidthOrHeight: 1920, // Resize if needed
      useWebWorker: true, // Speed up compression
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log("Original Size:", file.size);
      console.log("Compressed Size:", compressedFile.size);
      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
      return undefined;
    }
  };
  const createImagePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  useEffect(() => {
    const processImages = async () => {
      if (files.length > 0) {
        let compressedUrls: string[] = await Promise.all(
          files.map(async (file) => {
            const compressedImage = await compressImage(file);
            return compressedImage ? createImagePreview(compressedImage) : "";
          })
        );
        compressedUrls = compressedUrls.filter((val) => {
          return val.length > 0;
        });
        setUrlsList(compressedUrls);
      }
    };

    processImages();
  }, [files]);

  return (
    <>
      <main className="min-h-screen min-w-screen container mx-auto px-4 py-12 bg-black bg-gradient-to-b from-[#000000] via-[#1f1f21] to-[#1c1c20] text-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {urlsList.map((photo) => (
            <div
              key={photo}
              className="bg-[#12121a] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[#2a2a3a] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(79,70,229,0.2)]"
            >
              <div className="relative group">
                <Image
                  src={photo}
                  alt={photo}
                  width={100}
                  height={100}
                  className="w-full h-72 object-cover brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="absolute bottom-0 w-full p-4 flex justify-center gap-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => handleDownload(photo)}
                      className="bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-full p-3 transform hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.back()}
          className="fixed right-6 bottom-[10%] flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white rounded-full shadow-lg hover:bg-[#16213e] transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </main>
    </>
  );
}
