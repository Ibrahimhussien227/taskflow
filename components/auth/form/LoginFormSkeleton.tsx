import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function LoginFormSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <Skeleton className="h-6 w-1/3 bg-gray-300" /> {/* Title */}
        <Skeleton className="h-4 w-2/3 bg-gray-200 mt-2" />{" "}
        {/* Description */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Skeleton className="h-4 w-20 bg-gray-200 mb-4" />{" "}
          {/* Label */}
          <Skeleton className="h-10 w-full rounded-md bg-gray-300" />{" "}
          {/* Input */}
        </div>
        <div>
          <Skeleton className="h-4 w-20 bg-gray-200 mb-4" />{" "}
          {/* Label */}
          <Skeleton className="h-10 w-full rounded-md bg-gray-300" />{" "}
          {/* Input */}
        </div>
        <Skeleton className="h-10 w-full rounded-md bg-gray-400" />{" "}
        {/* Button */}
      </CardContent>
    </Card>
  );
}
