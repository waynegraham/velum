"use client";

import type { CSSProperties } from "react";
import type { RangeModel } from "@velum/core";

export interface RangeNavigatorProps {
  ranges: RangeModel[];
  selectedRangeId?: string;
  onSelect?: (range: RangeModel) => void;
  className?: string;
  style?: CSSProperties;
}

const listStyle: CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
};

const buttonStyle: CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  margin: 0,
  fontFamily: "inherit",
  fontSize: "inherit",
  cursor: "pointer",
  textAlign: "left",
  color: "inherit"
};

export function RangeNavigator({
  ranges,
  selectedRangeId,
  onSelect,
  className,
  style
}: RangeNavigatorProps) {
  if (!ranges || ranges.length === 0) {
    return null;
  }

  return (
    <nav className={className} style={style}>
      <ul style={listStyle}>
        {ranges.map((range) => {
          const isSelected = range.id === selectedRangeId;
          
          return (
            <li key={range.id}>
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  fontWeight: isSelected ? "bold" : "normal",
                  textDecoration: isSelected ? "underline" : "none"
                }}
                onClick={() => onSelect?.(range)}
              >
                {range.label || "Untitled Range"}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
