import { useState } from 'react';

function ToolTip({ children, content }) {
  const [showTooltip, setShowTooltip] = useState(false);
  function handleMouseEnter() {
    setShowTooltip(true);
  }
  function handleMouseLeave() {
    setShowTooltip(false);
  }
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative "
    >
      {children}
      {showTooltip && (
        <div className="hidden xl:inline-block absolute text-[8px] leading-none border border-red-600 bg-gray-600 text-gray-100 dark:bg-gray-300 dark:text-gray-900 p-1 bottom-9 ">
          {content}
        </div>
      )}
    </div>
  );
}

export default ToolTip;
