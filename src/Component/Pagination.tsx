import { useEffect, useState } from "react";
import { PAGE_INITIAL, VIEWBTN_INITIAL } from "./AdminPage";

interface PaginationProps {
  total: number;
  pageLimit: number;
  page: number;
  viewBtn: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageLimit: React.Dispatch<React.SetStateAction<number>>;
  setViewBtn: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  total,
  pageLimit,
  page,
  viewBtn,
  setViewBtn,
  setPage,
  setPageLimit,
}: PaginationProps) => {
  const [totalPageNum, setTotalPageNum] = useState<number>(0);

  useEffect(() => {
    setTotalPageNum(Math.ceil(total / pageLimit));
  }, [total]);

  const handleSetPage = (pageNum: number) => {
    setPage(pageNum);
    if (pageNum <= 4) {
      setViewBtn(VIEWBTN_INITIAL);
    } else if (5 <= pageNum && pageNum <= totalPageNum - 4) {
      setViewBtn(pageNum);
    } else if (totalPageNum - 3 <= pageNum) {
      setViewBtn(totalPageNum - 3);
    }
  };

  const handlePageLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPage(PAGE_INITIAL);
    setViewBtn(VIEWBTN_INITIAL);
    setPageLimit(Number(value));
    setTotalPageNum(Math.ceil(total / Number(value)));
  };

  return (
    <div className="pagi-container">
      <label className="pagi-label">
        페이지당 행:
        <select
          className="pagi-select"
          value={pageLimit}
          onChange={(e) => handlePageLimit(e)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
      <nav>
        <button
          onClick={() => handleSetPage(1)}
          className="pagi-button"
          disabled={page === 1}
        >
          &#171;
        </button>
        <button
          onClick={() => handleSetPage(page - 1)}
          className="pagi-button"
          disabled={page === 1}
        >
          &lt;
        </button>
        {Array(totalPageNum)
          .fill("page")
          .map((_, i) => {
            const pageNum = i + 1;
            if (
              (viewBtn - 1 <= pageNum && pageNum <= viewBtn + 1) ||
              (pageNum === 2 && pageNum === viewBtn - 2) ||
              (pageNum === totalPageNum - 1 && pageNum === viewBtn + 2) ||
              pageNum === 1 ||
              pageNum === totalPageNum
            ) {
              return (
                <button
                  key={i}
                  className={
                    `pagi-button ` + (page === pageNum ? "active" : "")
                  }
                  onClick={() => handleSetPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            } else if (pageNum === viewBtn - 2 || pageNum === viewBtn + 2) {
              return (
                <span key={i} className="pagi-span">
                  ...
                </span>
              );
            }
          })}
        <button
          onClick={() => handleSetPage(page + 1)}
          className="pagi-button"
          disabled={page === totalPageNum}
        >
          &gt;
        </button>
        <button
          onClick={() => handleSetPage(totalPageNum)}
          className="pagi-button"
          disabled={page === totalPageNum}
        >
          &#187;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
