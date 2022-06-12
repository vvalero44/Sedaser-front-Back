import React, { useState, useEffect } from "react";
import "./ScrollButton.css";
export const ButtonScrollTop = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTopButton && (
        <button className="ScrollButtomTop btn" onClick={scrollUp}>
          <span className="material-icons">arrow_upward</span>
        </button>
      )}
    </div>
  );
};
