"use client";

import * as React from "react";
import { useClientLocale } from "@/hooks/use-client-locale";
import { getCommonText } from "@/lib/translations";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isLoading = false,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const locale = useClientLocale();
    const common = getCommonText(locale);

    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none";

    const variants = {
      default:
        "border border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:border-blue-500 hover:bg-blue-500 dark:border-blue-500 dark:bg-blue-500 dark:hover:border-blue-400 dark:hover:bg-blue-400",
      outline:
        "border border-blue-200 bg-white/70 text-blue-700 backdrop-blur-sm hover:border-blue-400 hover:bg-blue-50 dark:border-blue-400/25 dark:bg-slate-950/50 dark:text-blue-200 dark:hover:border-blue-400/60 dark:hover:bg-blue-950/40",
      ghost:
        "text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-200",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-12 px-5 text-base",
      lg: "h-14 px-6 text-lg",
    };

    const buttonClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className,
    );

    if (asChild) {
      const child = React.Children.toArray(children).find(React.isValidElement);
      if (React.isValidElement<{ className?: string }>(child)) {
        return React.cloneElement(child, {
          className: cn(buttonClassName, child.props.className),
        });
      }
    }

    return (
      <button
        className={buttonClassName}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{common.loading}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

