import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import SliderNavigation from "./SliderNavigation";
import SliderOption from "./SliderOption";

function Transactions() {
  return (
    <div className="rounded-2xl bg-gray-200 w-full h-full px-4 py-8 md:p-10">
      <header className="">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 cursor-pointer">
            <TransactionsIcon />
            <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
              Transações
            </span>
            <ChevronDownIcon className="text-gray-900" />
          </button>
          <button>
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6 relative">
          <Swiper slidesPerView={3} spaceBetween={16} centeredSlides>
            <SliderNavigation />
            {MONTHS.map((month, idx) => (
              <SwiperSlide key={month}>
                {({isActive}) => (
                  <SliderOption index={idx} isActive={isActive} month={month}/>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      <div className="mt-4">content</div>
    </div>
  );
}

export default Transactions;
