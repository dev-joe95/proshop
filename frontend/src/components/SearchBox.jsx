import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");
    const searchHandler = () => {
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push("/");
        }
    };
    return (
        <Form onSubmit={searchHandler}>
            <div className="d-flex align-content-center justify-content-center">
                <FormControl
                    type="search"
                    placeholder="Search ..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="inline-block"
                ></FormControl>
                <Button type="submit" variant="outline-light p-2">
                    <i className="fas fa-search px-2"></i>
                </Button>
            </div>
        </Form>
    );
};

export default SearchBox;
