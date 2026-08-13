import { RecentItem } from "@/hooks/useRecentConversions";
import { History, Trash2 } from "lucide-react";

const RecentList = ({ items, onClear }: { items: RecentItem[]; onClear: () => void }) => {
  if (items.length === 0) return null;
  return (
    <div className="mt-6 border-t border-border pt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <History className="w-4 h-4 text-primary" /> Recent conversions
        </h3>
        <button onClick={onClear} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>
      <ul className="space-y-1 text-sm text-muted-foreground font-mono">
        {items.map((i) => (
          <li key={i.at}>{i.text}</li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground mt-2">
        Saved only in this browser (localStorage). Nothing is uploaded or stored on any server.
      </p>
    </div>
  );
};

export default RecentList;
