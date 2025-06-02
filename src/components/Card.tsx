'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface CardProps {
  /** カードのタイトル */
  title: string;
  /** カードの説明文 */
  description?: string;
  /** カードの子要素 */
  children?: ReactNode;
  /** カードのサイズ */
  size?: 'small' | 'medium' | 'large';
  /** カードのバリアント */
  variant?: 'default' | 'glass' | 'bordered' | 'elevated';
  /** ホバーエフェクトを有効にするか */
  hoverable?: boolean;
  /** アニメーションを有効にするか */
  animated?: boolean;
  /** クリックイベント */
  onClick?: () => void;
  /** カスタムクラス名 */
  className?: string;
}

const Card = ({
  title,
  description,
  children,
  size = 'medium',
  variant = 'default',
  hoverable = false,
  animated = true,
  onClick,
  className = '',
}: CardProps) => {
  const sizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  const variantClasses = {
    default: 'bg-background border border-border',
    glass: 'glass border border-white/10',
    bordered: 'bg-background border-2 border-primary/20',
    elevated: 'bg-background shadow-lg border border-border',
  };

  const baseClasses = `
    rounded-xl transition-all duration-300
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${hoverable ? 'hover:scale-[1.02] hover:shadow-xl cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  const CardComponent = (
    <div
      className={baseClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-foreground/70 leading-relaxed">{description}</p>
          )}
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={hoverable ? { y: -4 } : {}}
      >
        {CardComponent}
      </motion.div>
    );
  }

  return CardComponent;
};

export default Card;
