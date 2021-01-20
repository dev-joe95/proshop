import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
    listCategoryDetails,
    updateCategory,
} from "../actions/categoryActions";

const CategoryEditScreen = ({ match, history }) => {
    const categoryId = match.params.id;
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const { loading, error, category } = useSelector(
        (state) => state.categoryDetails
    );
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector((state) => state.categoryUpdate);
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: "CATEGORY_UPDATE_RESET" });
            history.push("/admin/categories");
        } else {
            if (!category.name || category._id !== categoryId) {
                dispatch(listCategoryDetails(categoryId));
            } else {
                setName(category.name); 
            }
        }
    }, [categoryId, dispatch, history, category, successUpdate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateCategory({ _id: categoryId, name }));
    };
    return (
        <React.Fragment>
            <Link className="btn btn-dark my-3" to="/admin/categories">
                <i className="fas fa-chevron-left mx-1"></i>Go Back
            </Link>

            <h1 className="text-secondary">Edit Category</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <React.Fragment>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Example:  Sample name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="dark" className="my-3">
                            Update
                        </Button>
                    </Form>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default CategoryEditScreen;
