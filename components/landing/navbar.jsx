"use client";
import Link from "next/link";
import React from "react";
import { DiamondPlus } from "lucide-react";
import CoinbaseButton from "@/app/Components/CoinbaseButton";

export const LandingNavbar = () => {
  return (
    <div className="">
      <div className="w-[90%] mx-auto flex justify-between items-center py-3.5">
        <Link href="" className="text-2xl font-semibold flex items-center gap-5">
          <div>
            <DiamondPlus />
          </div>
          <div>BasearpsID</div>
        </Link>

        <div>
          <CoinbaseButton />
        </div>
      </div>
    </div>
  );
};
