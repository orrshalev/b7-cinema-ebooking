import React from "react";
import type { RefObject } from "react";
import { useRef } from "react";
import { useButton, useFocusRing, mergeProps } from "react-aria";
import type { AriaButtonProps } from "@react-types/button";

export function CalendarButton(props: AriaButtonProps) {
  const ref = useRef() as RefObject<HTMLButtonElement>;
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`rounded-full p-2 ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-purple-600 ring-offset-2" : ""
      }`}
    >
      {props.children}
    </button>
  );
}

export function FieldButton(props: AriaButtonProps) {
  const ref = useRef() as RefObject<HTMLButtonElement>;
  const { buttonProps, isPressed } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`-ml-px rounded-r-md border px-2 outline-none transition-colors group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 ${
        isPressed //|| props.isPressed
          ? "border-gray-400 bg-gray-200"
          : "border-gray-300 bg-gray-50 group-hover:border-gray-400"
      }`}
    >
      {props.children}
    </button>
  );
}
