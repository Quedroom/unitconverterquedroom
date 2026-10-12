import { usePro } from "@/hooks/usePro";

interface AdSlotProps {
  slot: "top" | "below-tool" | "sidebar";
  className?: string;
}

const config = {
  top: { label: "Ad Space Top - 728x90", className: "min-h-[90px] max-w-[728px] mx-auto" },
  "below-tool": { label: "Ad Space Below Tool - 336x280", className: "min-h-[280px] max-w-[336px] mx-auto" },
  sidebar: { label: "Ad Space Sidebar - 300x600 sticky", className: "min-h-[600px] w-[300px] sticky top-28" },
} as const;

/** Reserved, empty containers for future AdSense units. Hidden for Pro users. */
const AdSlot = ({ slot, className = "" }: AdSlotProps) => {
  const { isPro } = usePro();
  if (isPro) return null;
  const c = config[slot];
  return (
    <div
      data-ad-slot={slot}
      aria-hidden="true"
      className={`${c.className} ${className} my-6 rounded-xl border border-dashed border-border bg-muted/40`}
    />
  );
};

export default AdSlot;
