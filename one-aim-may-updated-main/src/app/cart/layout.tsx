import CartNavbar from "@/components/common/CartNavbar";
import React from "react";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CartNavbar />
      {children}
    </div>
  );
};

export default CartLayout;
