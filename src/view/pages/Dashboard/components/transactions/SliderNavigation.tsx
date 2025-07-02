import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button onClick={() => swiper.slidePrev()} className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex justify-center items-center z-10 rounded-md cursor-pointer bg-gray-200"><ChevronLeftIcon className="size-6 text-gray-800"/></button>
      <button onClick={() => swiper.slideNext()} className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex justify-center items-center z-10 rounded-md cursor-pointer bg-gray-200"><ChevronRightIcon className="size-6 text-gray-800"/></button>
    </>
  )
}

export default SliderNavigation