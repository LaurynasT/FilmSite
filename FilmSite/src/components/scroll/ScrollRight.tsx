import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { RefObject } from "react";

type ScrollButtonProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
};

export default function ScrollRight({
  scrollRef,
}: ScrollButtonProps) {
  function scrollRight() {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }

  return (
    <button
      className="scroll-button right"
      onClick={scrollRight}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
}