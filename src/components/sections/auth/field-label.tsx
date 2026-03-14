import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  required?: boolean;
};

export default function FieldLabel({
  children,
  className,
  required = false,
  ...props
}: FieldLabelProps) {
  return (
    <label
      className={cn(
        "mb-2 block px-1 text-xs font-semibold tracking-wide text-text-main",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}
