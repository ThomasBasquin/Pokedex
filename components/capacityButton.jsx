import React, { useState, useEffect } from "react";
import classNames from "classnames";

const CapacityButton = ({ color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dynamicSecondaryColorClass = classNames(
    "rounded-full",
    "text-white",
    "py-3",
    "px-7",
    "shadow-lg",
    color
  );

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const buttonClasses = classNames(
    "tracking-wide",
    "font-normal",
    "text-base",
    "mr-5",
    "transition-transform",
    "duration-100   ",
    "active:scale-95"
  );

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={buttonClasses}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <span className={dynamicSecondaryColorClass}>Capacités</span>
        <span className="hidden tab:inline">Voir ses capacités</span>
      </button>

      {isOpen && (
        <div className="fixed z-10 -inset-1/3 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Coming Soon
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CapacityButton;
