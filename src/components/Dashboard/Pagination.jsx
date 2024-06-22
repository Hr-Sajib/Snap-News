
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 mx-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
