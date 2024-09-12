import { LiaShippingFastSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";

export default function Tags() {
  return (
    <div className="flex justify-between items-center pt-10 font-Poppins text-xs md:text-lg md:mx-20 mx-2">
      <div className="flex-col flex gap-2 justify-center items-center">
        <LiaShippingFastSolid className="w-6 h-6 self-center" />
        <p className="self-center">Free Shipping</p>
      </div>
      <div className="flex-col flex gap-2">
        <BiSupport className="w-6 h-6 self-center" />
        <p className="self-center">24/7 Support</p>
      </div>
      <div className="flex-col flex gap-2">
        <IoPricetagOutline className="w-6 h-6 self-center" />
        <p className="self-center">Affordable Price</p>
      </div>
      <div className="flex-col flex gap-2">
        <MdOutlinePayment className="w-6 h-6 self-center" />
        <p className="self-center">Secure Payments</p>
      </div>
    </div>
  );
}
