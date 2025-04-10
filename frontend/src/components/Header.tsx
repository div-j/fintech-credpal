import React from "react";
import { BiSearch } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  return (
    <main className="flex flex-row items-center border-b border-gray-200 justify-between w-full h-[80px] pl-[83px] pr-10">
      <div className="">
        <label className="input focus:outline-none focus:ring-1 focus:ring-black flex items-center bg-[#F5F4F2] gap-2 h-8 rounded-full">
          <input type="text" className="grow text-xs focus:border-none " placeholder="Search" />
          <CiSearch  className="h-3 w-3" />
        </label>
      </div>

      <div className="flex flex-row items-center justify-center gap-4">
        <div className="h-[30px] w-[30px] items-center text-center pt-1 rounded-full bg-[#FFE6CC]">
          <p className="tex-sm">M</p>
        </div>
        <p className="text-xs text-black">Magnartis LTD</p>
        <select  name="" className="text-sm text-black bg-transparent h-8 rounded-full  focus:outline-none focus:ring-1 focus:ring-black">
          <option value=""></option>
        </select>
      </div>
    </main>
  );
}
