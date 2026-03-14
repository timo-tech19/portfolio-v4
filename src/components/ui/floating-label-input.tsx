"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function FloatingLabelInput({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  maxLength,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;
  const inputId = useId();

  const inputClasses = cn(
    "peer w-full rounded-lg border bg-surface px-4 pt-6 pb-3 text-sm text-text-primary outline-none transition-all duration-200",
    "focus:border-accent focus:ring-1 focus:ring-accent/30",
    isActive ? "border-accent/40" : "border-border"
  );

  const labelClasses = cn(
    "absolute left-4 transition-all duration-200 pointer-events-none",
    isActive
      ? "top-2 text-xs text-accent"
      : "top-4 text-sm text-text-muted"
  );

  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(inputClasses, "min-h-[120px] resize-none")}
          maxLength={maxLength}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
          maxLength={maxLength}
        />
      )}
      <label htmlFor={inputId} className={labelClasses}>
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
    </div>
  );
}
