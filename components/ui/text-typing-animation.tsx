"use client";

import { useEffect, useState } from "react";

export default function TextTypingAnimation({
  textToAnimate,
  className,
}: {
  textToAnimate: string;
  className?: string;
}) {
  //"#46b095" green "#061f43" black
  // deceasing blue
  // const colors = ["#46b095", "#345b88", "#344764"]; all colors
  const colors = ["#345b88"];
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isTyping) {
      const prompt = textToAnimate;
      let index = 0;
      const type = () => {
        if (index < prompt.length) {
          setText(prompt.slice(0, index + 1));
          index++;
          timeout = setTimeout(type, 40);
        } else {
          setIsTyping(false);
        }
      };
      type();
    }
    return () => clearTimeout(timeout);
  }, [isTyping, textToAnimate]);

  return (
    // <p className={`${className} animate-fadeIn`}>
    //   {text.split("").map((letter, index) => (
    //     <span
    //       key={index}
    //       className="color-shift"
    //       style={{ animationDelay: `${index * 0.1}s` }}
    //     >
    //       {letter}
    //     </span>
    //   ))}
    // </p>

    <p className={`${className} animate-fadeIn`}>
      {text.split("").map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </p>
  );
}
