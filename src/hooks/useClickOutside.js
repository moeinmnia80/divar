import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
  let domeNode = useRef();
  useEffect(() => {
    const maybeHandler = (e) => {
      if (!domeNode.current?.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, []);
  return domeNode;
};

export default useClickOutside;
