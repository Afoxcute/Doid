"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <div>
      <div className="mx-auto w-[90%] py-16 flex flex-col-reverse lg:flex-row gap-10 ">
        <div className="flex-1">
          <h2 className="text-5xl font-semibold mb-3">
            Seamless Institution Experience: Identity, Payments, and Access - All in
            One Software.
          </h2>
          <h6 className="text-xl font-medium mb-5">
            Your key to effortless shopping, secure identity verification, and
            hassle-free activities.
          </h6>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Hero;
