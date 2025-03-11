import { createPortal } from "react-dom";
import { HiOutlineXCircle } from "react-icons/hi";

function Modal({ open, onClose, title, children, description = "" }) {
  return (
    open &&
    createPortal(
      <div
        className="backdrop-blur-sm fixed top-0 left-0
           w-full h-screen bg-secondary-100 bg-opacity-10 z-50"
      >
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-lg bg-white p-4 shadow-lg transition-all duration-500 ease-out
        w-[calc(100vw-2rem)] md:max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          <div
            className="flex items-center justify-between border-b 
          border-b-secondary-300 pb-2 mb-6"
          >
            <div>
              <p className="text-secondary-700 font-bold text-base">{title}</p>
              <p className="text-secondary-400 text-sm lg:text-base">
                {description}
              </p>
            </div>
            <button onClick={onClose}>
              <HiOutlineXCircle className="w-5 h-5 text-secondary-500" />
            </button>
          </div>
          {children}
        </div>
      </div>,
      document.body
    )
  );
}
export default Modal;
