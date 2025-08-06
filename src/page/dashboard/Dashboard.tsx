import type { JSX } from "react";

const Dashboard = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center px-4 py-10 pt-20 min-h-screen h-full bg-[#0d1117] text-white">
      <div className="w-full max-w-7xl flex flex-col items-center">
        <div className="w-full flex justify-between items-center border-b border-gray-700 pb-4 mb-8">
          <h1 className="font-bold text-3xl text-white">All Notes</h1>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200">
            New Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
