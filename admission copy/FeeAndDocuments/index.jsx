import React, { useState } from 'react';
import './style.scss';
import Stepper from '../components/Stepper';

const FeeAndDocuments = ({ 
  initialValues = {}, 
  onNext, 
  onPrevious, 
  onSaveDraft 
}) => {
  const [formData, setFormData] = useState({
    feePlan: initialValues.feePlan || 'Tuition Only',
    documents: {
      birthCertificate: initialValues.documents?.birthCertificate || true,
      previousSchoolReport: initialValues.documents?.previousSchoolReport || false,
      addressProof: initialValues.documents?.addressProof || false,
      transferCertificate: initialValues.documents?.transferCertificate || false,
      passportPhotos: initialValues.documents?.passportPhotos || false,
      medicalCertificate: initialValues.documents?.medicalCertificate || false
    },
    uploadedFiles: {
      birthCertificate: initialValues.uploadedFiles?.birthCertificate || null,
      previousSchoolReport: initialValues.uploadedFiles?.previousSchoolReport || null,
      addressProof: initialValues.uploadedFiles?.addressProof || null,
      transferCertificate: initialValues.uploadedFiles?.transferCertificate || null,
      passportPhotos: initialValues.uploadedFiles?.passportPhotos || null,
      medicalCertificate: initialValues.uploadedFiles?.medicalCertificate || null
    },
    paymentMethod: initialValues.paymentMethod || '',
    initialPaymentAmount: initialValues.initialPaymentAmount || '5000',
    applyDiscount: initialValues.applyDiscount || false,
    discountType: initialValues.discountType || 'percentage', // 'percentage' or 'amount'
    discountValue: initialValues.discountValue || '',
    totalAmount: initialValues.totalAmount || '5000'
  });

  const [errors, setErrors] = useState({});

  // Calculate total amount after discount
  const calculateTotalAmount = (initialAmount, discountType, discountValue, applyDiscount) => {
    const initial = parseFloat(initialAmount) || 0;
    
    if (!applyDiscount) {
      return initial;
    }
    
    const discount = parseFloat(discountValue) || 0;
    
    if (discountType === 'percentage') {
      // Percentage discount
      const discountAmount = (initial * discount) / 100;
      return Math.max(0, initial - discountAmount);
    } else {
      // Fixed amount discount
      return Math.max(0, initial - discount);
    }
  };

  const validateFeeAndDocuments = (values) => {
    const errors = {};

    if (!values.feePlan?.trim()) {
      errors.feePlan = 'Please select a fee plan';
    }

    if (!values.paymentMethod?.trim()) {
      errors.paymentMethod = 'Please select a payment method';
    }

    if (!values.initialPaymentAmount?.trim()) {
      errors.initialPaymentAmount = 'Initial payment amount is required';
    } else if (isNaN(values.initialPaymentAmount) || parseFloat(values.initialPaymentAmount) <= 0) {
      errors.initialPaymentAmount = 'Please enter a valid payment amount';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('documents.')) {
      const documentName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentName]: checked
        }
      }));
    } else {
      setFormData(prev => {
        const newData = {
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        };
        
        // Recalculate total amount if discount-related fields change
        if (name === 'initialPaymentAmount' || name === 'discountType' || name === 'discountValue' || name === 'applyDiscount') {
          const total = calculateTotalAmount(
            name === 'initialPaymentAmount' ? value : newData.initialPaymentAmount,
            name === 'discountType' ? value : newData.discountType,
            name === 'discountValue' ? value : newData.discountValue,
            name === 'applyDiscount' ? checked : newData.applyDiscount
          );
          newData.totalAmount = total.toString();
        }
        
        return newData;
      });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    const validationErrors = validateFeeAndDocuments(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    if (onNext) {
      onNext(formData);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious(formData);
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData);
    }
  };

  const handleFileUpload = (documentType) => {
    // Create a hidden file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx'; // Accept common document formats
    input.multiple = false;
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB');
          return;
        }
        
        // Validate file type
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (!allowedTypes.includes(file.type)) {
          alert('Please upload a valid file (PDF, JPG, PNG, DOC, DOCX)');
          return;
        }
        
        // Update form data with uploaded file
        setFormData(prev => ({
          ...prev,
          uploadedFiles: {
            ...prev.uploadedFiles,
            [documentType]: {
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
              file: file // Store the actual file object
            }
          }
        }));
        
        console.log(`File uploaded for ${documentType}:`, file.name);
      }
    };
    
    // Trigger file selection dialog
    input.click();
  };

  const handleFileRemove = (documentType) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: {
        ...prev.uploadedFiles,
        [documentType]: null
      }
    }));
  };

  return (
    <div className="fee-documents">
      <div className="fee-documents__header">
        <h1>Student Admission Application</h1>
      </div>

      <Stepper currentStep={5} />

      <div className="fee-documents__card">
        <div className="fee-documents__card-header">
          <div className="fee-documents__card-title">
            <span className="fee-documents__card-icon">📄</span>
            <h2>Fee & Documents</h2>
          </div>
        </div>
        
        <div className="fee-documents__content">
          {/* Fee Plan Selection Section */}
          <div className="fee-documents__section">
            <h3 className="fee-documents__section-title">
              <span className="fee-documents__section-icon">📄</span>
              Fee Plan Selection
            </h3>
            <div className="fee-documents__form-grid">
              <div className="fee-documents__input-group">
                <label className="fee-documents__input-label">Fee Plan <span className="required-asterisk">*</span></label>
                <div className="fee-documents__radio-group">
                  <div className="fee-documents__radio-item">
                    <input
                      type="radio"
                      id="tuitionOnly"
                      name="feePlan"
                      value="Tuition Only"
                      checked={formData.feePlan === 'Tuition Only'}
                      onChange={handleInputChange}
                      className="fee-documents__radio"
                    />
                    <label htmlFor="tuitionOnly" className="fee-documents__radio-label">
                      Tuition Only - ₹50,000/year
                    </label>
                  </div>
                  <div className="fee-documents__radio-item">
                    <input
                      type="radio"
                      id="tuitionTransport"
                      name="feePlan"
                      value="Tuition + Transport"
                      checked={formData.feePlan === 'Tuition + Transport'}
                      onChange={handleInputChange}
                      className="fee-documents__radio"
                    />
                    <label htmlFor="tuitionTransport" className="fee-documents__radio-label">
                      Tuition + Transport - ₹65,000/year
                    </label>
                  </div>
                  <div className="fee-documents__radio-item">
                    <input
                      type="radio"
                      id="tuitionHostel"
                      name="feePlan"
                      value="Tuition + Hostel"
                      checked={formData.feePlan === 'Tuition + Hostel'}
                      onChange={handleInputChange}
                      className="fee-documents__radio"
                    />
                    <label htmlFor="tuitionHostel" className="fee-documents__radio-label">
                      Tuition + Hostel - ₹120,000/year
                    </label>
                  </div>
                </div>
                {errors.feePlan && (
                  <div className="fee-documents__input-error" role="alert">
                    {errors.feePlan}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Document Checklist Section */}
          <div className="fee-documents__section">
            <h3 className="fee-documents__section-title">
              <span className="fee-documents__section-icon">📄</span>
              Document Checklist
            </h3>
            <div className="fee-documents__form-grid">
              <div className="fee-documents__document-grid">
                <div className="fee-documents__document-column">
                  <div className="fee-documents__document-item">
                    <div className="fee-documents__checkbox-group">
                      <input
                        type="checkbox"
                        id="birthCertificate"
                        name="documents.birthCertificate"
                        checked={formData.documents.birthCertificate}
                        onChange={handleInputChange}
                        className="fee-documents__checkbox"
                      />
                      <label htmlFor="birthCertificate" className="fee-documents__checkbox-label">
                        Birth Certificate
                      </label>
                    </div>
                    <div className="fee-documents__upload-section">
                      {formData.uploadedFiles.birthCertificate ? (
                        <div className="fee-documents__file-info">
                          <span className="fee-documents__file-name">
                            📄 {formData.uploadedFiles.birthCertificate.name}
                          </span>
                          <button 
                            type="button" 
                            className="fee-documents__remove-btn"
                            onClick={() => handleFileRemove('birthCertificate')}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          className="fee-documents__upload-btn"
                          onClick={() => handleFileUpload('birthCertificate')}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="fee-documents__document-item">
                    <div className="fee-documents__checkbox-group">
                      <input
                        type="checkbox"
                        id="previousSchoolReport"
                        name="documents.previousSchoolReport"
                        checked={formData.documents.previousSchoolReport}
                        onChange={handleInputChange}
                        className="fee-documents__checkbox"
                      />
                      <label htmlFor="previousSchoolReport" className="fee-documents__checkbox-label">
                        Previous School Report Card
                      </label>
                    </div>
                    <div className="fee-documents__upload-section">
                      {formData.uploadedFiles.previousSchoolReport ? (
                        <div className="fee-documents__file-info">
                          <span className="fee-documents__file-name">
                            📄 {formData.uploadedFiles.previousSchoolReport.name}
                          </span>
                          <button 
                            type="button" 
                            className="fee-documents__remove-btn"
                            onClick={() => handleFileRemove('previousSchoolReport')}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          className="fee-documents__upload-btn"
                          onClick={() => handleFileUpload('previousSchoolReport')}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="fee-documents__document-item">
                    <div className="fee-documents__checkbox-group">
                      <input
                        type="checkbox"
                        id="addressProof"
                        name="documents.addressProof"
                        checked={formData.documents.addressProof}
                        onChange={handleInputChange}
                        className="fee-documents__checkbox"
                      />
                      <label htmlFor="addressProof" className="fee-documents__checkbox-label">
                        Address Proof
                      </label>
                    </div>
                    <div className="fee-documents__upload-section">
                      {formData.uploadedFiles.addressProof ? (
                        <div className="fee-documents__file-info">
                          <span className="fee-documents__file-name">
                            📄 {formData.uploadedFiles.addressProof.name}
                          </span>
                          <button 
                            type="button" 
                            className="fee-documents__remove-btn"
                            onClick={() => handleFileRemove('addressProof')}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          className="fee-documents__upload-btn"
                          onClick={() => handleFileUpload('addressProof')}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="fee-documents__document-column">
                  <div className="fee-documents__document-item">
                    <div className="fee-documents__checkbox-group">
                      <input
                        type="checkbox"
                        id="transferCertificate"
                        name="documents.transferCertificate"
                        checked={formData.documents.transferCertificate}
                        onChange={handleInputChange}
                        className="fee-documents__checkbox"
                      />
                      <label htmlFor="transferCertificate" className="fee-documents__checkbox-label">
                        Transfer Certificate (if applicable)
                      </label>
                    </div>
                    <div className="fee-documents__upload-section">
                      {formData.uploadedFiles.transferCertificate ? (
                        <div className="fee-documents__file-info">
                          <span className="fee-documents__file-name">
                            📄 {formData.uploadedFiles.transferCertificate.name}
                          </span>
                          <button 
                            type="button" 
                            className="fee-documents__remove-btn"
                            onClick={() => handleFileRemove('transferCertificate')}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          className="fee-documents__upload-btn"
                          onClick={() => handleFileUpload('transferCertificate')}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="fee-documents__document-item">
                    <div className="fee-documents__checkbox-group">
                      <input
                        type="checkbox"
                        id="passportPhotos"
                        name="documents.passportPhotos"
                        checked={formData.documents.passportPhotos}
                        onChange={handleInputChange}
                        className="fee-documents__checkbox"
                      />
                      <label htmlFor="passportPhotos" className="fee-documents__checkbox-label">
                        Passport Size Photos (4 copies)
                      </label>
                    </div>
                    <div className="fee-documents__upload-section">
                      {formData.uploadedFiles.passportPhotos ? (
                        <div className="fee-documents__file-info">
                          <span className="fee-documents__file-name">
                            📄 {formData.uploadedFiles.passportPhotos.name}
                          </span>
                          <button 
                            type="button" 
                            className="fee-documents__remove-btn"
                            onClick={() => handleFileRemove('passportPhotos')}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          className="fee-documents__upload-btn"
                          onClick={() => handleFileUpload('passportPhotos')}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="fee-documents__document-item">
                    <div className="fee-documents__checkbox-group">
                      <input
                        type="checkbox"
                        id="medicalCertificate"
                        name="documents.medicalCertificate"
                        checked={formData.documents.medicalCertificate}
                        onChange={handleInputChange}
                        className="fee-documents__checkbox"
                      />
                      <label htmlFor="medicalCertificate" className="fee-documents__checkbox-label">
                        Medical Certificate
                      </label>
                    </div>
                    <div className="fee-documents__upload-section">
                      {formData.uploadedFiles.medicalCertificate ? (
                        <div className="fee-documents__file-info">
                          <span className="fee-documents__file-name">
                            📄 {formData.uploadedFiles.medicalCertificate.name}
                          </span>
                          <button 
                            type="button" 
                            className="fee-documents__remove-btn"
                            onClick={() => handleFileRemove('medicalCertificate')}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          className="fee-documents__upload-btn"
                          onClick={() => handleFileUpload('medicalCertificate')}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="fee-documents__section">
            <h3 className="fee-documents__section-title">Payment Information</h3>
            
            {/* Single Payment Card */}
            <div className="fee-documents__payment-card">
              {/* Initial Payment Amount */}
              <div className="fee-documents__input-group">
                <label htmlFor="initialPaymentAmount" className="fee-documents__input-label">
                  Initial Payment Amount (₹) <span className="required-asterisk">*</span>
                </label>
                <input
                  id="initialPaymentAmount"
                  name="initialPaymentAmount"
                  type="text"
                  value={formData.initialPaymentAmount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  className={`fee-documents__input-field ${errors.initialPaymentAmount ? 'fee-documents__input-field--error' : ''}`}
                  aria-describedby={errors.initialPaymentAmount ? 'initialPaymentAmount-error' : undefined}
                  aria-invalid={errors.initialPaymentAmount ? 'true' : 'false'}
                />
                {errors.initialPaymentAmount && (
                  <div id="initialPaymentAmount-error" className="fee-documents__input-error" role="alert">
                    {errors.initialPaymentAmount}
                  </div>
                )}
              </div>

              {/* Apply Discount Checkbox */}
              <div className="fee-documents__checkbox-group">
                <input
                  type="checkbox"
                  id="applyDiscount"
                  name="applyDiscount"
                  checked={formData.applyDiscount}
                  onChange={handleInputChange}
                  className="fee-documents__checkbox"
                />
                <label htmlFor="applyDiscount" className="fee-documents__checkbox-label">
                  Apply Discount
                </label>
              </div>

              {/* Discount Section - Only show if Apply Discount is checked */}
              {formData.applyDiscount && (
                <div className="fee-documents__discount-section">
                  <h4 className="fee-documents__discount-title">Discount Details</h4>
                  <div className="fee-documents__discount-row">
                    <div className="fee-documents__input-group">
                      <label className="fee-documents__input-label">Discount Type</label>
                      <div className="fee-documents__radio-group">
                        <div className="fee-documents__radio-item">
                          <input
                            type="radio"
                            id="discountPercentage"
                            name="discountType"
                            value="percentage"
                            checked={formData.discountType === 'percentage'}
                            onChange={handleInputChange}
                            className="fee-documents__radio"
                          />
                          <label htmlFor="discountPercentage" className="fee-documents__radio-label">
                            Percentage (%)
                          </label>
                        </div>
                        <div className="fee-documents__radio-item">
                          <input
                            type="radio"
                            id="discountAmount"
                            name="discountType"
                            value="amount"
                            checked={formData.discountType === 'amount'}
                            onChange={handleInputChange}
                            className="fee-documents__radio"
                          />
                          <label htmlFor="discountAmount" className="fee-documents__radio-label">
                            Fixed Amount (₹)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="fee-documents__input-group">
                      <label htmlFor="discountValue" className="fee-documents__input-label">
                        Discount {formData.discountType === 'percentage' ? '(%)' : '(₹)'}
                      </label>
                      <input
                        id="discountValue"
                        name="discountValue"
                        type="number"
                        value={formData.discountValue}
                        onChange={handleInputChange}
                        placeholder={formData.discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                        className="fee-documents__input-field"
                        min="0"
                        max={formData.discountType === 'percentage' ? '100' : undefined}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Total Amount Display */}
              <div className="fee-documents__total-section">
                <div className="fee-documents__total-row">
                  <span className="fee-documents__total-label">Initial Amount:</span>
                  <span className="fee-documents__total-value">₹{formData.initialPaymentAmount}</span>
                </div>
                {formData.applyDiscount && formData.discountValue && (
                  <div className="fee-documents__total-row">
                    <span className="fee-documents__total-label">
                      Discount ({formData.discountType === 'percentage' ? `${formData.discountValue}%` : `₹${formData.discountValue}`}):
                    </span>
                    <span className="fee-documents__total-value">
                      -₹{formData.discountType === 'percentage' 
                        ? ((parseFloat(formData.initialPaymentAmount) * parseFloat(formData.discountValue)) / 100).toFixed(2)
                        : formData.discountValue
                      }
                    </span>
                  </div>
                )}
                <div className="fee-documents__total-row fee-documents__total-row--final">
                  <span className="fee-documents__total-label">Total Amount:</span>
                  <span className="fee-documents__total-value fee-documents__total-value--final">₹{formData.totalAmount}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="fee-documents__input-group">
                <label className="fee-documents__input-label">Payment Method <span className="required-asterisk">*</span></label>
                <div className="fee-documents__radio-group">
                  <div className="fee-documents__radio-item">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="Cash"
                      checked={formData.paymentMethod === 'Cash'}
                      onChange={handleInputChange}
                      className="fee-documents__radio"
                    />
                    <label htmlFor="cash" className="fee-documents__radio-label">
                      Cash
                    </label>
                  </div>
                  <div className="fee-documents__radio-item">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="Credit/Debit Card"
                      checked={formData.paymentMethod === 'Credit/Debit Card'}
                      onChange={handleInputChange}
                      className="fee-documents__radio"
                    />
                    <label htmlFor="card" className="fee-documents__radio-label">
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="fee-documents__radio-item">
                    <input
                      type="radio"
                      id="online"
                      name="paymentMethod"
                      value="Online Transfer"
                      checked={formData.paymentMethod === 'Online Transfer'}
                      onChange={handleInputChange}
                      className="fee-documents__radio"
                    />
                    <label htmlFor="online" className="fee-documents__radio-label">
                      Online Transfer
                    </label>
                  </div>
                  <div className="fee-documents__radio-item">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="Bank Transfer"
                      checked={formData.paymentMethod === 'Bank Transfer'}
                      onChange={handleInputChange}
                      className="fee-documents__radio"
                    />
                    <label htmlFor="bank" className="fee-documents__radio-label">
                      Bank Transfer
                    </label>
                  </div>
                </div>
                {errors.paymentMethod && (
                  <div className="fee-documents__input-error" role="alert">
                    {errors.paymentMethod}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="fee-documents__actions">
          <button 
            type="button" 
            className="fee-documents__btn fee-documents__btn--outline"
            onClick={handlePrevious}
          >
            ← Previous
          </button>
          <button 
            type="button" 
            className="fee-documents__btn fee-documents__btn--outline"
            onClick={handleSaveDraft}
          >
            Save as Draft
          </button>
          <button 
            type="button" 
            className="fee-documents__btn fee-documents__btn--primary"
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeeAndDocuments;
