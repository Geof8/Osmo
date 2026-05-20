"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border border-[#E8E8E8] rounded-[8px] mb-3 overflow-hidden bg-white px-3 sm:px-4 py-1 data-[state=open]:border-[#111111] transition-colors",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between py-6 text-left transition-colors min-h-[56px]",
        "focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)]",
        className
      )}
      {...props}
    >
      {children}
      <span
        className="relative flex-shrink-0 ml-6 w-8 h-8 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          className="absolute w-[18px] h-[1.5px] bg-[#111111] transition-colors duration-200"
        />
        <span
          className="absolute w-[18px] h-[1.5px] bg-[#111111] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] rotate-90 group-data-[state=open]:rotate-0"
        />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-6", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
