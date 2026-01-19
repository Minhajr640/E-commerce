import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { getAllCategories } from './services/productService';
import Product from './components/Product';
import CategoryProducts from './pages/CategoryProducts';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import SignInPage from './pages/SignInPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import privateApi from "./services/PrivateAxios";
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ShippingDetailsPage from './pages/ShippingDetailsPage';
import { useCallback } from 'react';

console.log("stripeKey: ", loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) )
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
console.log(stripePromise);
function App() {
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);


    const fetchProfile = useCallback(async (customerId) => {
    try {
      const response = await privateApi.get('/sense/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('customerId');
      setLoggedIn(false);
      setProfile(null);
    } }, []);


  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const customerId = localStorage.getItem('customerId');

    if(token && customerId) {
      setLoggedIn(true);
      fetchProfile(customerId);
    }
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([
          { id: 1, name: "Men's Clothing" },
          { id: 2, name: "Women's Clothing" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  

  
  const toggleCategories = () => {
    setShowCategories(!showCategories);
    setShowSearch(false); 
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowCategories(false); 
  };

  const closeCategories = () => {
    setShowCategories(false);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleLogout = (e) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('customerId');
    setLoggedIn(false);
    setProfile(null);
  }

  return (
    <Router>
      <div className="App">
        <header className="main-header">
          <div className="header-left">
            <button className="categories-btn" onClick={toggleCategories}>
              Categories
            </button>
            
            <button className="search-icon-btn" onClick={toggleSearch}>
              🔍
            </button>
          </div>
          
          <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
            <h1>SENSE</h1>
          </Link>
          
          {showCategories && (
            <div className="categories-dropdown">
              {loading ? (
                <p style={{padding: '10px'}}>Loading...</p>
              ) : (
                <ul>
                  {categories.map(category => (
                    <li key={category.id}>
                      <Link 
                        to={`/category/${category.name}`}
                        onClick={closeCategories}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {showSearch && (
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              closeSearch={closeSearch}
            />
          )}
          {!loggedIn && (
          <div className="header-right">
            <Link to="/signup">
            <button>Sign Up</button>
            </Link>
            <Link to="/login">
            <button>Log In</button></Link>
          </div>
          )}
          {loggedIn && (
            <div>
            <Link to="/cart" >
            <button className="home-button">Cart</button>
            </Link>
            <Link to="/profile">
            <button className="home-button">View Profile</button>
            </Link>
            <Link to="/">
            <button className="home-button"onClick={handleLogout}>Logout</button>
            </Link>
            </div>
          )}
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<CategoryProducts />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/signup" element={<SignInPage/>} />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setProfile={setProfile}/>}/>
            <Route path="/profile" element={<ProfilePage profile={profile} refreshProfile={fetchProfile}/>}/>
            <Route path="/cart" element={<CartPage profile={profile}/>}/>
            <Route path="/checkout/success" element={<CheckoutSuccessPage/>}/>
            <Route path="/checkout/shipping" element={<ShippingDetailsPage profile={profile}/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}


function SearchBar({ searchQuery, setSearchQuery, closeSearch }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      closeSearch();
    }
  };

  return (
    <div className="search-dropdown">
      <form onSubmit={handleSearch} className="search-form-popup">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input-popup"
          autoFocus
        />
        <button type="submit" className="search-submit-btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default App;