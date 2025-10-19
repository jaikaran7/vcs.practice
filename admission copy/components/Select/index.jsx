import React from 'react';
import './style.scss';

const Select = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  required = false,
  error,
  touched,
  className = '',
  disabled = false,
  placeholder = 'Select an option',
  ...props
}) => {
  const hasError = error && touched;
  const selectClasses = `form-select ${hasError ? 'form-select--error' : ''} ${className}`.trim();

  return (
    <div className="form-select-wrapper">
      {label && (
        <label htmlFor={id} className="form-select__label">
          {label}
          {required && <span className="form-select__required">*</span>}
        </label>
      )}
      
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        className={selectClasses}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {hasError && (
        <span id={`${id}-error`} className="form-select__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
