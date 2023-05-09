import { useEffect, useState } from "react";

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  function handleButtonVisibility() {
    setTimeout(() => {
      setIsButtonVisible(false);
    }, 1000);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 1000);
  }, []);

  return (
    <div>
      <div>Hello World</div>
      {isButtonVisible && (
        <button onClick={handleButtonVisibility}>Button</button>
      )}
    </div>
  );
}
