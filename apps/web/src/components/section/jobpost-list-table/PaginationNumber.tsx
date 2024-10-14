export default function PaginationNumber({
    totalPages,
    currPage,
    setCurrPage,
}: {
    totalPages: number;
    currPage: number;
    setCurrPage: (page: number) => void;
}) {
    const handlePrevPage = () => {
        if (currPage > 1) setCurrPage(currPage - 1);
    };
    const handleNextPage = () => {
        if (currPage < totalPages) setCurrPage(currPage + 1);
    };
    return (
        <div className="flex items-center justify-center space-x-2">
            <button
                className="rounded bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
                onClick={handlePrevPage}
                disabled={currPage === 1}
            >
                Prev
            </button>

            {PaginationNumberRow(totalPages, currPage, setCurrPage)}

            <button
                className="rounded bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currPage === totalPages || totalPages === 0}
            >
                Next
            </button>
        </div>
    );
}

function PaginationNumberRow(totalPages: number, currPage: number, setCurrPage: (page: number) => void) {
    const pageNumbers = [];

    // Show all pages if the total pages are 3 or fewer
    if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`px-3 py-1 ${currPage === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded border`}
                    onClick={() => setCurrPage(i)}
                >
                    {i}
                </button>,
            );
        }
    } else {
        // First page
        pageNumbers.push(
            <button
                key={1}
                className={`px-3 py-1 ${currPage === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded border`}
                onClick={() => setCurrPage(1)}
            >
                1
            </button>,
        );

        // Show left ellipsis if current page is greater than 3
        if (currPage > 3) {
            pageNumbers.push(
                <span key="left-ellipsis" className="px-2">
                    ...
                </span>,
            );
        }

        // Add middle pages dynamically based on the current page
        const startPage = Math.max(2, currPage - 1);
        const endPage = Math.min(totalPages - 1, currPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`px-3 py-1 ${currPage === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded border`}
                    onClick={() => setCurrPage(i)}
                >
                    {i}
                </button>,
            );
        }

        // Show right ellipsis if the current page is far from the last page
        if (currPage < totalPages - 2) {
            pageNumbers.push(
                <span key="right-ellipsis" className="px-2">
                    ...
                </span>,
            );
        }

        // Last page
        pageNumbers.push(
            <button
                key={totalPages}
                className={`px-3 py-1 ${currPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded border`}
                onClick={() => setCurrPage(totalPages)}
            >
                {totalPages}
            </button>,
        );
    }

    return pageNumbers;
}
