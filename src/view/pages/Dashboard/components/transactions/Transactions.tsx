import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { formatDate } from "../../../../../app/utils/formatDate";
import emptyStateIllustration from "../../../../../assets/emptystate.svg";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import Spinner from "../../../../components/Spinner";
import FiltersModal from "./FiltersModal";
import SliderNavigation from "./SliderNavigation";
import SliderOption from "./SliderOption";
import TransactionTypeDropdown from "./transactionTypeDropdown";
import { useTransactionsController } from "./useTransactionsController";

function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    isInitialLoading,
    transactions,
    isFiltersModalOpen,
    toggleFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="rounded-2xl bg-gray-200 w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isInitialLoading && (
        <div
          className="w-full h-full flex justify-center
       items-center"
        >
          <Spinner className="fill-teal-500 size-10" />
        </div>
      )}
      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={toggleFiltersModal}
            onApplyFilters={(filters) => handleApplyFilters(filters) }
          />
          <header className="">
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown 
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />
              <button onClick={toggleFiltersModal} className="cursor-pointer">
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper slidesPerView={3} spaceBetween={16} initialSlide={filters.month} centeredSlides onSlideChange={(swiper) => {
                if(swiper.realIndex === filters.month) return;
                handleChangeFilters('month')(swiper.realIndex);
              }}>
                <SliderNavigation />
                {MONTHS.map((month, idx) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        index={idx}
                        isActive={isActive}
                        month={month}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col justify-center items-center h-full">
                <Spinner className="fill-teal-500 size-10" />{" "}
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col justify-center items-center h-full">
                <img
                  src={emptyStateIllustration}
                  alt="Empty state illustration"
                />
                <p className="text-gray-700 mt-4">
                  Não encontramos nenhuma transação
                </p>
              </div>
            )}

            {hasTransactions &&
              !isLoading &&
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                >
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon
                      type={
                        transaction.type === "EXPENSE" ? "expense" : "income"
                      }
                      category={transaction.category?.icon}
                    />

                    <div>
                      <strong className="tracking-[-0.5px] block">
                        {transaction.name}
                      </strong>
                      <span className="text-sm text-gray-600">
                        {formatDate(new Date(transaction.date))}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "tracking-[-0.5px] font-medium",
                      transaction.type === "EXPENSE"
                        ? "text-red-800"
                        : "text-green-800",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}
                    {formatCurrency(transaction.value)}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Transactions;
