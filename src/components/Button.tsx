import type { ReactNode, ComponentPropsWithoutRef } from "react";
import cn from "@/utils/cn";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

function Button({
  children,
  className,
  disabled = false,
  ...others
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-md border border-sky-400 text-sky-400",
        !disabled && "hover:bg-sky-50 active:bg-sky-100",
        disabled && "border-sky-200 text-sky-200",
        className,
      )}
      {...others}
    >
      {children}
    </button>
  );
}

export default Button;
