import React from "react";

function Navbar() {
  return (
    <>
      <div className=" flex items-center justify-between px-4 py-6 mr-0 w-full poppins-semibold">
        <div className="flex gap-1 items-center">
          <img src="/images/components/logo.svg" alt="" />
          <h1 className="text-black  text-lg  lg:text-2xl">
            <span className="text-blue ">Auction</span>Heroes
          </h1>
        </div>
        <img className="h-4" src="menu.svg" alt="" />
      </div>
    </>
  );
}

export default Navbar;
