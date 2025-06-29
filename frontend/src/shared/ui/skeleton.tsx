import { cn } from "@/shared/utils/tw-merge"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
