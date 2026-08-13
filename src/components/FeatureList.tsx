import React from 'react';

export interface FeatureListProps {
  items: string[];
  /** 圆点颜色，默认 #DD052B */
  color?: string;
  /** 文字大小：'sm' 11px（MS8000）｜'md' 15px（默认，MS8100） */
  size?: 'sm' | 'md';
  /** 圆点顶对齐（多行文字时圆点贴首行，MS8000 样式），默认居中 */
  dotOffset?: boolean;
  /** 追加到 ul 的类名（如 'mx-auto mt-6 w-fit'） */
  className?: string;
}

export function FeatureList({
  items,
  color = '#DD052B',
  size = 'md',
  dotOffset = false,
  className = '',
}: FeatureListProps) {
  const baseClass =
    size === 'sm'
      ? 'space-y-[9px] text-[11px] leading-[1.55] text-[#d8d9dd]'
      : 'space-y-[9px] text-[15px] leading-[1.55] text-[#d8d9dc]';

  return (
    <ul className={`${baseClass} ${className}`.trim()}>
      {items.map((item) => (
        <li key={item} className={`flex gap-[9px] ${dotOffset ? 'items-start' : 'items-center'}`}>
          <span
            className={`h-[3px] w-[3px] shrink-0 rounded-full ${dotOffset ? 'mt-[7px]' : ''}`.trim()}
            style={{ backgroundColor: color }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
