"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFileContext } from "./FileContext";

export default function FileUploader() {
  const { files, setFiles } = useFileContext();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles: File[]) => [...prevFiles, ...acceptedFiles]);
    },
    [setFiles]
  );

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
  });

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">
            Drag & drop files here, or click to select files
          </p>
        ) : (
          <p>Drag & drop files here, or click to select files</p>
        )}
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 border rounded mb-2"
              >
                <span>{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
