import React, { useCallback, useEffect, useState } from "react";

type PropsType = {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  numberOfPages: number;
};
const Pagination = ({ currentPage, numberOfPages, setCurrentPage }: PropsType) => {
  type paginationItemsType = (number | "...")[];
  const [paginationItems, setPaginationItems] = useState<paginationItemsType>();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClickNumber = (item: number) => {
    setCurrentPage(item);
    scrollTop();
  };
  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
    scrollTop();
  };
  const handleClickPrev = () => {
    setCurrentPage(currentPage - 1);
    scrollTop();
  };

  const calculatePaginationItems = useCallback(() => {
    let items: paginationItemsType = [1];
    if (numberOfPages <= 6) {
      for (let i = 2; i < numberOfPages && i <= 6; i++) {
        items.push(i);
      }
    } else {
      if (currentPage < 4) {
        for (let i = 2; i < numberOfPages && i <= 4; i++) {
          items.push(i);
        }
        items.push("...");
      } else if (currentPage >= numberOfPages - 3) {
        items.push("...");
        items.push(numberOfPages - 4, numberOfPages - 3, numberOfPages - 2, numberOfPages - 1);
      } else {
        items.push("...");
        items.push(currentPage - 1, currentPage);
        if (currentPage < numberOfPages) {
          items.push(currentPage + 1);
        }
        items.push("...");
      }
    }
    items.push(numberOfPages);
    setPaginationItems(items);
  }, [currentPage, numberOfPages]);

  useEffect(() => {
    calculatePaginationItems();
  }, [calculatePaginationItems]);
  return (
    <nav className="flex justify-center items-center gap-x-1 p-4">
      <button
        type="button"
        onClick={handleClickPrev}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        disabled={currentPage == 1}
      >
        <svg
          className="flex-shrink-0 w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span>Previous</span>
      </button>
      <div className="flex items-center gap-x-1">
        {paginationItems?.map((item, index) => (
          item == "..."
            ? <div key={`dots-${index}`} className="px-3">...</div>
            : (
              <button
                type="button"
                key={item}
                onClick={() => handleClickNumber(item)}
                className={`${
                  currentPage == item
                    ? "bg-neutral-300 dark:bg-neutral-700 font-bold"
                    : "bg-neutral-200 dark:bg-neutral-800"
                } min-h-[38px] min-w-[38px] flex justify-center items-center text-neutral-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-neutral-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700`}
                aria-current="page"
              >
                {item}
              </button>
            )
        ))}
      </div>
      <button
        type="button"
        onClick={handleClickNext}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-neutral-800 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        disabled={currentPage == numberOfPages}
      >
        <span>Next</span>
        <svg
          className="flex-shrink-0 w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
