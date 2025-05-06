"use client";

import { Review } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../../card";
import { Skeleton } from "../../skeleton";
import AddReviewDialog from "./add-review-dialog";
import ReviewItem from "./review-item";

export function ReviewsSection({ movieId }: { movieId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("avis")
          .select("*")
          .eq("imdb_id", movieId)
          .order("id", { ascending: false });

        if (error) throw error;
        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Reviews
        </h2>
        <AddReviewDialog movieId={movieId} />
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <Card className="p-4 text-center text-muted-foreground">
          No reviews yet. Be the first to share your thoughts!
        </Card>
      )}
    </div>
  );
}
