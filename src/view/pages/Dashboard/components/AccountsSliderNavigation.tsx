import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

function AccountsSliderNavigation() {
  const swiper = useSwiper();

  return (
    <div>
      <button
        onClick={() => swiper.slidePrev()}
        className="py-3 pl-2.5 pr-3.5 cursor-pointer enabled:hover:bg-black/10 transition-colors duration-200 rounded-2xl disabled:opacity-40"
      >
        <ChevronLeftIcon className="text-white size-6" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="py-3 pl-2.5 pr-3.5 cursor-pointer enabled:hover:bg-black/10 transition-colors duration-200 rounded-2xl disabled:opacity-40"
      >
        <ChevronRightIcon className="text-white size-6" />
      </button>
    </div>
  );
}

export default AccountsSliderNavigation;
