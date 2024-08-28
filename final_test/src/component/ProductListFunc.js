import {useEffect, useState} from "react";
import * as productService from "../service/ProductService";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductListFunc() {
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        getAllProducts(name);
    }, [name]);

    const getAllProducts = async (name) => {
        try {
            let res = await productService.getAllProducts(name);
            if (res.products) {
                res.products.sort((a, b) => a.name.localeCompare(b.name));
                setProduct(res.products);
            }
            if (res.category) {
                setCategory(res.category);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };
    const getCategoryName = (categoryId) => {
        console.log("Category ID:", categoryId);
        console.log("Categories:", category);
        if (!category || category.length === 0) {
            return 'Unknown';
        }
        const cate = category.find(g => g.id === categoryId);
        return cate ? cate.name : 'Unknown';
    };
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    return (
        <div className="container mt-4">
            <h2>Danh sách Sản phẩm</h2>
            <Link to="/create" className="btn btn-success mb-3">Thêm mới</Link>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3"
                placeholder="Tìm kiếm theo tên"
            />
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên Sản phẩm</th>
                    <th>Mã Sản Phẩm</th>
                    <th>Loại sản phẩm</th>
                    <th>Ngày nhập</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <th>{item.productCode}</th>
                        <td>{getCategoryName(item.id)}</td>
                        <td>{formatDate(item.dateReceived)}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductListFunc;