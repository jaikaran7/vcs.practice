import React from 'react';
import './style.scss';

const FormField = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  touched,
  className = '',
  disabled = false,
  ...props
}) => {
  const hasError = error && touched;
  const fieldClasses = `form-field ${hasError ? 'form-field--error' : ''} ${className}`.trim();

  return (
    <div className="form-field-wrapper">
      {label && (
        <label htmlFor={id} className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={fieldClasses}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...props}
      />
      
      {hasError && (
        <span id={`${id}-error`} className="form-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;
