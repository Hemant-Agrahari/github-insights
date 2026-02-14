"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Table container component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Table content elements.
 * @returns {JSX.Element} - Table wrapper element
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Table header component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Header content elements.
 * @returns {JSX.Element} - Table header element
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Table body component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Body content elements.
 * @returns {JSX.Element} - Table body element
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Table footer component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Footer content elements.
 * @returns {JSX.Element} - Table footer element
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table row component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Row content elements.
 * @returns {JSX.Element} - Table row element
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table header cell component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Header cell content elements.
 * @returns {JSX.Element} - Table header cell element
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table data cell component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Data cell content elements.
 * @returns {JSX.Element} - Table data cell element
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table caption component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Caption content elements.
 * @returns {JSX.Element} - Table caption element
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
