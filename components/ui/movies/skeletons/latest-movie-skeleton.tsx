import { Card, CardContent, CardHeader } from "../../card";
import { Skeleton } from "../../skeleton";

export default function LastestMovieSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-56 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
