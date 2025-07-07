import clsx from 'clsx';

type LoadingSpinnerProps = {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: string;
  speed?: 'slow' | 'normal' | 'fast';
  text?: string;
  textPosition?: 'top' | 'right' | 'bottom' | 'left';
  withShadow?: boolean;
  className?: string;
  textClassName?: string;
};

/**
 * Reusable loading spinner component.
 * Supports fullscreen, size, color, speed, text, and positioning.
 */
const LoadingSpinner = ({
  fullScreen = false,
  size = 'medium',
  color = '#0b3d91',
  speed = 'normal',
  text,
  textPosition = 'right',
  withShadow = false,
  className = '',
  textClassName = '',
}: LoadingSpinnerProps) => {
  // Define size classes
  const sizeClasses = {
    small: 'w-5 h-5 border-[3px]',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-[6px]',
    xlarge: 'w-24 h-24 border-[8px]',
  };

  // Define animation speed classes
  const speedClasses = {
    slow: 'animate-[spin_1.5s_linear_infinite]',
    normal: 'animate-[spin_1s_linear_infinite]',
    fast: 'animate-[spin_0.5s_linear_infinite]',
  };

  // Combine spinner styles
  const spinnerBase = clsx(
    'rounded-full border-solid border-t-transparent',
    sizeClasses[size],
    speedClasses[speed],
    withShadow && 'shadow-md'
  );

  // Container layout depending on text position
  const containerClass = clsx(
    'flex items-center justify-center',
    {
      'fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-[1000]': fullScreen,
      'inline-flex': !fullScreen,
    },
    {
      'flex-col space-y-2': textPosition === 'top' || textPosition === 'bottom',
      'flex-row space-x-2': textPosition === 'right' || textPosition === 'left',
      'flex-col-reverse': textPosition === 'top',
      'flex-row-reverse': textPosition === 'left',
    },
    className
  );

  return (
    <div
      data-testid="loading-spinner"
      className={containerClass}
      aria-label={text ? `Loading: ${text}` : 'Loading'}
      role="status"
      aria-live="polite"
    >
      {/* Spinner circle */}
      <div
        className={spinnerBase}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          borderTopColor: color,
        }}
      />

      {/* Optional loading text */}
      {text && (
        <span
          className={clsx('text-sm font-medium text-gray-700 dark:text-gray-300', textClassName)}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
