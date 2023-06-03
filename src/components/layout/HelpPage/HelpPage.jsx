import React, { useState } from 'react';
import './HelpPage.css'; // Import CSS file for styling
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons
import LoginImage from "../../../assets/LoginPage.png"
const HelpPage = () => {
  const [activeSection, setActiveSection] = useState('login');
  const [activeItem, setActiveItem] = useState('');

  const handleSectionClick = (section) => {
    setActiveSection(section === activeSection ? '' : section);
  };
  const handleItemClick = (item) => {
    setActiveItem(item === activeItem ? '' : item);
  };

  return (
    <div className="help-container">
      <h2>Help</h2>
      <section>
        <h3 onClick={() => handleSectionClick('login')}>
          Login Help
          {activeSection === 'login' ? (
            <FaAngleUp className="icon" />
          ) : (
            <FaAngleDown className="icon" />
          )}
        </h3>
        {activeSection === 'login' && (
          <ul>
            <li onClick={() => handleItemClick('forgetPassword')}>Forget Password</li>
            <li onClick={() => handleItemClick('changePassword')}>Change Password</li>
            <li onClick={() => handleItemClick('internalServerError')}>Internal Server Error</li>
          </ul>
        )}
        {activeItem === 'forgetPassword' && (
          <div className="help-item">
            <h4>Forget Password</h4>
            <p>Instructions and information about forget password.</p>
            {/* Desktop view image */}
            <img
                style={{maxWidth:"90%"}}
              className="desktop-image"
              src={LoginImage}
              alt="Forget Password (Desktop)"
            />
            {/* Mobile view image */}
            <img
              className="mobile-image"
              src="path_to_mobile_image"
              alt="Forget Password (Mobile)"
            />
          </div>
        )}
        {activeItem === 'changePassword' && (
          <div className="help-item">
            <h4>Change Password</h4>
            <p>Instructions and information about changing password.</p>
            {/* Add relevant image */}
            <img src="path_to_image" alt="Change Password" />
          </div>
        )}
        {activeItem === 'internalServerError' && (
          <div className="help-item">
            <h4>Internal Server Error</h4>
            <p>Instructions and information about internal server error.</p>
            {/* Add relevant image */}
            <img src="path_to_image" alt="Internal Server Error" />
          </div>
        )}
      </section>
      <section>
        <h3 onClick={() => handleSectionClick('register')}>
          Register Help
          {activeSection === 'register' ? (
            <FaAngleUp className="icon" />
          ) : (
            <FaAngleDown className="icon" />
          )}
        </h3>
        {activeSection === 'register' && (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu
            semper lectus. In euismod leo a ligula interdum, sed feugiat orci
            sagittis. Fusce convallis tincidunt odio at accumsan.
          </p>
        )}
      </section>
      <section>
        <h3 onClick={() => handleSectionClick('ad')}>
          Ad Help
          {activeSection === 'ad' ? (
            <FaAngleUp className="icon" />
          ) : (
            <FaAngleDown className="icon" />
          )}
        </h3>
        {activeSection === 'ad' && (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu
            semper lectus. In euismod leo a ligula interdum, sed feugiat orci
            sagittis. Fusce convallis tincidunt odio at accumsan.
          </p>
        )}
      </section>
    </div>
  );
};

export default HelpPage;
