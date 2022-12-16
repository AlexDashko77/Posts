import { usePagination } from "../../hooks/usePagination";
import React from 'react';

const Pagination = ({totalPages, page, changePage}) => {
    const pagesArray = usePagination(totalPages);

    return (
        <div className="page__wrapper">
            {pagesArray.map((el) => (
                <span
                    onClick={() => changePage(el)}
                    className={page === el ? 'page page__current' : 'page'}
                    key={el}>
                    {el}
                </span>
            ))}
        </div>
    );
}

export default Pagination;