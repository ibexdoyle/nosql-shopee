import React from "react";

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null; 
  const generatePageNumbers = () => {
    const maxVisible = 5; 
    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center text-sm mt-4 text-gray-600">
      <p>
        Trang {currentPage} / {totalPages}
      </p>
      <div className="flex gap-2 items-center">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="px-2">
          «
        </button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2">
          ‹
        </button>
        {generatePageNumbers().map((page) => (
          <button key={page} onClick={() => onPageChange(page)} className={`px-2 rounded ${  page === currentPage
                ? "bg-emerald-green text-white"
                : "hover:bg-grey"
            }`}
>
            {page}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2">
          ›
        </button>
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="px-2">
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
