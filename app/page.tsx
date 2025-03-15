"use client";

import React from "react";
import { Upload, ArrowRight } from "lucide-react";
import FileUploader from "@/components/drag";
import { FileProvider } from "@/components/FileContext";

function App() {
  return (
    <FileProvider>
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-2">
          <div className="min-h-screen flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
            <div className="mb-12">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Upload className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Compress your images instantly
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Drop your images here. No signup required.
              </p>
            </div>

            <FileUploader />
            <div className="grid grid-cols-2 gap-8 w-full max-w-md">
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">90%</p>
                <p className="text-gray-400 text-sm">Average Reduction</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">15MB</p>
                <p className="text-gray-400 text-sm">Max File Size</p>
              </div>
            </div>
            <button className="cursor-pointer mt-12 group px-8 py-4 bg-white text-black rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors">
              Start Compressing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform " />
            </button>
          </div>
        </div>
      </div>
    </FileProvider>
  );
}

export default App;
