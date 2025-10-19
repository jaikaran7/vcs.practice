import React, { useState } from 'react';
import './style.scss';

const AddressInformation = ({ 
  initialValues = {}, 
  onNext, 
  onPrevious, 
  onSaveDraft 
}) => {
  const [formData, setFormData] = useState({
    presentAddress: initialValues.presentAddress || 'BHAHADURPUR',
    permanentAddress: initialValues.permanentAddress || 'BHAHADURPUR',
    sameAsPresent: initialValues.sameAsPresent || true,
    presentCity: initialValues.presentCity || 'Adilabad',
    presentState: initialValues.presentState || '',
    presentPincode: initialValues.presentPincode || '504309',
    permanentCity: initialValues.permanentCity || '',
    permanentState: initialValues.permanentState || '',
    permanentPincode: initialValues.permanentPincode || '',
    transportRequired: initialValues.transportRequired || 'Yes',
    pickupPoint: initialValues.pickupPoint || '',
    dropPoint: initialValues.dropPoint || ''
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validatePincode = (pincode) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  const validateAddress = (values) => {
    const errors = {};

    if (!values.presentAddress?.trim()) {
      errors.presentAddress = 'Present address is required';
    }

    if (!values.presentCity?.trim()) {
      errors.presentCity = 'City is required';
    }

    if (!values.presentPincode?.trim()) {
      errors.presentPincode = 'PIN Code is required';
    } else if (!validatePincode(values.presentPincode)) {
      errors.presentPincode = 'Please enter a valid 6-digit PIN code';
    }

    if (!values.sameAsPresent) {
      if (!values.permanentAddress?.trim()) {
        errors.permanentAddress = 'Permanent address is required';
      }
      if (!values.permanentCity?.trim()) {
        errors.permanentCity = 'Permanent city is required';
      }
      if (!values.permanentPincode?.trim()) {
        errors.permanentPincode = 'Permanent PIN code is required';
      } else if (!validatePincode(values.permanentPincode)) {
        errors.permanentPincode = 'Please enter a valid 6-digit PIN code';
      }
    }

    if (values.transportRequired === 'Yes') {
      if (!values.pickupPoint?.trim()) {
        errors.pickupPoint = 'Pickup point is required';
      }
      if (!values.dropPoint?.trim()) {
        errors.dropPoint = 'Drop point is required';
      }
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-fill permanent address if "same as present" is checked
    if (name === 'sameAsPresent' && checked) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: prev.presentAddress,
        permanentCity: prev.presentCity,
        permanentState: prev.presentState,
        permanentPincode: prev.presentPincode
      }));
    }
  };

  const handleNext = () => {
    const validationErrors = validateAddress(formData);
    
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
    <div className="address">
      <div className="address__header">
        <h1>Student Admission Application</h1>
      </div>

      <div className="address__progress">
        <div className="address__progress-steps">
          <div className="address__step address__step--completed">
            <div className="address__step-icon">👤</div>
            <span>Student Information</span>
          </div>
          <div className="address__step address__step--completed">
            <div className="address__step-icon">🎓</div>
            <span>Academic Information</span>
          </div>
          <div className="address__step address__step--completed">
            <div className="address__step-icon">👥</div>
            <span>Guardian Information</span>
          </div>
          <div className="address__step address__step--active">
            <div className="address__step-icon">📍</div>
            <span>Address Information</span>
          </div>
          <div className="address__step">
            <div className="address__step-icon">📄</div>
            <span>Fee & Documents</span>
          </div>
          <div className="address__step">
            <div className="address__step-icon">✅</div>
            <span>Review & Submit</span>
          </div>
        </div>
      </div>

      <div className="address__card">
        <div className="address__card-header">
          <div className="address__card-title">
            <span className="address__card-icon">📍</span>
            <h2>Address Information</h2>
          </div>
        </div>
        
        <div className="address__content">
          {/* Present Address Section */}
          <div className="address__section">
            <h3 className="address__section-title">Present Address</h3>
            <div className="address__form-grid">
              <div className="address__row">
                <div className="address__input-group address__input-group--full">
                  <label htmlFor="presentAddress" className="address__input-label">
                    Present Address *
                  </label>
                  <textarea
                    id="presentAddress"
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter present address"
                    className={`address__input-field address__input-field--textarea ${errors.presentAddress ? 'address__input-field--error' : ''}`}
                    aria-describedby={errors.presentAddress ? 'presentAddress-error' : undefined}
                    aria-invalid={errors.presentAddress ? 'true' : 'false'}
                    rows={3}
                  />
                  {errors.presentAddress && (
                    <div id="presentAddress-error" className="address__input-error" role="alert">
                      {errors.presentAddress}
                    </div>
                  )}
                </div>
              </div>
              <div className="address__row">
                <div className="address__input-group">
                  <label htmlFor="presentCity" className="address__input-label">
                    City *
                  </label>
                  <input
                    id="presentCity"
                    name="presentCity"
                    type="text"
                    value={formData.presentCity}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className={`address__input-field ${errors.presentCity ? 'address__input-field--error' : ''}`}
                    aria-describedby={errors.presentCity ? 'presentCity-error' : undefined}
                    aria-invalid={errors.presentCity ? 'true' : 'false'}
                  />
                  {errors.presentCity && (
                    <div id="presentCity-error" className="address__input-error" role="alert">
                      {errors.presentCity}
                    </div>
                  )}
                </div>
                <div className="address__input-group">
                  <label htmlFor="presentState" className="address__input-label">
                    State
                  </label>
                  <select
                    id="presentState"
                    name="presentState"
                    value={formData.presentState}
                    onChange={handleInputChange}
                    className="address__input-field"
                  >
                    <option value="">Select state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="address__input-group">
                  <label htmlFor="presentPincode" className="address__input-label">
                    PIN Code *
                  </label>
                  <input
                    id="presentPincode"
                    name="presentPincode"
                    type="text"
                    value={formData.presentPincode}
                    onChange={handleInputChange}
                    placeholder="Enter PIN code"
                    className={`address__input-field ${errors.presentPincode ? 'address__input-field--error' : ''}`}
                    aria-describedby={errors.presentPincode ? 'presentPincode-error' : undefined}
                    aria-invalid={errors.presentPincode ? 'true' : 'false'}
                  />
                  {errors.presentPincode && (
                    <div id="presentPincode-error" className="address__input-error" role="alert">
                      {errors.presentPincode}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Permanent Address Section */}
          <div className="address__section">
            <h3 className="address__section-title">Permanent Address</h3>
            <div className="address__form-grid">
              <div className="address__row">
                <div className="address__input-group address__input-group--full">
                  <label htmlFor="permanentAddress" className="address__input-label">
                    Permanent Address
                  </label>
                  <textarea
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter permanent address"
                    className={`address__input-field address__input-field--textarea ${errors.permanentAddress ? 'address__input-field--error' : ''}`}
                    aria-describedby={errors.permanentAddress ? 'permanentAddress-error' : undefined}
                    aria-invalid={errors.permanentAddress ? 'true' : 'false'}
                    rows={3}
                    disabled={formData.sameAsPresent}
                  />
                  {errors.permanentAddress && (
                    <div id="permanentAddress-error" className="address__input-error" role="alert">
                      {errors.permanentAddress}
                    </div>
                  )}
                </div>
              </div>
              <div className="address__row">
                <div className="address__checkbox-group">
                  <input
                    type="checkbox"
                    id="sameAsPresent"
                    name="sameAsPresent"
                    checked={formData.sameAsPresent}
                    onChange={handleInputChange}
                    className="address__checkbox"
                  />
                  <label htmlFor="sameAsPresent" className="address__checkbox-label">
                    Same as present address
                  </label>
                </div>
              </div>
              {!formData.sameAsPresent && (
                <div className="address__row">
                  <div className="address__input-group">
                    <label htmlFor="permanentCity" className="address__input-label">
                      City *
                    </label>
                    <input
                      id="permanentCity"
                      name="permanentCity"
                      type="text"
                      value={formData.permanentCity}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className={`address__input-field ${errors.permanentCity ? 'address__input-field--error' : ''}`}
                      aria-describedby={errors.permanentCity ? 'permanentCity-error' : undefined}
                      aria-invalid={errors.permanentCity ? 'true' : 'false'}
                    />
                    {errors.permanentCity && (
                      <div id="permanentCity-error" className="address__input-error" role="alert">
                        {errors.permanentCity}
                      </div>
                    )}
                  </div>
                  <div className="address__input-group">
                    <label htmlFor="permanentState" className="address__input-label">
                      State
                    </label>
                    <select
                      id="permanentState"
                      name="permanentState"
                      value={formData.permanentState}
                      onChange={handleInputChange}
                      className="address__input-field"
                    >
                      <option value="">Select state</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="address__input-group">
                    <label htmlFor="permanentPincode" className="address__input-label">
                      PIN Code *
                    </label>
                    <input
                      id="permanentPincode"
                      name="permanentPincode"
                      type="text"
                      value={formData.permanentPincode}
                      onChange={handleInputChange}
                      placeholder="Enter PIN code"
                      className={`address__input-field ${errors.permanentPincode ? 'address__input-field--error' : ''}`}
                      aria-describedby={errors.permanentPincode ? 'permanentPincode-error' : undefined}
                      aria-invalid={errors.permanentPincode ? 'true' : 'false'}
                    />
                    {errors.permanentPincode && (
                      <div id="permanentPincode-error" className="address__input-error" role="alert">
                        {errors.permanentPincode}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Transport Section */}
          <div className="address__section">
            <h3 className="address__section-title">Transport Information</h3>
            <div className="address__form-grid">
              <div className="address__row">
                <div className="address__input-group">
                  <label className="address__input-label">Transport Required</label>
                  <div className="address__radio-group">
                    <div className="address__radio-item">
                      <input
                        type="radio"
                        id="transportYes"
                        name="transportRequired"
                        value="Yes"
                        checked={formData.transportRequired === 'Yes'}
                        onChange={handleInputChange}
                        className="address__radio"
                      />
                      <label htmlFor="transportYes" className="address__radio-label">
                        Yes
                      </label>
                    </div>
                    <div className="address__radio-item">
                      <input
                        type="radio"
                        id="transportNo"
                        name="transportRequired"
                        value="No"
                        checked={formData.transportRequired === 'No'}
                        onChange={handleInputChange}
                        className="address__radio"
                      />
                      <label htmlFor="transportNo" className="address__radio-label">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {formData.transportRequired === 'Yes' && (
                <div className="address__row">
                  <div className="address__input-group">
                    <label htmlFor="pickupPoint" className="address__input-label">
                      Pickup Point
                    </label>
                    <input
                      id="pickupPoint"
                      name="pickupPoint"
                      type="text"
                      value={formData.pickupPoint}
                      onChange={handleInputChange}
                      placeholder="Enter pickup point"
                      className={`address__input-field ${errors.pickupPoint ? 'address__input-field--error' : ''}`}
                      aria-describedby={errors.pickupPoint ? 'pickupPoint-error' : undefined}
                      aria-invalid={errors.pickupPoint ? 'true' : 'false'}
                    />
                    {errors.pickupPoint && (
                      <div id="pickupPoint-error" className="address__input-error" role="alert">
                        {errors.pickupPoint}
                      </div>
                    )}
                  </div>
                  <div className="address__input-group">
                    <label htmlFor="dropPoint" className="address__input-label">
                      Drop Point
                    </label>
                    <input
                      id="dropPoint"
                      name="dropPoint"
                      type="text"
                      value={formData.dropPoint}
                      onChange={handleInputChange}
                      placeholder="Enter drop point"
                      className={`address__input-field ${errors.dropPoint ? 'address__input-field--error' : ''}`}
                      aria-describedby={errors.dropPoint ? 'dropPoint-error' : undefined}
                      aria-invalid={errors.dropPoint ? 'true' : 'false'}
                    />
                    {errors.dropPoint && (
                      <div id="dropPoint-error" className="address__input-error" role="alert">
                        {errors.dropPoint}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="address__actions">
          <button 
            type="button" 
            className="address__btn address__btn--outline"
            onClick={handlePrevious}
          >
            ← Previous
          </button>
          <button 
            type="button" 
            className="address__btn address__btn--outline"
            onClick={handleSaveDraft}
          >
            Save as Draft
          </button>
          <button 
            type="button" 
            className="address__btn address__btn--primary"
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressInformation;
