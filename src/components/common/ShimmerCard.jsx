import React from "react";

const ShimmerCard = () => {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
