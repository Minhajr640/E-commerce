import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
//productsList accepts {products} as a prop.
//productLists list of product depends on what the currentPage value is.
//Changes in currentPage value trigger the indexes of products shown to change.
function ProductList({ products }) {             
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    if (!products || products.length === 0) {
        return <div className="no-products">No products found in this category.</div>;
    }

    // Calculate pagination
    //calculate the index of last product. (On page 2 indexOfLastProduct = 2*6(productsPerPage) so indexofLastProduct is 12.)
    const indexOfLastProduct = currentPage * productsPerPage;
    //calc index of first product for the page.(indexOfFirstProduct on page 2 is 6.(12-6=6)) 
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    //current list of products based on page number.
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    //total nuber of pages Math.ceil wll turn 1.7 into 2 to show 2 pages for all products instead of decimal value as page number.
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Change page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="product-list-container">
            <div className="product-grid">
                {currentProducts.map(product => (          //ProductList components view depends on what currentProducts state is.   
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p className="category">{product.category?.name || 'No Category'}</p>
                        <p className="price">${product.price.toFixed(2)}</p>
                        <p className="stock">Stock: {product.stockQuantity}</p>
                        <Link to={`/product/${product.id}`}>
                            <button className="view-details">View Details</button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Controls page numbers which triggers currentProducts values to change.*/}
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={goToPreviousPage} 
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>

                    <div className="page-numbers">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => goToPage(index + 1)}
                                className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={goToNextPage} 
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            )}

            <div className="pagination-info">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
            </div>
        </div>
    );
}

export default ProductList;