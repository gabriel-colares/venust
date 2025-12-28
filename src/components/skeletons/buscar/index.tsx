import { Skeleton } from "@/components/ui/skeleton";

export function BarbershopResultsSkeleton({ city }: { city: string }) {
  return (
    <div className="mt-10">
      <div className="text-center mb-8">
        <div className="text-muted-foreground">
          Buscando barbearias em <span className="text-primary">{city}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index.toString()}
            className="rounded-2xl border border-border/50 bg-card/40 overflow-hidden"
          >
            <Skeleton className="h-40 w-full rounded-none bg-accent/30" />
            <div className="p-5">
              <Skeleton className="h-5 w-2/3 bg-accent/50" />
              <Skeleton className="h-4 w-1/2 mt-3 bg-accent/40" />
              <div className="flex items-center justify-between mt-5">
                <Skeleton className="h-4 w-20 bg-accent/40" />
                <Skeleton className="h-9 w-24 rounded-md bg-primary/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
