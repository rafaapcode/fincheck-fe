import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../../../node_modules/swiper/swiper.css";
import AccountCard from "../../../../components/AccountCard";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import AccountsSliderNavigation from "./AccountsSliderNavigation";
import { useAccountsController } from "./useACcountsController";

function Accounts() {
  const { setSliderState, sliderState, windowWidth } = useAccountsController();

  return (
    <div className="rounded-2xl bg-teal-800 w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="tracking-[0.5px] text-white block">Saldo Total</span>
        <div className="flex items-center gap-2">
          <strong className="text-4xl tracking-[-1px] text-white">
            R$ 1000,00
          </strong>
          <button className="cursor-pointer size-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth > 500 ? 2.1 : 1.1}
            onSlideChange={(swiper) =>
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              })
            }
          >
            <div
              className="flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white text-lg tracking-[-1px]">
                Minhas contas
              </strong>

              <AccountsSliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>

            <SwiperSlide>
              <AccountCard
                balance={1223.312}
                color="#7950f2"
                name="Nubank"
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                balance={1223.312}
                color="#22df6a"
                name="Nubank"
                type="INVESTMENT"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                balance={1223.312}
                color="#22df6a"
                name="BTG"
                type="CHECKING"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
