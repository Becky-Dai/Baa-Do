/**
 * 中文：通用 Badge 标签组件。
 * English: General-purpose Badge component.
 */

type BadgeColor = 'green' | 'amber' | 'pink' | 'gray' | 'blue';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
}

const colorStyles: Record<BadgeColor, string> = {
  green: 'bg-green-100 text-green-700',
  amber: 'bg-amber-100 text-amber-700',
  pink: 'bg-pink-100 text-pink-700',
  gray: 'bg-gray-100 text-gray-600',
  blue: 'bg-blue-100 text-blue-700',
};

export default function Badge({ label, color = 'green' }: BadgeProps) {
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${colorStyles[color]}`}>
      {label}
    </span>
  );
}
