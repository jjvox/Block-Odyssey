import { ItemType } from "../api/axios";

interface ItemListProps {
  item: ItemType;
}

const ItemList = ({
  item: { id, title, brand, description, price, rating, stock },
}: ItemListProps) => {
  return (
    <tr className="table-tbody-tr">
      <td>{id}</td>
      <td>{title}</td>
      <td>{brand}</td>
      <td>{description.slice(0, 40)}...</td>
      <td>${price.toLocaleString()}</td>
      <td>{rating}</td>
      <td>{stock}</td>
    </tr>
  );
};

export default ItemList;
