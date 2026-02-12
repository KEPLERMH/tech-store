import type { ProductsResponse } from "../types/product";
import type { Product } from "../types/product";
const API_URL = 'https://dummyjson.com/products';

export const getProducts = async (): Promise<ProductsResponse> => {

    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Error http  ${res.status}, no se pudo obtener el producto`)
    return res.json();
}

export const getProducById = async (id: string | number): Promise<Product> => {
    const res = await fetch(API_URL.concat(`/${id}`));
    if (!res.ok) throw new Error(`Error http  ${res.status}, no se pudo obtener el producto`)
    return res.json();

}