import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface SliderOptionProps {
  month: string;
  isActive: boolean;
  index: number;
}

function SliderOption({ isActive, month, index }: SliderOptionProps) {
  const swiper = useSwiper();


  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        "w-full rounded-full h-12 tracking-[-0.5px] text-gray-800 font-medium cursor-pointer",
        isActive && "bg-white"
      )}
    >
      {month}
    </button>
  );
}

export default SliderOption;
