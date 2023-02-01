import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ItemType } from "../api/axios";
import { RootState } from "../store";
import { historyPush } from "../utils/historyPush";
import { PAGE_INITIAL, VIEWBTN_INITIAL } from "./AdminPage";

interface SearchBarProps {
  setItemListData: React.Dispatch<React.SetStateAction<ItemType[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setViewBtn: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar = ({
  setItemListData,
  setPage,
  setViewBtn,
}: SearchBarProps) => {
  const { itemList } = useSelector((state: RootState) => state.itemList);
  const [searchCategory, setSearchCategory] = useState(
    history.state !== null ? history.state.data.searchCategory : "전체"
  );
  const [inputData, setInputData] = useState(
    history.state !== null ? history.state.data.inputData : ""
  );

  useEffect(() => {
    historyPush({
      name: "searchCategory",
      value: searchCategory,
    });
  }, [searchCategory]);

  useEffect(() => {
    historyPush({
      name: "inputData",
      value: inputData,
    });
  }, [inputData]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputData(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(PAGE_INITIAL);
    setViewBtn(VIEWBTN_INITIAL);

    switch (true) {
      case searchCategory === "전체":
        setItemListData(
          itemList.filter((item) => {
            return (
              item.id
                .toString()
                .toLowerCase()
                .includes(inputData.toLowerCase()) ||
              item.title.toLowerCase().includes(inputData.toLowerCase()) ||
              item.brand.toLowerCase().includes(inputData.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(inputData.toLowerCase()) ||
              item.price
                .toString()
                .toLowerCase()
                .includes(inputData.toLowerCase()) ||
              item.rating
                .toString()
                .toLowerCase()
                .includes(inputData.toLowerCase()) ||
              item.stock.toString().includes(inputData.toLowerCase())
            );
          })
        );
        break;
      case searchCategory === "상품명":
        setItemListData(
          itemList.filter((item) => {
            return item.title.toLowerCase().includes(inputData.toLowerCase());
          })
        );
        break;
      case searchCategory === "브랜드":
        setItemListData(
          itemList.filter((item) => {
            return item.brand.toLowerCase().includes(inputData.toLowerCase());
          })
        );
        break;
      case searchCategory === "상품내용":
        setItemListData(
          itemList.filter((item) => {
            return item.description
              .toLowerCase()
              .includes(inputData.toLowerCase());
          })
        );
        break;
    }
  };
  return (
    <div className="searchBar-container">
      <h1 className="searchBar-title">상품검색</h1>
      <div className="searchBar flex">
        <p className="searchBar-title ">검색</p>
        <select
          className="searchBar-select"
          value={searchCategory}
          onChange={({ target: { value } }) => setSearchCategory(value)}
        >
          <option value="전체">전체</option>
          <option value="상품명">상품명</option>
          <option value="브랜드">브랜드</option>
          <option value="상품내용">상품내용</option>
        </select>
        <form className="flex" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="searchBar-input"
            value={inputData}
            onChange={(e) => handleInput(e)}
          />
          <button type="submit" className="submit-btn">
            조회
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
