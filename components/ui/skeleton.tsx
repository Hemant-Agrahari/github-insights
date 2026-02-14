import { cn } from "@/lib/utils"

/**
 * Skeleton loader component.
 * @param {Object} props - Component props
 * @param {string} [props.className] (string, optional): Additional custom class names.
 * @param {React.ReactNode} [props.children] (node, optional): Skeleton content elements.
 * @returns {JSX.Element} - Skeleton loader element
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
