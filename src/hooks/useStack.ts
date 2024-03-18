import { useState } from "react";

const useStack = <T>(initialValue: T[] = []) => {
  const [elements, setElements] = useState(initialValue);

  // Add an element to the stack.
  const add = (element: T) => {
    // Remove the first element if the stack is full.
    if (elements.length >= 3) {
      setElements((prevElements) => prevElements.slice(1));
    }

    // Add the new element to the end of the stack.
    setElements((prevElements) => [...prevElements, element]);
  };

  // Remove an element from the stack.
  const remove = () => {
    setElements((prevElements) => prevElements.slice(0, -1));
  };

  // Get the last element of the stack without removing it.
  const peek = () => elements[elements.length - 1];

  // Get the size of the stack.
  const size = () => elements.length;

  // Empty the stack.
  const clear = () => setElements([]);

  return {
    elements,
    add,
    remove,
    peek,
    size,
    clear,
  };
};

export default useStack;
