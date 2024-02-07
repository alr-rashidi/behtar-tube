import React, { useCallback, useEffect, useState } from "react";

type PropsType = {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  numberOfPages: number;
};
const Pagination = ({ currentPage, numberOfPages, setCurrentPage }: PropsType) => {
  type paginationItemsType = (number | "...")[];
  const [paginationItems, setPaginationItems] = useState<paginationItemsType>();
  const calculatePaginationItems = useCallback(() => {
    let items: paginationItemsType = [1];
    if (currentPage <= 4) {
      for (let i = 2; i < numberOfPages && i < 4; i++) {
        items.push(i);
      }
      if (numberOfPages > 4) {
        items.push("...");
      }
    } else if (currentPage >= numberOfPages - 3) {
      items.push("...");
      items.push(numberOfPages - 3, numberOfPages - 2, numberOfPages - 1);
    } else {
      items.push("...");
      items.push(currentPage - 1, currentPage);
      if (currentPage < numberOfPages) {
        items.push(currentPage + 1);
      }
      items.push("...");
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
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        disabled
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
                onClick={() => setCurrentPage(item)}
                className="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-600 dark:text-white dark:focus:bg-gray-500"
                aria-current="page"
              >
                {item}
              </button>
            )
        ))}
      </div>
      <button
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
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
