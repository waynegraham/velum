"use client";

import type {
  HTMLAttributes,
  ReactNode,
} from "react";
import { useRef } from "react";

import {
  useParallaxMotion,
  useRevealMotion,
  type UseParallaxMotionOptions,
  type UseRevealMotionOptions,
} from "@velum/adapters";

interface MotionSharedProps {
  children: ReactNode;
  parallax?: UseParallaxMotionOptions;
  reveal?: UseRevealMotionOptions;
}

type MotionBlockProps =
  | ({ as?: "div" } & HTMLAttributes<HTMLDivElement> & MotionSharedProps)
  | ({ as: "figure" } & HTMLAttributes<HTMLElement> & MotionSharedProps);

function MotionDiv({
  children,
  className,
  parallax,
  reveal,
  ...props
}: HTMLAttributes<HTMLDivElement> & MotionSharedProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useRevealMotion(ref, reveal ?? { enabled: false });
  useParallaxMotion(ref, parallax ?? { enabled: false });

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

function MotionFigure({
  children,
  className,
  parallax,
  reveal,
  ...props
}: HTMLAttributes<HTMLElement> & MotionSharedProps) {
  const ref = useRef<HTMLElement | null>(null);

  useRevealMotion(ref, reveal ?? { enabled: false });
  useParallaxMotion(ref, parallax ?? { enabled: false });

  return (
    <figure ref={ref} className={className} {...props}>
      {children}
    </figure>
  );
}

export function MotionBlock(props: MotionBlockProps) {
  if (props.as === "figure") {
    return <MotionFigure {...props} />;
  }

  return <MotionDiv {...props} />;
}
