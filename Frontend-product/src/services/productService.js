import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});



export const getAllCategories = async () => {
    const response = await api.get('/categories');
    console.log(response); //for debug
    return response.data;
};


export const getAllProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};


export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};


export const getProductsByGender = async (gender) => {
    const response = await api.get(`/products/gender/${gender}`);
    return response.data;
};


export const getProductsByCategory = async (categoryName) => {
    const response = await api.get(`/products/category/${categoryName}`);
    return response.data;
};


export const searchProductsByName = async (name) => {
    const response = await api.get(`/products/search/${name}`);
    return response.data;
};


export const getProductsByPriceRange = async (minPrice, maxPrice) => {
    const response = await api.get(`/products/price-range/${minPrice}/${maxPrice}`);
    return response.data;
};

export default api;