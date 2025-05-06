"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  max?: number;
  size?: number;
  readOnly?: boolean;
}

export function StarRating({
  rating,
  onChange,
  max = 5,
  size = 24,
  readOnly = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled =
          hoverRating > 0 ? starValue <= hoverRating : starValue <= rating;

        return (
          <Star
            key={index}
            size={size}
            className={cn(
              "cursor-pointer transition-all duration-150",
              isFilled
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-300",
              readOnly ? "cursor-default" : "hover:scale-110",
            )}
            onClick={() => {
              if (!readOnly) onChange(starValue);
            }}
            onMouseEnter={() => {
              if (!readOnly) setHoverRating(starValue);
            }}
            onMouseLeave={() => {
              if (!readOnly) setHoverRating(0);
            }}
          />
        );
      })}
      {!readOnly && (
        <span className="ml-2 text-sm text-gray-500">
          {hoverRating > 0 ? hoverRating : rating} of {max}
        </span>
      )}
    </div>
  );
}
