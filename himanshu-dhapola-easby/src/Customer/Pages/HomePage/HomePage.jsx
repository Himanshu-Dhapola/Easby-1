import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerDetails } from "../../../services/authApi";
import { useNavigate } from "react-router";
import PageNav from "../../Components/Navigation/PageNav";
import Footer from "../../Components/Footer/Footer";
import MainCarousel from "../../Components/HomeCarousel/MainCarousel";
import Tags from "../../Components/Tags/Tags";
import Category from "../../Components/Categories/Category";
import InfiniteCarousel from "../../Components/InfiniteCarousel/InfiniteCarousel";

const HomePage = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      dispatch(getCustomerDetails(accessToken, navigate));
    }
  }, [accessToken]);

  return (
    <>
      <PageNav />
      <div className="bg-pearl font-Poppins">
        <main className="w-full lg:h-[600px] flex justify-center items-center">
          <MainCarousel />
        </main>
      </div>
      <div className="bg-smoke ">
        <Tags />
        <Category />
        <InfiniteCarousel />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
