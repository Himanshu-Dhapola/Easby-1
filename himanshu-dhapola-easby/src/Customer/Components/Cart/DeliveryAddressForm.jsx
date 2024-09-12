import AddressCard from "../AddressDetails/AddressCard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../../services/orderApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function DeliveryAddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customer } = useSelector((state) => state.auth);

  const [customerAddress, setCustomerAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "pincode" || name === "mobile"
        ? value.replace(/\D/g, "")
        : value.toString();

    setCustomerAddress((prev) => {
      return { ...prev, [name]: newValue };
    });
  };

  const handleAddress = (e) => {
    e.preventDefault();
    if (
      customerAddress.pincode.length !== 6 ||
      isNaN(customerAddress.pincode)
    ) {
      toast.error("Pincode must be a 6-digit number", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    if (customerAddress.mobile.length !== 10 || isNaN(customerAddress.mobile)) {
      toast.error("Phone number must be a 10-digit number", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const orderData = { customerAddress, navigate };
    dispatch(createOrder(orderData));
    setCustomerAddress({
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "",
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row pb-5 bg-smoke gap-y-5 md:gap-x-10 font-Poppins">
      <div className="w-full md:w-1/2 border p-2 scroll-smooth overflow-scroll h-64 md:h-80 rounded-md space-y-3">
        {customer?.address?.map((address, index) => (
          <AddressCard address={address} key={index} />
        ))}
      </div>
      <form className=" w-full md:w-1/2 space-y-5" onSubmit={handleAddress}>
        <div className="flex space-x-5">
          <textarea
            type="text"
            placeholder="First Name*"
            name="firstName"
            value={customerAddress.firstName}
            onChange={handleChange}
            className="placeholder:text-gray pt-1 block bg-white w-1/2 h-9 border border-gray rounded-md pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          />
          <textarea
            type="text"
            placeholder="Last Name*"
            name="lastName"
            value={customerAddress.lastName}
            onChange={handleChange}
            className="placeholder:text-gray pt-1 block bg-white w-1/2 h-9 border border-gray rounded-md pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          />
        </div>
        <div>
          <textarea
            placeholder="Street Address*"
            name="streetAddress"
            value={customerAddress.streetAddress}
            onChange={handleChange}
            className="placeholder:text-gray block bg-white w-full h-20 border border-gray rounded-md pl-5 pt-2 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          ></textarea>
        </div>
        <div className="flex space-x-5">
          <textarea
            type="text"
            name="city"
            value={customerAddress.city}
            onChange={handleChange}
            placeholder="City*"
            className="placeholder:text-gray block pt-1 bg-white w-1/2 h-9 border border-gray rounded-md pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          />
          <textarea
            type="text"
            name="state"
            value={customerAddress.state}
            onChange={handleChange}
            placeholder="State*"
            className="placeholder:text-gray block pt-1 bg-white w-1/2 h-9 border border-gray rounded-md pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          />
        </div>
        <div className="flex space-x-5">
          <textarea
            type="text"
            name="pincode"
            value={customerAddress.pincode}
            onChange={handleChange}
            placeholder="Pin Code*"
            className="placeholder:text-gray block pt-1 bg-white w-1/2 h-9 border border-gray rounded-md pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          />
          <textarea
            type="text"
            name="mobile"
            value={customerAddress.mobile}
            onChange={handleChange}
            placeholder="Phone Number*"
            className="placeholder:text-gray block pt-1 bg-white w-1/2 h-9 border border-gray rounded-md pl-5 focus:ring-color focus:border-color pr-3 shadow-sm focus:outline-none self-center"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-color mt-3 uppercase rounded-md p-2 text-white font-semibold"
        >
          Deliver Here
        </button>
      </form>
    </div>
  );
}
