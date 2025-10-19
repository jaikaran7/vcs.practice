import React, { useState } from 'react';
import './style.scss';

const GuardianInformation = ({ 
  initialValues = {}, 
  onNext, 
  onPrevious, 
  onSaveDraft 
}) => {
  const [formData, setFormData] = useState({
    fathersName: initialValues.fathersName || '',
    fathersPhone: initialValues.fathersPhone || '',
    fathersOccupation: initialValues.fathersOccupation || '',
    fathersEmail: initialValues.fathersEmail || '',
    mothersName: initialValues.mothersName || '',
    mothersPhone: initialValues.mothersPhone || '',
    mothersOccupation: initialValues.mothersOccupation || '',
    mothersEmail: initialValues.mothersEmail || '',
    emergencyName: initialValues.emergencyName || '',
    emergencyPhone: initialValues.emergencyPhone || '',
    emergencyRelationship: initialValues.emergencyRelationship || ''
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  };

  const validateGuardian = (values) => {
    const errors = {};

    if (!values.fathersName?.trim()) {
      errors.fathersName = 'Father\'s name is required';
    }

    if (!values.fathersPhone?.trim()) {
      errors.fathersPhone = 'Father\'s phone is required';
    } else if (!validatePhone(values.fathersPhone)) {
      errors.fathersPhone = 'Please enter a valid phone number (7-15 digits)';
    }

    if (!values.mothersName?.trim()) {
      errors.mothersName = 'Mother\'s name is required';
    }

    if (values.fathersEmail && !validateEmail(values.fathersEmail)) {
      errors.fathersEmail = 'Please enter a valid email address';
    }

    if (values.mothersPhone && !validatePhone(values.mothersPhone)) {
      errors.mothersPhone = 'Please enter a valid phone number (7-15 digits)';
    }

    if (values.mothersEmail && !validateEmail(values.mothersEmail)) {
      errors.mothersEmail = 'Please enter a valid email address';
    }

    if (values.emergencyPhone && !validatePhone(values.emergencyPhone)) {
      errors.emergencyPhone = 'Please enter a valid phone number (7-15 digits)';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    const validationErrors = validateGuardian(formData);
    
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

  return (
    <div className="guardian">
      <div className="guardian__header">
        <h1>Student Admission Application</h1>
      </div>

      <div className="guardian__progress">
        <div className="guardian__progress-steps">
          <div className="guardian__step guardian__step--completed">
            <div className="guardian__step-icon">👤</div>
            <span>Student Information</span>
          </div>
          <div className="guardian__step guardian__step--completed">
            <div className="guardian__step-icon">🎓</div>
            <span>Academic Information</span>
          </div>
          <div className="guardian__step guardian__step--active">
            <div className="guardian__step-icon">👥</div>
            <span>Guardian Information</span>
          </div>
          <div className="guardian__step">
            <div className="guardian__step-icon">📍</div>
            <span>Address Information</span>
          </div>
          <div className="guardian__step">
            <div className="guardian__step-icon">📄</div>
            <span>Fee & Documents</span>
          </div>
          <div className="guardian__step">
            <div className="guardian__step-icon">✅</div>
            <span>Review & Submit</span>
          </div>
        </div>
      </div>

      <div className="guardian__card">
        <div className="guardian__card-header">
          <div className="guardian__card-title">
            <span className="guardian__card-icon">👥</span>
            <h2>Guardian Information</h2>
          </div>
        </div>
        
        <div className="guardian__content">
          {/* Father's Information Section */}
          <div className="guardian__section">
            <h3 className="guardian__section-title">Father's Information</h3>
            <div className="guardian__form-grid">
              <div className="guardian__row">
                <div className="guardian__input-group">
                  <label htmlFor="fathersName" className="guardian__input-label">
                    Father's Name *
                  </label>
                  <input
                    id="fathersName"
                    name="fathersName"
                    type="text"
                    value={formData.fathersName}
                    onChange={handleInputChange}
                    placeholder="Enter father's name"
                    className={`guardian__input-field ${errors.fathersName ? 'guardian__input-field--error' : ''}`}
                    aria-describedby={errors.fathersName ? 'fathersName-error' : undefined}
                    aria-invalid={errors.fathersName ? 'true' : 'false'}
                  />
                  {errors.fathersName && (
                    <div id="fathersName-error" className="guardian__input-error" role="alert">
                      {errors.fathersName}
                    </div>
                  )}
                </div>
                <div className="guardian__input-group">
                  <label htmlFor="fathersOccupation" className="guardian__input-label">
                    Father's Occupation
                  </label>
                  <input
                    id="fathersOccupation"
                    name="fathersOccupation"
                    type="text"
                    value={formData.fathersOccupation}
                    onChange={handleInputChange}
                    placeholder="Enter occupation"
                    className="guardian__input-field"
                  />
                </div>
              </div>
              <div className="guardian__row">
                <div className="guardian__input-group">
                  <label htmlFor="fathersPhone" className="guardian__input-label">
                    Father's Phone *
                  </label>
                  <input
                    id="fathersPhone"
                    name="fathersPhone"
                    type="tel"
                    value={formData.fathersPhone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className={`guardian__input-field ${errors.fathersPhone ? 'guardian__input-field--error' : ''}`}
                    aria-describedby={errors.fathersPhone ? 'fathersPhone-error' : undefined}
                    aria-invalid={errors.fathersPhone ? 'true' : 'false'}
                  />
                  {errors.fathersPhone && (
                    <div id="fathersPhone-error" className="guardian__input-error" role="alert">
                      {errors.fathersPhone}
                    </div>
                  )}
                </div>
                <div className="guardian__input-group">
                  <label htmlFor="fathersEmail" className="guardian__input-label">
                    Father's Email
                  </label>
                  <input
                    id="fathersEmail"
                    name="fathersEmail"
                    type="email"
                    value={formData.fathersEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={`guardian__input-field ${errors.fathersEmail ? 'guardian__input-field--error' : ''}`}
                    aria-describedby={errors.fathersEmail ? 'fathersEmail-error' : undefined}
                    aria-invalid={errors.fathersEmail ? 'true' : 'false'}
                  />
                  {errors.fathersEmail && (
                    <div id="fathersEmail-error" className="guardian__input-error" role="alert">
                      {errors.fathersEmail}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mother's Information Section */}
          <div className="guardian__section">
            <h3 className="guardian__section-title">Mother's Information</h3>
            <div className="guardian__form-grid">
              <div className="guardian__row">
                <div className="guardian__input-group">
                  <label htmlFor="mothersName" className="guardian__input-label">
                    Mother's Name *
                  </label>
                  <input
                    id="mothersName"
                    name="mothersName"
                    type="text"
                    value={formData.mothersName}
                    onChange={handleInputChange}
                    placeholder="Enter mother's name"
                    className={`guardian__input-field ${errors.mothersName ? 'guardian__input-field--error' : ''}`}
                    aria-describedby={errors.mothersName ? 'mothersName-error' : undefined}
                    aria-invalid={errors.mothersName ? 'true' : 'false'}
                  />
                  {errors.mothersName && (
                    <div id="mothersName-error" className="guardian__input-error" role="alert">
                      {errors.mothersName}
                    </div>
                  )}
                </div>
                <div className="guardian__input-group">
                  <label htmlFor="mothersOccupation" className="guardian__input-label">
                    Mother's Occupation
                  </label>
                  <input
                    id="mothersOccupation"
                    name="mothersOccupation"
                    type="text"
                    value={formData.mothersOccupation}
                    onChange={handleInputChange}
                    placeholder="Enter occupation"
                    className="guardian__input-field"
                  />
                </div>
              </div>
              <div className="guardian__row">
                <div className="guardian__input-group">
                  <label htmlFor="mothersPhone" className="guardian__input-label">
                    Mother's Phone
                  </label>
                  <input
                    id="mothersPhone"
                    name="mothersPhone"
                    type="tel"
                    value={formData.mothersPhone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className={`guardian__input-field ${errors.mothersPhone ? 'guardian__input-field--error' : ''}`}
                    aria-describedby={errors.mothersPhone ? 'mothersPhone-error' : undefined}
                    aria-invalid={errors.mothersPhone ? 'true' : 'false'}
                  />
                  {errors.mothersPhone && (
                    <div id="mothersPhone-error" className="guardian__input-error" role="alert">
                      {errors.mothersPhone}
                    </div>
                  )}
                </div>
                <div className="guardian__input-group">
                  <label htmlFor="mothersEmail" className="guardian__input-label">
                    Mother's Email
                  </label>
                  <input
                    id="mothersEmail"
                    name="mothersEmail"
                    type="email"
                    value={formData.mothersEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={`guardian__input-field ${errors.mothersEmail ? 'guardian__input-field--error' : ''}`}
                    aria-describedby={errors.mothersEmail ? 'mothersEmail-error' : undefined}
                    aria-invalid={errors.mothersEmail ? 'true' : 'false'}
                  />
                  {errors.mothersEmail && (
                    <div id="mothersEmail-error" className="guardian__input-error" role="alert">
                      {errors.mothersEmail}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="guardian__section">
            <h3 className="guardian__section-title">Emergency Contact</h3>
            <div className="guardian__form-grid">
              <div className="guardian__row">
                <div className="guardian__input-group">
                  <label htmlFor="emergencyName" className="guardian__input-label">
                    Emergency Contact Name
                  </label>
                  <input
                    id="emergencyName"
                    name="emergencyName"
                    type="text"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    placeholder="Enter emergency contact name"
                    className="guardian__input-field"
                  />
                </div>
                <div className="guardian__input-group">
                  <label htmlFor="emergencyPhone" className="guardian__input-label">
                    Emergency Contact Phone
                  </label>
                  <input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className={`guardian__input-field ${errors.emergencyPhone ? 'guardian__input-field--error' : ''}`}
                    aria-describedby={errors.emergencyPhone ? 'emergencyPhone-error' : undefined}
                    aria-invalid={errors.emergencyPhone ? 'true' : 'false'}
                  />
                  {errors.emergencyPhone && (
                    <div id="emergencyPhone-error" className="guardian__input-error" role="alert">
                      {errors.emergencyPhone}
                    </div>
                  )}
                </div>
              </div>
              <div className="guardian__row">
                <div className="guardian__input-group">
                  <label htmlFor="emergencyRelationship" className="guardian__input-label">
                    Relationship to Student
                  </label>
                  <input
                    id="emergencyRelationship"
                    name="emergencyRelationship"
                    type="text"
                    value={formData.emergencyRelationship}
                    onChange={handleInputChange}
                    placeholder="Enter relationship"
                    className="guardian__input-field"
                  />
                </div>
                <div className="guardian__input-group">
                  {/* Empty div for grid alignment */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="guardian__actions">
          <button 
            type="button" 
            className="guardian__btn guardian__btn--outline"
            onClick={handlePrevious}
          >
            ← Previous
          </button>
          <button 
            type="button" 
            className="guardian__btn guardian__btn--outline"
            onClick={handleSaveDraft}
          >
            Save as Draft
          </button>
          <button 
            type="button" 
            className="guardian__btn guardian__btn--primary"
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuardianInformation;
