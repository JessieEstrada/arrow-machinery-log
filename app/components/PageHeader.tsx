import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import React from "react";

export const PageHeader: React.FC = () => {
  return (
    <header className="w-full bg-[#040A1E] text-white p-4 sm:p-6 shadow-md z-10 sticky top-0">
      <div className="flex justify-center items-center">
        <WrenchScrewdriverIcon className="h-12 w-12 text-[#EE5453]" />
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider ml-4">Machinery Log</h1>
      </div>
    </header>
  );
};
