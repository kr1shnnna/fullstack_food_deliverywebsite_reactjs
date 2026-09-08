import { useState, useContext ,useEffect } from "react";

import "./Navbar.css";

import { assets } from "../../assets/assets";

import { Link, useNavigate } from "react-router-dom";

import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const [showSearch, setShowSearch] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

  const handleScroll = () => {

    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };

}, []);

  const {
    getTotalCartAmount,
    token,
    setToken,
    searchTerm,
    setSearchTerm,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Close search and reset everything
  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
    setHasSearched(false);
  };

  return (
   <div className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      {/* Navigation Menu */}
      <ul className="navbar-menu">

        <a
            href="#home"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
          >
        
          Home
        </a>

        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </a>

        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>

      </ul>

      {/* Right Side */}
      <div className="navbar-right">

        {/* ORIGINAL SEARCH ICON */}
        <img
          src={assets.search_icon}
          className="search-icon"
          onClick={() => setShowSearch(!showSearch)}
          alt="Search"
        />

        {/* Cart */}
        <div className="navbar-search-icon">

          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

        </div>

        {/* Login / Profile */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">

            <img src={assets.profile_icon} alt="" />

            <ul className="navbar-profile-dropdown">

              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>

            </ul>

          </div>
        )}

      </div>

      {/* ORIGINAL CENTERED SEARCH PANEL */}
      {showSearch && (
        <div className="search-panel">

          <img src={assets.search_icon} alt="" />

          <input
            type="text"
            placeholder="Search for your favourite food..."
            value={searchTerm}
            onChange={(e) => {

              setSearchTerm(e.target.value);

              if (e.target.value && !hasSearched) {

                setHasSearched(true);

                setTimeout(() => {
                  const foodDisplay =
                    document.getElementById("food-display");

                  if (foodDisplay) {

                    const navbarHeight = 160;

                    const position =
                      foodDisplay.getBoundingClientRect().top +
                      window.pageYOffset -
                      navbarHeight;

                    window.scrollTo({
                      top: position,
                      behavior: "smooth",
                    });
                  }

                }, 100);

              }

              if (!e.target.value) {
                setHasSearched(false);
              }

            }}
            autoFocus
          />

          {/* NEW X BUTTON ONLY */}
          <span
            className="search-close"
            onClick={closeSearch}
          >
            ×
          </span>

        </div>
      )}

    </div>
  );
};

export default Navbar;