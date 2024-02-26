import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-small bg-muted --border-yellow", className)}
      {...props}
    />
  )
}

export { Skeleton }
