"use client";

import React from "react";

import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { TextShimmer } from "./ui/text-shimmer";
import { Send } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full h-12">
      {pending ? (
        <TextShimmer className="font-mono text-sm" duration={1}>
          Sending message to Timo...
        </TextShimmer>
      ) : (
        <span className="flex items-center justify-center">
          Send Message <Send className="ml-2 size-4" />
        </span>
      )}
    </Button>
  );
};

export default SubmitButton;
