import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ItemType } from "../api/axios";
import { RootState, useAppDispatch } from "../store";
import { fetchItemList } from "../store/itemListSlice";
import { historyPush } from "../utils/historyPush";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const TOTAL_ITEMS = 100;
export const PAGELIMIT_INITIAL = 10;
export const PAGE_INITIAL = 1;
export const VIEWBTN_INITIAL = 4;

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { itemList } = useSelector((state: RootState) => state.itemList);
  const [itemListData, setItemListData] = useState<ItemType[]>(
    history.state !== null ? history.state.data.itemListData : []
  );
  const [pageLimit, setPageLimit] = useState(
    history.state !== null ? history.state.data.pageLimit : PAGELIMIT_INITIAL
  );
  const [page, setPage] = useState<number>(
    history.state !== null ? history.state.data.page : PAGE_INITIAL
  );
  const [viewBtn, setViewBtn] = useState(
    history.state !== null ? history.state.data.viewBtn : VIEWBTN_INITIAL
  );
  const offset = (page - 1) * pageLimit;

  useEffect(() => {
    if (itemList.length !== 0) return;
    dispatch(fetchItemList(TOTAL_ITEMS));
  }, []);

  useEffect(() => {
    historyPush({
      name: "page",
      value: page,
    });
  }, [page]);
  useEffect(() => {
    historyPush({
      name: "viewBtn",
      value: viewBtn,
    });
  }, [viewBtn]);
  useEffect(() => {
    historyPush({
      name: "pageLimit",
      value: pageLimit,
    });
  }, [pageLimit]);
  useEffect(() => {
    historyPush({
      name: "itemListData",
      value: itemListData,
    });
  }, [itemListData]);

  return (
    <div className="container">
      <div className="inner-container">
        <SearchBar
          setItemListData={setItemListData}
          setPage={setPage}
          setViewBtn={setViewBtn}
        />
        <p className="search-data">
          검색된 데이터 :
          {itemListData.length === 0 ? itemList.length : itemListData.length}건
        </p>
        <div className="table-container">
          <table className="table-inner-container">
            <thead>
              <tr className="table-thead-tr">
                <th>상품번호</th>
                <th>상품명</th>
                <th>브랜드</th>
                <th>상품내용</th>
                <th>가격</th>
                <th>평점</th>
                <th>재고</th>
              </tr>
            </thead>
            <tbody>
              {itemListData.length === 0
                ? itemList
                    .slice(offset, pageLimit * page)
                    .map((item) => <ItemList key={item.id} item={item} />)
                : itemListData
                    .slice(offset, pageLimit * page)
                    .map((item) => <ItemList key={item.id} item={item} />)}
            </tbody>
          </table>
          {itemList.length === 0 && itemListData.length === 0 ? (
            <div className="loader-container">
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            ""
          )}
          <Pagination
            total={
              itemListData.length === 0 ? itemList.length : itemListData.length
            }
            pageLimit={pageLimit}
            page={page}
            viewBtn={viewBtn}
            setViewBtn={setViewBtn}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
