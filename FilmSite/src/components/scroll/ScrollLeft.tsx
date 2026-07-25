import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { RefObject } from "react";

type ScrollButtonProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
};

export default function ScrollLeft({
  scrollRef,
}: ScrollButtonProps) {
  function scrollLeft() {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }

  return (
    <button
      className="scroll-button left"
      onClick={scrollLeft}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}