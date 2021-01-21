import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Form,
    Button,
    Alert,
    FormControl,
    Row,
    Col,
    Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { listCategories } from "../actions/categoryActions";
import axios from "axios";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [sale, setSale] = useState(0);
    const [brand, setBrand] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector((state) => state.productUpdate);
    const { categories } = useSelector((state) => state.categoryList);
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: "PRODUCT_UPDATE_RESET" });
            history.push("/admin/products");
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
                dispatch(listCategories());
            } else {
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setSale(product.sale);
                setBrand(product.brand);
                setImage(product.image);
                setCategory(product.category);
                setCountInStock(product.countInStock);
            }
        }
    }, [productId, dispatch, history, product, successUpdate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                description,
                price,
                sale,
                brand,
                image,
                category,
                countInStock,
            })
        );
    };
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };
            const { data } = await axios.post("/api/upload", formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };
    return (
        <React.Fragment>
            <Link className="btn btn-dark my-3" to="/admin/products">
                <i className="fas fa-chevron-left mx-1"></i>Go Back
            </Link>

            <h1 className="text-secondary">Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <React.Fragment>
                    <Row>
                        <Col md={8}>
                            <Form onSubmit={submitHandler}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Example:  Sample name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        autoFocus
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        placeholder="Example:  Sample Description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Example:  20"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Sale</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Example:  Sample sale"
                                        value={sale}
                                        onChange={(e) =>
                                            setSale(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Example:  Sample brand"
                                        value={brand}
                                        onChange={(e) =>
                                            setBrand(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Count in stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Example:  10"
                                        value={countInStock}
                                        onChange={(e) =>
                                            setCountInStock(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="dark"
                                    className="my-3"
                                >
                                    Update
                                </Button>
                            </Form>
                        </Col>
                        <Col md={4}>
                            {" "}
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <FormControl
                                    as="select"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    {categories.map((category, index) => (
                                        <option
                                            key={index}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </FormControl>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.File
                                    id="exampleFormControlFile1"
                                    label="Choose Image"
                                    custom
                                    onChange={uploadFileHandler}
                                />
                                {uploading && <Loader dimension="20px" />}
                                <Form.Control
                                    type="text"
                                    placeholder="Example:  /image/abc.png"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Image src={image} alt={name} fluid />
                        </Col>
                    </Row>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default ProductEditScreen;
