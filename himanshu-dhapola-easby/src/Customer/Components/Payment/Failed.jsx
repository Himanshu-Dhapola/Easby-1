import { Link } from "react-router-dom";

export default function Failed() {
  return (
    <div className="min-h-screen font-Poppins">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          {" "}
          <path
            fill="#f44336"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
          ></path>
          <path
            fill="#fff"
            d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
          ></path>
          <path
            fill="#fff"
            d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
          ></path>{" "}
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-black font-semibold text-center">
            Payment Failed!
          </h3>
          <p className="text-gray my-2">
            Try Again Doing Payment.
          </p>
          <div className="py-10 text-center">
            <Link
              to="/"
              className="px-12 bg-color hover:bg-color text-white font-semibold py-3"
            >
              GO BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
