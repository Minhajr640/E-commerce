import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Filter.css';



// Filter() component sets new URLSearchParams which triggers CategoryProducts' side effect to run and return a new productlist.
//filter doesnt perform any api calls but changes state which triggers the api call from CategoryProduct.
function Filter() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        
        if (!minPrice && !maxPrice) {           //alerts when filter is submitted without any values.
            alert('Please enter at least one price value');
            return;
        }

        const min = minPrice || 0;            //if min is entered but max is not, set 999999 for max and vice versa.
        const max = maxPrice || 999999;

        // Keep the current path and add filter params
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('minPrice', min);
        searchParams.set('maxPrice', max);
        
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    const clearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        // Remove price params from URL
        navigate(location.pathname);
    };

    return (
        <div className="filter-container">
            <h3 className="filter-title">Filters</h3>
            
            <form onSubmit={handleFilterSubmit} className="filter-form">
                <div className="filter-group">
                    <label>Price Range</label>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="filter-input"
                        min="0"
                        step="0.01"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="filter-input"
                        min="0"
                        step="0.01"
                    />
                </div>

                <button type="submit" className="filter-submit-btn">
                    Apply Filters
                </button>
                
                <button 
                    type="button" 
                    onClick={clearFilters} 
                    className="filter-clear-btn"
                >
                    Clear Filters
                </button>
            </form>
        </div>
    );
}

export default Filter;