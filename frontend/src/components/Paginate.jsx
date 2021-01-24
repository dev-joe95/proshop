import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x, index) => (
                    <LinkContainer
                        key={index}
                        to={
                            isAdmin
                                ? `/admin/products/${x + 1}`
                                : keyword
                                ? `/search/${keyword}/pageNumber/${page}`
                                : `/pageNumber/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;
