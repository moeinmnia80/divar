import { useEffect } from "react";

const useHideScrollbar = (isOpen) => {
  useEffect(() => {
    isOpen && document.body.classList.add(`location-modal-overflow`);
    return () => {
      isOpen && document.body.classList.remove(`location-modal-overflow`);
    };
  }, [isOpen]);
};

export { useHideScrollbar };
