import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { createOrder } from "../../../services/orderApi";

export default function AddressCard({ address }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const querySearch = new URLSearchParams(location.search);
  const step = querySearch.get("step");

  const handleSubmit = () => {
    const customerAddress = {
      id: address._id,
      firstName: address.firstName,
      lastName: address.lastName,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      mobile: address.mobile,
    };
    dispatch(createOrder({ customerAddress, navigate }));
  };

  return (
    <div className="border-gray w-full rounded-md bg-white shadow-md space-y-6 scroll font-Poppins">
      <div className="pt-4 pl-4">
        <div>
          <p className="font-semibold">
            {address?.firstName + " " + address?.lastName}
          </p>
          <p className="text-gray">{`${address?.state}, ${address?.streetAddress} ${address?.pincode}`}</p>
        </div>
        <div>
          <p className="font-semibold">Phone Number</p>
          <p className="text-gray">{address?.mobile}</p>
        </div>
      </div>
      <div className="flex w-full justify-end">
        {step !== "3" && (
          <button
            onClick={handleSubmit}
            className="w-[150px] uppercase bg-color rounded-md mb-4 mr-4 p-2 text-white font-semibold"
          >
            Deliver Here
          </button>
        )}
      </div>
    </div>
  );
}

AddressCard.propTypes = {
  address: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    state: PropTypes.string,
    streetAddress: PropTypes.string,
    pincode: PropTypes.string,
    mobile: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
  handleAddress: PropTypes.func.isRequired,
};
