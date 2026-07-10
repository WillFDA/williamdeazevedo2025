export type IconTone =
  | "blue"
  | "cyan"
  | "green"
  | "indigo"
  | "orange"
  | "pink"
  | "sky"
  | "slate"
  | "teal"
  | "violet";

// Colored icon chips shared by the landing sections (CapabilitiesStrip,
// pricing comparison) and the inner pages that reuse the same visual language.
export const iconToneClasses: Record<IconTone, string> = {
  blue: "bg-blue-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_24px_-14px_rgba(62,96,212,0.9)]",
  cyan: "bg-[#43b8d6] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_24px_-14px_rgba(67,184,214,0.9)]",
  green:
    "bg-[#3ba879] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_24px_-14px_rgba(59,168,121,0.9)]",
  indigo:
    "bg-[#6574e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_24px_-14px_rgba(101,116,232,0.9)]",
  orange:
    "bg-[#f6821f] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_24px_-14px_rgba(246,130,31,0.88)]",
  pink: "bg-fuchsia-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_24px_-14px_rgba(255,51,102,0.72)]",
  sky: "bg-[#2f8fd6] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_24px_-14px_rgba(47,143,214,0.88)]",
  slate:
    "bg-gray-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_24px_-14px_rgba(64,73,87,0.7)]",
  teal: "bg-[#62c7c4] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_24px_-14px_rgba(98,199,196,0.85)]",
  violet:
    "bg-[#8b73e6] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_24px_-14px_rgba(139,115,230,0.86)]",
};
