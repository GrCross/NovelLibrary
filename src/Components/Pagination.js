import React from "react";

const Pagination = (props) => {
  const totalPages = props.totalPages;
  const middlePage = 2;
  const currentPage = props.currentPage;
  return (
    <div className="pagination">
      <button onClick={() => props.handlePagination(currentPage - 1)}>
        previus
      </button>
      {totalPages < 10 &&
        Array(totalPages)
          .fill()
          .map((_, i) => (
            <a
              onClick={(event) => {
                props.handlePagination(i + 1);
              }}
            >
              {i + 1}
            </a>
          ))}

      {totalPages > 10 && 1 <= currentPage && currentPage <= 5 ? (
        <>
          {Array(5)
            .fill()
            .map((_, i) => (
              <a
                onClick={(event) => {
                  props.handlePagination(i + 1);
                }}
              >
                {i + 1}
              </a>
            ))}
          <>...</>
          <a
            onClick={(event) => {
              props.handlePagination(totalPages);
            }}
          >
            {totalPages}
          </a>
        </>
      ) : (
        ""
      )}

      {totalPages > 10 &&
      totalPages - 5 <= currentPage &&
      currentPage <= totalPages ? (
        <>
          <a
            onClick={(event) => {
              props.handlePagination(1);
            }}
          >
            {"--"}
            {1}
          </a>
          <>...</>
          {Array(5)
            .fill()
            .map((_, i) => (
              <a
                onClick={(event) => {
                  props.handlePagination(totalPages - 5 + i + 1);
                }}
              >
                {totalPages - 5 + i + 1}
              </a>
            ))}
        </>
      ) : (
        ""
      )}
      {totalPages > 10 && 5 < currentPage && currentPage < totalPages - 5 ? (
        <>
          <>...</>
          <a
            onClick={(event) => {
              props.handlePagination(currentPage - 1);
            }}
          >
            {currentPage - 1}
          </a>
          <a
            onClick={(event) => {
              props.handlePagination(currentPage);
            }}
          >
            {currentPage}
          </a>
          <a
            onClick={(event) => {
              props.handlePagination(currentPage + 1);
            }}
          >
            {currentPage + 1}
          </a>
          <>...</>
        </>
      ) : (
        ""
      )}
      <button onClick={() => props.handlePagination(currentPage + 1)}>
        next
      </button>
    </div>
  );
};

export default Pagination;
