import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import SliderNavigation from "./SliderNavigation";
import SliderOption from "./SliderOption";

function Transactions() {
  return (
    <div className="rounded-2xl bg-gray-200 w-full h-full px-4 py-8 md:p-10 flex flex-col">
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

      <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
        <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <CategoryIcon type="expense"/>

            <div>
              <strong className="tracking-[-0.5px] block">
                Almoço
              </strong>
              <span className="text-sm text-gray-600">04/02/2020</span>
            </div>
          </div>
          <span className="text-red-800 tracking-[-0.5px] font-medium">
            -{formatCurrency(123)}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <CategoryIcon type="income"/>

            <div>
              <strong className="tracking-[-0.5px] block">
                Almoço
              </strong>
              <span className="text-sm text-gray-600">04/02/2020</span>
            </div>
          </div>
          <span className="text-green-800 tracking-[-0.5px] font-medium">
            {formatCurrency(123)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
