"use client";
import { useOrganization } from "@/contexts/OrganizationContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CartNavbar = () => {
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";
  const isAddressPage = pathname === "/cart/address";
  const isPaymentPage = pathname === "/cart/payment";
  const { data: apiData } = useOrganization();

  return (
    <header className="bg-[#FFF7F0]">
      <div className="screen padding-x flex justify-between items-center py-3">
        <div className="w-52">
          <Link href="/">
            <Image
              src={apiData?.logo_url || "/logo.png"}
              alt={apiData?.name || "Company Logo"}
              width={220}
              height={180}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <div className="flex max-sm:mx-auto">
          <div className="flex items-center text-xl">
            <p
              className={`${
                isCartPage || (!isAddressPage && !isPaymentPage)
                  ? "text-orange"
                  : "text-gray-400"
              } font-medium max-sm:text-sm`}
            >
              Cart
            </p>
            <div
              className={`border-b border-dashed w-16 max-sm:w-10  ${
                isCartPage || (!isAddressPage && !isPaymentPage)
                  ? "border-orange"
                  : "border-gray-400"
              } mx-2`}
            ></div>
          </div>
          <div className="flex items-center text-xl">
            <p
              className={`${
                isAddressPage ? "text-orange" : "text-gray-400"
              } font-medium max-sm:text-sm`}
            >
              Address
            </p>
            <div
              className={`border-b border-dashed w-16 max-sm:w-10 ${
                isAddressPage ? "border-orange" : "border-gray-400"
              } mx-2`}
            ></div>
          </div>
          <div className="flex items-center text-xl">
            <p
              className={`${
                isPaymentPage ? "text-orange" : "text-gray-400"
              } font-medium max-sm:text-sm`}
            >
              Payment
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 max-sm:hidden">
          <Image
            src={"/images/icons/verified-icon.svg"}
            alt="verified-icon"
            width={32}
            height={32}
          />
          <p>100% Secure</p>
        </div>
      </div>
    </header>
  );
};

export default CartNavbar;
