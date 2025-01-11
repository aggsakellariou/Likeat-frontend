import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "../components/login/SignInUp";
import "./Navbar.css";
import homeIcon from "../logo7.png";
import { useAuth } from "../context/AuthContext";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const Auth = useAuth();
  const user = Auth.user;
  const logOut = Auth.logOut;
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const AdminLinks = () => (
    <div className="navbar-option">
      <Link to="/dashboard" className={`navbar-input ${isActive("/dashboard") ? "checked" : ""}`}>
        <div className="navbar-btn">
          <span className="navbar-span">Dashboard</span>
        </div>
      </Link>
    </div>
  );

  const CustomerLinks = () => (
    <div className="navbar-option">
      <Link
        to="/customer/reviews"
        className={`navbar-input ${isActive("/customer/reviews") ? "checked" : ""}`}
      >
        <div className="navbar-btn">
          <span className="navbar-span">Reviews</span>
        </div>
      </Link>
    </div>
  );

  const ClientLinks = () => (
    <div className="navbar-option">
      <Link
        to="/client/restaurants"
        className={`navbar-input ${isActive("/client/restaurants") ? "checked" : ""}`}
      >
        <div className="navbar-btn">
          <span className="navbar-span">Restaurants</span>
        </div>
      </Link>
    </div>
  );

  // Mobile Navbar
  if (isMobile) {
    return (
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#e4e6e8" }}>
        <div className="container-fluid">
          {/* Home Icon */}
          <Link to="/" className="navbar-brand">
            <img src={homeIcon} alt="Home" className="navbar-icon" />
          </Link>

          {!user ? (
            <div className="navbar-option sign">
              <Login />
            </div>
          ) : (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#navbarOffcanvas"
                aria-controls="navbarOffcanvas"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="navbarOffcanvas"
                aria-labelledby="navbarOffcanvasLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="navbarOffcanvasLabel">
                    Menu
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    
                    {user && (
                      <div className="navbar-option">
                      <Link to="/" className={`navbar-input ${isActive('/') ? 'checked' : ''}`}>
                        <div className="navbar-btn">
                          <span className="navbar-span">Home</span>
                        </div>
                      </Link>
                    </div>
                    )}
                    {user && user.roles.includes("ADMIN") && <AdminLinks />}
                    {user && user.roles.includes("CUSTOMER") && <CustomerLinks />}
                    {user && user.roles.includes("CLIENT") && <ClientLinks />}
                    {user && (
                      <>
                        <div className="navbar-option">
                          <Link to="/profile" className={`navbar-input ${isActive('/profile') ? 'checked' : ''}`}>
                            <div className="navbar-btn">
                              <span className="navbar-span">My Profile</span>
                            </div>
                          </Link>
                        </div>
                        <div className="navbar-option logout">
                          <button className="navbar-input navbar-btn" onClick={handleLogout}>
                            <span className="navbar-span">Logout</span>
                          </button>
                        </div>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </>
          )}
          
        </div>
      </nav>
    );
  }

  // Desktop Navbar
  return (
    <div className="navbar-wrapper">
      <div className="navbar-left">
        <div className={`navbar-option home ${isActive("/") ? "checked" : ""}`}>
          <Link to="/" className="navbar-input">
            <div className="navbar-btn">
              <img src={homeIcon} alt="Home" className="navbar-icon" />
            </div>
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        {!user && (
          <div className="navbar-option sign">
            <Login />
          </div>
        )}
        {user && user.roles.includes("ADMIN") && <AdminLinks />}
        {user && user.roles.includes("CUSTOMER") && <CustomerLinks />}
        {user && user.roles.includes("CLIENT") && <ClientLinks />}
        {user && (
          <>
            <div className="navbar-option">
              <Link
                to="/profile"
                className={`navbar-input ${isActive("/profile") ? "checked" : ""}`}
              >
                <div className="navbar-btn">
                  <span className="navbar-span">My Profile</span>
                </div>
              </Link>
            </div>
            <div className="navbar-option logout">
              <button className="navbar-input navbar-btn" onClick={handleLogout}>
                <span className="navbar-span">Logout</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;