import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "../../styles/ScrollUp.css";

export default function ScrollUp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      id="myBtn"
      title="Go to top"
      onClick={scrollToTop}
      style={{
        display: visible ? "block" : "none",
      }}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}