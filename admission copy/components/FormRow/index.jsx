import React from 'react';
import './style.scss';

const FormRow = ({
  children,
  columns = 2,
  gap = '20px',
  className = '',
  responsive = true,
  ...props
}) => {
  const rowClasses = `form-row form-row--${columns}col ${responsive ? 'form-row--responsive' : ''} ${className}`.trim();

  return (
    <div 
      className={rowClasses}
      style={{ '--form-row-gap': gap }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FormRow;
