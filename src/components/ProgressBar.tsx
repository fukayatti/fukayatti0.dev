'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface ProgressBarProps {
  /** 進捗の値 (0-100) */
  value: number;
  /** プログレスバーのサイズ */
  size?: 'small' | 'medium' | 'large';
  /** プログレスバーの色テーマ */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gradient';
  /** ラベルを表示するか */
  showLabel?: boolean;
  /** カスタムラベル */
  label?: string;
  /** アニメーションを有効にするか */
  animated?: boolean;
  /** ストライプパターンを表示するか */
  striped?: boolean;
  /** ストライプアニメーションを有効にするか */
  stripedAnimated?: boolean;
  /** 角の丸み */
  rounded?: boolean;
  /** カスタムクラス名 */
  className?: string;
}

const ProgressBar = ({
  value,
  size = 'medium',
  variant = 'primary',
  showLabel = false,
  label,
  animated = true,
  striped = false,
  stripedAnimated = false,
  rounded = true,
  className = '',
}: ProgressBarProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  // アニメーション効果で値を徐々に増加
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(Math.min(Math.max(value, 0), 100));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(Math.min(Math.max(value, 0), 100));
    }
  }, [value, animated]);

  const sizeClasses = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  const variantClasses = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  };

  const backgroundClasses = {
    primary: 'bg-primary/20',
    success: 'bg-green-500/20',
    warning: 'bg-yellow-500/20',
    error: 'bg-red-500/20',
    gradient: 'bg-gray-200 dark:bg-gray-700',
  };

  const stripedClass = striped ? 'bg-stripes bg-stripes-white/20' : '';

  const stripedAnimatedClass =
    stripedAnimated && striped ? 'animate-stripes' : '';

  const roundedClass = rounded ? 'rounded-full' : 'rounded-sm';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            {label || 'Progress'}
          </span>
          <span className="text-sm text-foreground/70">
            {Math.round(displayValue)}%
          </span>
        </div>
      )}

      <div
        className={`
        relative overflow-hidden
        ${sizeClasses[size]}
        ${backgroundClasses[variant]}
        ${roundedClass}
      `}
      >
        <motion.div
          className={`
            h-full transition-all duration-500 ease-out
            ${variantClasses[variant]}
            ${stripedClass}
            ${stripedAnimatedClass}
            ${roundedClass}
          `}
          initial={animated ? { width: 0 } : { width: `${displayValue}%` }}
          animate={{ width: `${displayValue}%` }}
          transition={
            animated ? { duration: 1, ease: 'easeOut' } : { duration: 0 }
          }
        />

        {/* グロー効果 */}
        {variant === 'gradient' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-sm"
            initial={animated ? { width: 0 } : { width: `${displayValue}%` }}
            animate={{ width: `${displayValue}%` }}
            transition={
              animated ? { duration: 1, ease: 'easeOut' } : { duration: 0 }
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
