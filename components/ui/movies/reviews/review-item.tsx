import { Review } from "@/types";
import { Card } from "../../card";
import ReviewStars from "./review-stars";

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium">{review.user_email || "Anonymous"}</div>
        <ReviewStars rating={review.stars} />
      </div>
      <p className="text-sm text-muted-foreground">{review.content}</p>
    </Card>
  );
}
