"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StarRating } from "./star-rating";

export default function AddReviewDialog({ movieId }: { movieId: string }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    stars: 5,
    content: "",
  });
  const [errors, setErrors] = useState({
    stars: "",
    content: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { stars: "", content: "" };

    if (formData.stars < 1 || formData.stars > 5) {
      newErrors.stars = "Rating must be between 1 and 5 stars.";
      valid = false;
    }

    if (formData.content.length < 3) {
      newErrors.content = "Review must be at least 3 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      content: e.target.value,
    }));
  };

  const handleStarsChange = (rating: number) => {
    setFormData((prevData) => ({
      ...prevData,
      stars: rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const session = await supabase.auth.getSession();

      if (!session.data.session) {
        toast.error("You must be logged in to submit a review");
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from("avis").insert([
        {
          stars: formData.stars,
          content: formData.content,
          user_email: session.data.session.user.email,
          imdb_id: movieId,
        },
      ]);

      if (error) throw error;

      toast.success("Your review has been added successfully.");

      setFormData({
        stars: 5,
        content: "",
      });
      setOpen(false);

      // Force a refresh to show the new review
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("There was a problem submitting your review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Your Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about this movie with others.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Your Rating</Label>
            <div className="pt-1">
              <StarRating
                rating={formData.stars}
                onChange={handleStarsChange}
              />
            </div>
            {errors.stars && (
              <p className="text-sm font-medium text-destructive">
                {errors.stars}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Your Review</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Share your thoughts about this movie..."
              className="min-h-[120px] resize-none"
              value={formData.content}
              onChange={handleContentChange}
            />
            {errors.content && (
              <p className="text-sm font-medium text-destructive">
                {errors.content}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
