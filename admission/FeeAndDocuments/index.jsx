import React, { useState } from 'react';
import './style.scss';

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
    paymentMethod: initialValues.paymentMethod || '',
    initialPaymentAmount: initialValues.initialPaymentAmount || '5000'
  });

  const [errors, setErrors] = useState({});

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
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
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
    // Handle file upload logic here
    console.log(`Uploading file for: ${documentType}`);
  };

  return (
    <div className="fee-documents">
      <div className="fee-documents__header">
        <h1>Student Admission Application</h1>
      </div>

      <div className="fee-documents__progress">
        <div className="fee-documents__progress-steps">
          <div className="fee-documents__step fee-documents__step--completed">
            <div className="fee-documents__step-icon">👤</div>
            <span>Student Information</span>
          </div>
          <div className="fee-documents__step fee-documents__step--completed">
            <div className="fee-documents__step-icon">🎓</div>
            <span>Academic Information</span>
          </div>
          <div className="fee-documents__step fee-documents__step--completed">
            <div className="fee-documents__step-icon">👥</div>
            <span>Guardian Information</span>
          </div>
          <div className="fee-documents__step fee-documents__step--completed">
            <div className="fee-documents__step-icon">📍</div>
            <span>Address Information</span>
          </div>
          <div className="fee-documents__step fee-documents__step--active">
            <div className="fee-documents__step-icon">📄</div>
            <span>Fee & Documents</span>
          </div>
          <div className="fee-documents__step">
            <div className="fee-documents__step-icon">✅</div>
            <span>Review & Submit</span>
          </div>
        </div>
      </div>

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
                <label className="fee-documents__input-label">Fee Plan *</label>
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
                    <button 
                      type="button" 
                      className="fee-documents__upload-btn"
                      onClick={() => handleFileUpload('birthCertificate')}
                    >
                      Upload
                    </button>
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
                    <button 
                      type="button" 
                      className="fee-documents__upload-btn"
                      onClick={() => handleFileUpload('previousSchoolReport')}
                    >
                      Upload
                    </button>
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
                    <button 
                      type="button" 
                      className="fee-documents__upload-btn"
                      onClick={() => handleFileUpload('addressProof')}
                    >
                      Upload
                    </button>
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
                    <button 
                      type="button" 
                      className="fee-documents__upload-btn"
                      onClick={() => handleFileUpload('transferCertificate')}
                    >
                      Upload
                    </button>
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
                    <button 
                      type="button" 
                      className="fee-documents__upload-btn"
                      onClick={() => handleFileUpload('passportPhotos')}
                    >
                      Upload
                    </button>
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
                    <button 
                      type="button" 
                      className="fee-documents__upload-btn"
                      onClick={() => handleFileUpload('medicalCertificate')}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="fee-documents__section">
            <h3 className="fee-documents__section-title">Payment Information</h3>
            <div className="fee-documents__form-grid">
              <div className="fee-documents__row">
                <div className="fee-documents__input-group">
                  <label className="fee-documents__input-label">Payment Method *</label>
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
                <div className="fee-documents__input-group">
                  <label htmlFor="initialPaymentAmount" className="fee-documents__input-label">
                    Initial Payment Amount (₹)
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
