import React, { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({ totalEntries = 0 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalEntries / 10);
    const pageLimit = 4; // Maximum number of page buttons to display before showing ellipsis

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageButtons = () => {
        const pageButtons = [];

        if (totalPages <= pageLimit) {
            for (let i = 1; i <= totalPages; i++) {
                pageButtons.push(
                    <li key={i}>
                        <button
                            onClick={() => handlePageClick(i)}
                            className={` rounded hover:bg-gray-200 ${i === currentPage ? 'bg-gray-300' : ''}`}
                        >
                            {i}
                        </button>
                    </li>
                );
            }
        } else {
            // Render ellipsis buttons
            let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
            let endPage = Math.min(startPage + pageLimit - 1, totalPages);

            if (endPage - startPage + 1 < pageLimit) {
                startPage = Math.max(1, endPage - pageLimit + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageButtons.push(
                    <li key={i}>
                        <button
                            onClick={() => handlePageClick(i)}
                            className={`px-2  rounded hover:bg-gray-200 ${i === currentPage ? 'bg-gray-300' : ''}`}
                        >
                            {i}
                        </button>
                    </li>
                );
            }

            if (startPage >2) {
                pageButtons.unshift(
                    <li key="leftEllipsis" className="flex items-center">
                        <span className="px-2">...</span>
                    </li>
                );
            }
            if (endPage < totalPages-1) {
                pageButtons.push(
                    <li key="rightEllipsis" className="flex items-center">
                        <span className="px-2">...</span>
                    </li>
                );
            }
            if (!pageButtons.find(button => button.key === '1')) {
                pageButtons.unshift(
                    <li key={1}>
                        <button
                            onClick={() => handlePageClick(1)}
                            className={`px-2 rounded hover:bg-gray-200 ${1 === currentPage ? 'bg-gray-300' : ''}`}
                        >
                            {1}
                        </button>
                    </li>
                );
            }
            if (!pageButtons.find(button => button.key === String(totalPages))) {
                pageButtons.push(
                    <li key={totalPages}>
                        <button
                            onClick={() => handlePageClick(1)}
                            className={`px-2  rounded hover:bg-gray-200 ${totalPages === currentPage ? 'bg-gray-300' : ''}`}
                        >
                            {totalPages}
                        </button>
                    </li>
                );
            }
            
        }

        return pageButtons;
    };

    return (
        <div className='w-full flex justify-center'>
            <div className="flex items-center justify-center w-fit border border-gray-300 rounded-lg h-8 gap-2">
                <button onClick={handleFirstPage}  className={`px-2 ${currentPage === 1 ? 'opacity-50 ' : ''}`}>
                    <FaAngleDoubleLeft className="w-auto h-auto" />
                </button>
                <button onClick={handlePreviousPage}  className={`px-2 ${currentPage === 1 ? 'opacity-50 ' : ''}`}>
                    <FaAngleLeft className="w-auto h-auto" />
                </button>
                <ul className="flex items-center justify-center gap-2">
                    {renderPageButtons()}
                </ul>
                <button onClick={handleNextPage}  className={`px-2 ${currentPage === totalPages ? 'opacity-50 ' : ''}`}>
                    <FaAngleRight className="w-auto h-auto" />
                </button>
                <button onClick={handleLastPage}  className={`px-2 ${currentPage === totalPages ? 'opacity-50' : ''}`}>
                    <FaAngleDoubleRight className="w-auto h-auto" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
