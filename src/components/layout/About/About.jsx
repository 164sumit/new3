import React from 'react';
import './About.css'; // CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      <p className="about-info">
        My name is Sumit and you can reach me at <a href="mailto:164sumit20@gmail.com">164sumit20@gmail.com</a>.
      </p>
      <div className="website-info">
        <h3>CampusMart</h3>
        <p>
          CampusMart is a platform designed for students to buy and sell their necessary items. It provides a convenient way for students to connect and trade their belongings within their campus community.
        </p>
        <p>
          CampusMart is completely free of cost, allowing students to freely list and browse items without any fees or charges. Our goal is to make the process of buying and selling items easier and more accessible for students.
        </p>
      </div>
    </div>
  );
};

export default About;
