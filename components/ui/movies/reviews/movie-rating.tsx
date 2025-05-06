import { Award, Film, Star } from "lucide-react";

export default function MovieRating({
  source,
  value,
}: {
  source: string;
  value: string;
}) {
  let icon = <Star className="h-4 w-4" />;
  let color = "bg-yellow-500";

  if (source === "Rotten Tomatoes") {
    icon = <Film className="h-4 w-4" />;
    color = "bg-red-500";
  } else if (source === "Metacritic") {
    icon = <Award className="h-4 w-4" />;
    color = "bg-blue-500";
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`${color} p-1 rounded-full text-white`}>{icon}</div>
      <div>
        <span className="font-medium">{source}</span>
        <span className="ml-2">{value}</span>
      </div>
    </div>
  );
}
