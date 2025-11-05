import React from "react";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 z-10 ">
      <div
        className="w-12 h-12 border-4 border-gray-300 border-t-emerald-600   rounded-full animate-spin"
        role="status"
        aria-label="Loading..."
      >
        <span className="sr-only">Loading...</span>
      </div>
      {/* <h1 className="text-xl font-semibold mt-4 text-gray-700">Uploading...</h1> */}
    </div>
  );
};

export default Loading;
