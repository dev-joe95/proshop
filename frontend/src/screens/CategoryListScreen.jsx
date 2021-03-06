import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    listCategories,
    deleteCategory,
    createCategory,
} from "../actions/categoryActions";
import Loader from "../components/Loader";
import { getCurrentUser } from "../getUserInfo";

const CategoryListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userLogin);
    const { loading, categories, error } = useSelector(
        (state) => state.categoryList
    );
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = useSelector((state) => state.categoryDelete);
    const {
        loading: loadingCreate,
        error: errorCreate,
        category: createdCategory,
        success: successCreate,
    } = useSelector((state) => state.categoryCreate);
    useEffect(() => {
        dispatch({ type: "CATEGORY_CREATE_RESET" });
        if (!token && !getCurrentUser(token).isAdmin) {
            history.push("/login");
        } else {
            if (successCreate) {
                history.push(`/admin/categories/${createdCategory._id}/edit`);
            } else {
                dispatch(listCategories());
            }
        }
    }, [
        dispatch,
        token,
        history,
        successDelete,
        successCreate,
        createdCategory,
    ]);
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure")) {
            dispatch(deleteCategory(id));
        }
    };
    const addCategoryHandler = () => {
        dispatch(createCategory());
    };
    return (
        <React.Fragment>
            <Row className="align-items-center">
                <Col>
                    <h1>Categories</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={addCategoryHandler}>
                        <i className="fas fa-plus mx-1"></i>Create Category
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories &&
                            categories.map((category, index) => (
                                <tr key={index}>
                                    <td>{category._id}</td>
                                    <td>{category.name}</td>
                                    <td className="d-flex">
                                        <LinkContainer
                                            to={`/admin/categories/${category._id}/edit`}
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
                                                deleteHandler(category._id)
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

export default CategoryListScreen;
