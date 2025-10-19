import React from 'react';
import './style.scss';

const Button = ({
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger'
  size = 'medium', // 'small', 'medium', 'large'
  onClick,
  disabled = false,
  children,
  className = '',
  icon,
  loading = false,
  ...props
}) => {
  const buttonClasses = `btn btn--${variant} btn--${size} ${disabled ? 'btn--disabled' : ''} ${loading ? 'btn--loading' : ''} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {loading && (
        <span className="btn__spinner">
          <svg className="btn__spinner-icon" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
            </circle>
          </svg>
        </span>
      )}
      
      {icon && !loading && (
        <span className="btn__icon">{icon}</span>
      )}
      
      <span className="btn__text">{children}</span>
    </button>
  );
};

export default Button;
