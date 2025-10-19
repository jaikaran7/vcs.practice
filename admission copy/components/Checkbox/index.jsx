import React from 'react';
import './style.scss';

const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  required = false,
  error,
  touched,
  className = '',
  disabled = false,
  ...props
}) => {
  const hasError = error && touched;
  const checkboxClasses = `checkbox-wrapper ${hasError ? 'checkbox-wrapper--error' : ''} ${className}`.trim();

  return (
    <div className={checkboxClasses}>
      <label htmlFor={id} className="checkbox__label">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="checkbox__input"
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${id}-error` : undefined}
          {...props}
        />
        <span className="checkbox__checkmark"></span>
        <span className="checkbox__label-text">
          {label}
          {required && <span className="checkbox__required">*</span>}
        </span>
      </label>
      
      {hasError && (
        <span id={`${id}-error`} className="checkbox__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
