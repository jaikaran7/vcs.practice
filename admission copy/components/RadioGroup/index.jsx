import React from 'react';
import './style.scss';

const RadioGroup = ({
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  error,
  touched,
  className = '',
  disabled = false,
  direction = 'horizontal', // 'horizontal' or 'vertical'
  ...props
}) => {
  const hasError = error && touched;
  const radioGroupClasses = `radio-group radio-group--${direction} ${hasError ? 'radio-group--error' : ''} ${className}`.trim();

  return (
    <div className="radio-group-wrapper">
      {label && (
        <label className="radio-group__label">
          {label}
          {required && <span className="radio-group__required">*</span>}
        </label>
      )}
      
      <div className={radioGroupClasses}>
        {options.map((option) => (
          <label key={option.value} className="radio-group__option">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className="radio-group__input"
              aria-invalid={hasError ? 'true' : 'false'}
              {...props}
            />
            <span className="radio-group__label-text">{option.label}</span>
          </label>
        ))}
      </div>
      
      {hasError && (
        <span className="radio-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default RadioGroup;
