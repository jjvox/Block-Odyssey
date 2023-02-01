import axios from "axios";

export interface ItemType {
  id: number;
  title: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
}

const DUMMY_JSON_URL = "https://dummyjson.com/products";

export const getItemList = async (page: number) => {
  const result = await axios.get(DUMMY_JSON_URL + `?limit=${page}`);
  return result.data.products.map((item: ItemType) => {
    return {
      id: item.id,
      title: item.title,
      brand: item.brand,
      description: item.description,
      price: item.price,
      rating: item.rating,
      stock: item.stock,
    };
  });
};
