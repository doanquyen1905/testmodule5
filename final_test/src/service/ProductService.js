import axios from "axios";

const URL_PRODUCT = "http://localhost:8080/products"
const URL_CATEGORY = "http://localhost:8080/category"
export const getAllProducts = async (name) => {
    try {
        let resProduct = await axios.get(URL_PRODUCT+"?name_like="+name);
        let resCategory = await axios.get(URL_CATEGORY)
        return {
            products: resProduct.data,
            category: resCategory.data
        } ;
    } catch (e) {
        console.log(e);
        return {products: [], category: []};
    }

}
export const saveProduct = async(product)=> {
    try{
        let res = await axios.post(URL_PRODUCT, product);
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}