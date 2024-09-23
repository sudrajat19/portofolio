import { useState } from "react";
export default function Pagination () {
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 3;
    
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };
    
      const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
      };
      
      const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  
    return (
    <div className="flex gap-4 w-full justify-around py-8">
      <button
        className="text-blue-500 hover:underline"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-2 py-1 ${currentPage === index + 1 ? "bg-gray-300" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="text-blue-500 hover:underline"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

