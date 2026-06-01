import PropTypes from "prop-types";
import { Menu } from "lucide-react";

const Navbar = ({
  title = "Dashboard",
  subtitle,
  onMenuClick,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="navbar-menu"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="navbar-heading">
          <h1 className="navbar-title">
            {title}
          </h1>

          {subtitle && (
            <p className="navbar-subtitle">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <div className="navbar-avatar">
            A
          </div>

          <div className="navbar-user-info">
            <span className="navbar-user-name">
             ADMIN
            </span>

            <span className="navbar-user-role">
              
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onMenuClick: PropTypes.func,
};

export default Navbar;