import { useState, useContext ,useEffect } from "react";
import axios from "axios";

import { assets } from "../../assets/assets";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { StoreContext } from "../../Context/StoreContextDefinition";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const [showSearch, setShowSearch] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
    url,
    searchTerm,
    setSearchTerm,
  } = useContext(StoreContext);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchProfileName = async () => {
      try {
        const response = await axios.get(`${url}/api/user/profile`, {
          headers: { token },
        });

        if (response.data.success) {
          setProfileName(response.data.data.name || "");
        }
      } catch {
        setProfileName("");
      }
    };

    fetchProfileName();
  }, [token, url]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCheckoutFlow = ["/cart", "/order", "/verify"].includes(pathname);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProfileName("");
    navigate("/");
  };

  // Close search and reset everything
  const closeSearch = () => {
    setShowSearch(false);
    setSearchTerm("");
    setHasSearched(false);
  };

  const closeMobileMenu = () => setShowMobileMenu(false);

  const getInitials = (name) => {
    const nameParts = name.trim().split(/\s+/).filter(Boolean);

    if (nameParts.length < 2) {
      return nameParts[0]?.slice(0, 2).toUpperCase() || "";
    }

    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  };

  return (
   <div className={`sticky top-0 z-[1000] flex items-center justify-between bg-white px-[1%] py-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 max-[750px]:py-3 ${scrolled ? "bg-[#fff0eb] shadow-[0_4px_15px_rgba(0,0,0,0.08)]" : ""}`}>

      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="ZaykaWala" className="block w-[180px] max-[1050px]:w-[140px] max-[900px]:w-[120px] max-[750px]:w-[135px]" />
      </Link>

      {/* Navigation Menu */}
      {!isCheckoutFlow && (
      <ul className="flex list-none gap-5 text-lg text-[#49557e] max-[1050px]:text-[17px] max-[900px]:gap-[15px] max-[900px]:text-base max-[750px]:hidden">

        <a
            href="#home"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "border-b-2 border-[#49557e] pb-0.5" : ""}
          >
        
          Home
        </a>

        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "border-b-2 border-[#49557e] pb-0.5" : ""}
        >
          Menu
        </a>

        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "border-b-2 border-[#49557e] pb-0.5" : ""}
        >
          Mobile-App
        </a>

        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "border-b-2 border-[#49557e] pb-0.5" : ""}
        >
          Contact us
        </a>

      </ul>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-10 max-[1050px]:gap-[30px] max-[900px]:gap-5 max-[750px]:gap-3">

        {/* ORIGINAL SEARCH ICON */}
        {!isCheckoutFlow && (
          <img
            src={assets.search_icon}
            className="w-6 cursor-pointer max-[900px]:w-5"
            onClick={() => setShowSearch(!showSearch)}
            alt="Search"
          />
        )}

        {/* Cart */}
        {token && (
          <div className={`relative ${!isCheckoutFlow ? "max-[750px]:hidden" : ""}`}>
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Cart" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "absolute -right-2 -top-2 min-h-2.5 min-w-2.5 rounded-full bg-[tomato]"}></div>
          </div>
        )}

        {/* Login / Profile */}
        {!token ? (
          <button className={`inline-flex h-10 min-w-[82px] shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-[tomato] bg-transparent px-[18px] text-base text-[#49557e] transition hover:bg-[#fff4f2] max-[1050px]:min-w-[78px] max-[1050px]:px-[15px] max-[900px]:h-9 max-[900px]:min-w-[72px] max-[900px]:px-3 max-[900px]:text-[15px] ${!isCheckoutFlow ? "max-[750px]:hidden" : ""}`} onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className={`relative ${!isCheckoutFlow ? "max-[750px]:hidden" : ""}`}>

            <button type="button" className="flex cursor-pointer items-center justify-center border-none bg-transparent p-0" onClick={() => setShowProfileMenu((current) => !current)}>
              {profileName ? (
                <span className="flex size-9 items-center justify-center rounded-full bg-[#fff0eb] text-sm font-semibold text-[tomato]" aria-label="Open profile menu">
                  {getInitials(profileName)}
                </span>
              ) : (
                <span className="flex size-9 items-center justify-center rounded-full bg-[#fff0eb] text-sm font-semibold text-[tomato]" aria-label="Open profile menu">
                  U
                </span>
              )}
            </button>

            {showProfileMenu && (
            <ul className="absolute right-0 top-full z-[1001] mt-3 flex min-w-[190px] list-none flex-col gap-2 rounded-lg border border-[#ffd0c7] bg-white p-3 shadow-lg">

              <li className="flex cursor-pointer items-center gap-2.5 rounded px-3 py-2.5 hover:bg-[#fff0eb] hover:text-[tomato]" onClick={() => { setShowProfileMenu(false); navigate("/profile"); }}>
                <svg className="size-5 text-[tomato]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="8" r="3" />
                  <path d="M5.5 19c.8-3 3.1-4.5 6.5-4.5s5.7 1.5 6.5 4.5" strokeLinecap="round" />
                </svg>
                <p>My Profile</p>
              </li>

              <li className="flex cursor-pointer items-center gap-2.5 rounded px-3 py-2.5 hover:bg-[#fff0eb] hover:text-[tomato]" onClick={() => { setShowProfileMenu(false); navigate("/edit-profile"); }}>
                <svg className="size-5 text-[tomato]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M13.5 5.5 18.5 10.5M4.5 19.5l1-4.2L16.8 4a1.8 1.8 0 0 1 2.5 0l.7.7a1.8 1.8 0 0 1 0 2.5L8.7 18.5l-4.2 1Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Edit Profile</p>
              </li>

              <li className="flex cursor-pointer items-center gap-2.5 rounded px-3 py-2.5 hover:bg-[#fff0eb] hover:text-[tomato]" onClick={() => { setShowProfileMenu(false); navigate("/myorders"); }}>
                <img className="w-5" src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>

              <hr className="my-1 border-[#eee]" />

              <li className="flex cursor-pointer items-center gap-2.5 rounded px-3 py-2.5 hover:bg-[#fff0eb] hover:text-[tomato]" onClick={() => { setShowProfileMenu(false); logout(); }}>
                <img className="w-5" src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>

            </ul>
            )}

          </div>
        )}

        {!isCheckoutFlow && (
          <button
            type="button"
            className="hidden cursor-pointer border-0 bg-transparent p-1 text-[#49557e] max-[750px]:block"
            onClick={() => setShowMobileMenu((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={showMobileMenu}
          >
            <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {showMobileMenu ? <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" /> : <><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></>}
            </svg>
          </button>
        )}

      </div>

      {showMobileMenu && !isCheckoutFlow && (
        <nav className="absolute right-0 top-full flex w-[min(calc(100vw-2rem),320px)] flex-col gap-1 rounded-b-xl border border-t-0 border-[#ffe0d9] bg-white p-3 text-base text-[#49557e] shadow-lg min-[751px]:hidden">
          {token ? (
            <>
              <Link to="/cart" className="flex items-center gap-3 rounded px-4 py-3 hover:bg-[#fff0eb]" onClick={closeMobileMenu}>
                <img className="size-5" src={assets.basket_icon} alt="" />
                Cart
              </Link>
              <Link to="/profile" className="flex items-center gap-3 rounded px-4 py-3 hover:bg-[#fff0eb]" onClick={closeMobileMenu}>
                <svg className="size-5 text-[tomato]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="8" r="3" />
                  <path d="M5.5 19c.8-3 3.1-4.5 6.5-4.5s5.7 1.5 6.5 4.5" strokeLinecap="round" />
                </svg>
                My Profile
              </Link>
              <Link to="/edit-profile" className="flex items-center gap-3 rounded px-4 py-3 hover:bg-[#fff0eb]" onClick={closeMobileMenu}>
                <svg className="size-5 text-[tomato]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M13.5 5.5 18.5 10.5M4.5 19.5l1-4.2L16.8 4a1.8 1.8 0 0 1 2.5 0l.7.7a1.8 1.8 0 0 1 0 2.5L8.7 18.5l-4.2 1Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Edit Profile
              </Link>
              <Link to="/myorders" className="flex items-center gap-3 rounded px-4 py-3 hover:bg-[#fff0eb]" onClick={closeMobileMenu}>
                <img className="size-5" src={assets.bag_icon} alt="" />
                Orders
              </Link>
              <button type="button" className="flex items-center gap-3 rounded px-4 py-3 text-left hover:bg-[#fff0eb]" onClick={() => { closeMobileMenu(); logout(); }}>
                <img className="size-5" src={assets.logout_icon} alt="" />
                Logout
              </button>
            </>
          ) : (
            <button type="button" className="rounded px-4 py-3 text-left hover:bg-[#fff0eb]" onClick={() => { closeMobileMenu(); setShowLogin(true); }}>Sign In</button>
          )}
        </nav>
      )}

      {/* ORIGINAL CENTERED SEARCH PANEL */}
      {showSearch && !isCheckoutFlow && (
        <div className="absolute left-1/2 top-full z-[1001] flex w-[420px] max-w-[90vw] -translate-x-1/2 items-center gap-3 rounded-b-xl bg-white px-5 py-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.12)] max-[900px]:w-[350px] max-[750px]:w-[90%]">

          <img className="h-5 w-5" src={assets.search_icon} alt="" />

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
            className="w-full border-none bg-transparent text-base text-[#333] outline-none"
            autoFocus
          />

          {/* NEW X BUTTON ONLY */}
          <span
            className="cursor-pointer text-[26px] leading-none text-[#777] transition hover:scale-110 hover:text-[tomato]"
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