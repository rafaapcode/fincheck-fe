import "../../../../../../node_modules/swiper/swiper.css";

import { PlusIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import AccountCard from "../../../../components/AccountCard";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import Spinner from "../../../../components/Spinner";
import AccountsSliderNavigation from "./AccountsSliderNavigation";
import { useAccountsController } from "./useACcountsController";

function Accounts() {
  const {
    setSliderState,
    sliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    toggleAccountModal,
  } = useAccountsController();
  return (
    <div className="rounded-2xl bg-teal-800 w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div
          className="w-full h-full flex justify-center
       items-center"
        >
          <Spinner className="fill-white size-10" />
        </div>
      )}
      {!isLoading && (
        <>
          <div>
            <span className="tracking-[0.5px] text-white block">
              Saldo Total
            </span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-4xl tracking-[-1px] text-white",
                  !areValuesVisible && "blur-md"
                )}
              >
                {formatCurrency(1000)}
              </strong>
              <button
                className="cursor-pointer size-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            {accounts.length === 0 && (
              <>
                <div
                  className="flex items-center justify-start mb-4"
                  slot="container-start"
                >
                  <strong className="text-white text-lg tracking-[-1px]">
                    Minhas contas
                  </strong>
                </div>

                <button
                  onClick={toggleAccountModal}
                  className="flex flex-col justify-center items-center gap-4 mt-4 h-52 border-2 border-dashed border-teal-600 rounded-2xl text-white cursor-pointer hover:bg-teal-900 transition-colors duration-300"
                >
                  <div className="size-11 rounded-full border-2 border-dashed border-white flex justify-center items-center">
                    <PlusIcon className="size-6" />
                  </div>
                  <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}
            {accounts.length > 0 && (
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

                  {accounts.map((acc) => (
                    <SwiperSlide key={acc.id}>
                      <AccountCard
                        balance={acc.currentBalance}
                        color={acc.color}
                        name={acc.name}
                        type={acc.type}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Accounts;
