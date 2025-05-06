export default function MovieInfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-muted-foreground mt-1">{icon}</div>
      <div>
        <span className="text-sm text-muted-foreground">{label}</span>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
