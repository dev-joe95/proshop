import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    listProducts,
    deleteProduct,
    createProduct,
} from "../actions/productActions";
import Loader from "../components/Loader";
import { getCurrentUser } from "../getUserInfo";

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userLogin);
    const { loading, products, error } = useSelector(
        (state) => state.productList
    );
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = useSelector((state) => state.productDelete);
    const {
        loading: loadingCreate,
        error: errorCreate,
        product: createdProduct,
        success: successCreate,
    } = useSelector((state) => state.productCreate);

    useEffect(() => {
        dispatch({ type: "PRODUCT_CREATE_RESET" });
        if (token && getCurrentUser(token).isAdmin) {
            dispatch(listProducts());
        } else {
            history.push("/login");
        }
        if (successCreate) {
            history.push(`/admin/products/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts());
        }
    }, [
        dispatch,
        token,
        history,
        successDelete,
        successCreate,
        createdProduct,
    ]);
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure")) {
            dispatch(deleteProduct(id));
        }
    };
    const addProductHandler = () => {
        dispatch(createProduct());
    };
    return (
        <React.Fragment>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={addProductHandler}>
                        <i className="fas fa-plus mx-1"></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader dimension="30px" />}
            {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
            {loadingCreate && <Loader dimension="30px" />}
            {errorCreate && <Alert variant="danger">{errorCreate}</Alert>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table striped hover responsive bordered size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>SALE</th>
                            <th>BRAND</th>
                            <th>SELLER</th>
                            <th>CATEGORY</th>
                            <th>IN STOCK</th>
                            <th>RATING</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.sale}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.user.name}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                                        {product.countInStock ? (
                                            product.countInStock
                                        ) : (
                                            <i className="fas fa-times text-danger"></i>
                                        )}
                                    </td>
                                    <td>{product.rating}</td>
                                    <td className="d-flex">
                                        <LinkContainer
                                            to={`/admin/products/${product._id}/edit`}
                                        >
                                            <Button
                                                variant="info"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            )}
        </React.Fragment>
    );
};

export default ProductListScreen;
