import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Card container component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Card content elements.
 * @returns {JSX.Element} - Card wrapper element
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card header component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Header content elements.
 * @returns {JSX.Element} - Card header element
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card title component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Title content elements.
 * @returns {JSX.Element} - Card title element
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Card description component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Description content elements.
 * @returns {JSX.Element} - Card description element
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Card action component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Action content elements.
 * @returns {JSX.Element} - Card action element
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card content component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Content elements.
 * @returns {JSX.Element} - Card content element
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Card footer component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Footer content elements.
 * @returns {JSX.Element} - Card footer element
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
