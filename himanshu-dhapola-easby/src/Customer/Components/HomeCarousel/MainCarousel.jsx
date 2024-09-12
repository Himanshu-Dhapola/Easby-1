import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouselData } from "./MainCarouselData";

const MainCarousel = () => {
    const items = mainCarouselData.map((item) => (
      <img
        className=" cursor-pointer w-full h-[200px] sm:h-[280px] md:[400px] lg:h-[500px]"
        key={item.key}
        role="presentation"
        src={item.image}
        alt=""
      />
    ));
    return (
      <AliceCarousel
        disableButtonsControls
        autoPlay
        autoPlayInterval={5000}
        infinite
        items={items}
      />
    );
}

export default MainCarousel
