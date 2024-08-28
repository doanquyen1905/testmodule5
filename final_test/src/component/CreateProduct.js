import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as productService from "../service/ProductService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        productCode: "",
        name: "",
        categoryId: "",
        price: 0,
        quantity: 0,
        dateReceived: "",
        description: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let resData = await productService.getAllProducts();
                // Ensure the 'category' field is correctly set
                setCategories(resData.category || []);
            } catch (e) {
                toast.error("Lấy danh sách loại sản phẩm thất bại");
            }
        };
        fetchData();
    }, []);

    const saveProduct = async (values) => {
        values.quantity = +values.quantity; // Ensure quantity is a number
        let isSuccess = await productService.saveProduct(values);
        if (isSuccess) {
            toast.success("Thêm mới thành công");
            navigate("/product");
        } else {
            toast.error("Thêm mới thất bại.");
        }
    };

    const validationSchema = Yup.object({
        productCode: Yup.string()
            .matches(/^PROD\d{4}$/, "Mã sản phẩm phải đúng định dạng PROD-XXXX (với XXXX là các số)")
            .required("Mã sản phẩm không để trống"),
        name: Yup.string()
            .required("Tên sản phẩm không được để trống"),
        categoryId: Yup.string()
            .required("Loại sản phẩm không được để trống"),
        dateReceived: Yup.date()
            .max(new Date(), "Ngày nhập không được lớn hơn ngày hiện tại")
            .required("Chọn ngày nhập"),
        quantity: Yup.number()
            .integer("Số lượng phải là số nguyên")
            .min(1, "Số lượng sản phẩm phải lớn hơn 0")
            .required("Số lượng sản phẩm không được để trống"),
        price: Yup.number()
            .positive("Giá phải lớn hơn 0")
            .required("Giá không được để trống")
    });

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Thêm Sản Phẩm Mới</h1>
            <Formik
                initialValues={{form}}
                onSubmit={saveProduct}
                validationSchema={validationSchema}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="productCode" className="form-label">Product Code</label>
                        <Field id="productCode" name="productCode" className="form-control"/>
                        <ErrorMessage name="productCode" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <Field id="name" name="name" className="form-control"/>
                        <ErrorMessage name="name" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryId" className="form-label">Category</label>
                        <Field as="select" id="categoryId" name="categoryId" className="form-control">
                            <option value="">Chọn thể loại</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="categoryId" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <Field type="number" id="price" name="price" className="form-control"/>
                        <ErrorMessage name="price" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <Field type="number" id="quantity" name="quantity" className="form-control"/>
                        <ErrorMessage name="quantity" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateReceived" className="form-label">Date Received</label>
                        <Field type="date" id="dateReceived" name="dateReceived" className="form-control"/>
                        <ErrorMessage name="dateReceived" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <Field type="text" id="description" name="description" className="form-control"/>
                        <ErrorMessage name="description" component="div" className="text-danger"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Thêm mới</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateProduct;
