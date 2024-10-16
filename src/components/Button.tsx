import { useEffect, useRef } from "react";
import type { ReactNode, ComponentPropsWithoutRef } from "react";
import cn from "@/utils/cn";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onLongPress?: () => void;
};

function Button({
  children,
  className,
  disabled = false,
  onLongPress,
  ...others
}: ButtonProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onMouseDown = () => {
    if (!onLongPress) return;
    intervalRef.current = setInterval(() => {
      onLongPress();
    }, 200);
  };

  const onMouseUp = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => onMouseUp();
  }, []);

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
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
