import React from "react";

const Footer = ({ items, fetchError }) => {
  const today = new Date();
  return (
    <footer className="footer">
      <p>
        {!fetchError ? items.length : 0} todo{" "}
        {items.length > 1 ? "items" : "item"}
      </p>
      <p className="copyright">
        Copyright &copy; Auraqule {today.getFullYear()}{" "}
      </p>
    </footer>
  );
};

export default Footer;
