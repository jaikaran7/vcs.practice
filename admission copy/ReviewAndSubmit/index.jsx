import React, { useState } from 'react';
import './style.scss';
import SuccessPage from '../SuccessPage';
import Stepper from '../components/Stepper';

const ReviewAndSubmit = ({ 
  formData = {}, 
  onPrevious, 
  onSaveDraft, 
  onSubmit,
  onNewApplication
}) => {
  const [activeTab, setActiveTab] = useState('Student');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft();
    }
  };

  const handleSubmit = () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    
    // Show success page
    setIsSubmitted(true);
    
    if (onSubmit) {
      onSubmit();
    }
  };

  const renderStudentInfo = () => (
    <div className="review-submit__content-grid">
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Full Name:</span>
          <span className="review-submit__info-value">{formData.student?.fullName || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Date of Birth:</span>
          <span className="review-submit__info-value">{formData.student?.dateOfBirth || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Religion:</span>
          <span className="review-submit__info-value">{formData.student?.religion || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Previous School:</span>
          <span className="review-submit__info-value">{formData.student?.previousSchool || 'Not provided'}</span>
        </div>
      </div>
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Gender:</span>
          <span className="review-submit__info-value">{formData.student?.gender || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Blood Group:</span>
          <span className="review-submit__info-value">{formData.student?.bloodGroup || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Nationality:</span>
          <span className="review-submit__info-value">{formData.student?.nationality || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Academic Year:</span>
          <span className="review-submit__info-value">{formData.student?.academicYear || 'Not provided'}</span>
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="review-submit__content-grid">
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Class Applied For:</span>
          <span className="review-submit__info-value">{formData.academic?.classAppliedFor || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Medium:</span>
          <span className="review-submit__info-value">{formData.academic?.mediumOfInstruction || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Previous Grade:</span>
          <span className="review-submit__info-value">{formData.academic?.previousSchoolGrade || 'Not provided'}</span>
        </div>
      </div>
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Section Preference:</span>
          <span className="review-submit__info-value">{formData.academic?.sectionPreference || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Previous Class:</span>
          <span className="review-submit__info-value">{formData.academic?.previousClass || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">TC Number:</span>
          <span className="review-submit__info-value">{formData.academic?.transferCertificateNumber || 'Not provided'}</span>
        </div>
      </div>
    </div>
  );

  const renderGuardianInfo = () => (
    <div className="review-submit__content-grid">
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Father's Name:</span>
          <span className="review-submit__info-value">{formData.guardian?.fathersName || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Father's Email:</span>
          <span className="review-submit__info-value">{formData.guardian?.fathersEmail || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Mother's Phone:</span>
          <span className="review-submit__info-value">{formData.guardian?.mothersPhone || 'Not provided'}</span>
        </div>
      </div>
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Father's Phone:</span>
          <span className="review-submit__info-value">{formData.guardian?.fathersPhone || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Mother's Name:</span>
          <span className="review-submit__info-value">{formData.guardian?.mothersName || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Emergency Contact:</span>
          <span className="review-submit__info-value">{formData.guardian?.emergencyName || 'Not provided'}</span>
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="review-submit__content-grid">
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Present Address:</span>
          <span className="review-submit__info-value">{formData.address?.presentAddress || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">State:</span>
          <span className="review-submit__info-value">{formData.address?.presentState || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Transport Required:</span>
          <span className="review-submit__info-value">{formData.address?.transportRequired || 'Not provided'}</span>
        </div>
      </div>
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">City:</span>
          <span className="review-submit__info-value">{formData.address?.presentCity || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">PIN Code:</span>
          <span className="review-submit__info-value">{formData.address?.presentPincode || 'Not provided'}</span>
        </div>
      </div>
    </div>
  );

  const renderFeeDocsInfo = () => (
    <div className="review-submit__content-grid">
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Fee Plan:</span>
          <span className="review-submit__info-value">{formData.feeDocs?.feePlan || 'Not provided'}</span>
        </div>
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Payment Method:</span>
          <span className="review-submit__info-value">{formData.feeDocs?.paymentMethod || 'Not provided'}</span>
        </div>
      </div>
      <div className="review-submit__content-column">
        <div className="review-submit__info-item">
          <span className="review-submit__info-label">Total Amount:</span>
          <span className="review-submit__info-value">₹{formData.feeDocs?.totalAmount || 'Not provided'}</span>
        </div>
      </div>
    </div>
  );

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'Student':
        return renderStudentInfo();
      case 'Academic':
        return renderAcademicInfo();
      case 'Guardian':
        return renderGuardianInfo();
      case 'Address':
        return renderAddressInfo();
      case 'Fee & Docs':
        return renderFeeDocsInfo();
      default:
        return renderStudentInfo();
    }
  };

  // Show success page if submitted
  if (isSubmitted) {
    // Generate admission number based on current date and time
    const now = new Date();
    const admissionNumber = `ADM${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    return (
      <SuccessPage 
        admissionData={{
          admissionNumber: admissionNumber,
          studentName: formData.student?.fullName || 'Not provided',
          classApplied: formData.academic?.classAppliedFor || 'Not provided',
          applicationDate: now.toLocaleDateString('en-GB'),
          status: 'Under Review',
          // Additional details from form data
          studentDetails: {
            fullName: formData.student?.fullName || 'Not provided',
            dateOfBirth: formData.student?.dateOfBirth || 'Not provided',
            gender: formData.student?.gender || 'Not provided',
            bloodGroup: formData.student?.bloodGroup || 'Not provided',
            nationality: formData.student?.nationality || 'Not provided',
            academicYear: formData.student?.academicYear || 'Not provided'
          },
          academicDetails: {
            classAppliedFor: formData.academic?.classAppliedFor || 'Not provided',
            sectionPreference: formData.academic?.sectionPreference || 'Not provided',
            mediumOfInstruction: formData.academic?.mediumOfInstruction || 'Not provided',
            previousClass: formData.academic?.previousClass || 'Not provided'
          },
          guardianDetails: {
            fathersName: formData.guardian?.fathersName || 'Not provided',
            fathersPhone: formData.guardian?.fathersPhone || 'Not provided',
            mothersName: formData.guardian?.mothersName || 'Not provided',
            mothersPhone: formData.guardian?.mothersPhone || 'Not provided'
          },
          addressDetails: {
            presentAddress: formData.address?.presentAddress || 'Not provided',
            city: formData.address?.presentCity || 'Not provided',
            state: formData.address?.presentState || 'Not provided',
            pincode: formData.address?.presentPincode || 'Not provided'
          },
          feeDetails: {
            feePlan: formData.feeDocs?.feePlan || 'Not provided',
            paymentMethod: formData.feeDocs?.paymentMethod || 'Not provided',
            totalAmount: formData.feeDocs?.totalAmount || 'Not provided',
            initialPayment: formData.feeDocs?.initialPaymentAmount || 'Not provided',
            applyDiscount: formData.feeDocs?.applyDiscount || false,
            discountType: formData.feeDocs?.discountType || 'Not provided',
            discountValue: formData.feeDocs?.discountValue || 'Not provided'
          }
        }}
        onDownloadReceipt={() => console.log('Downloading receipt...')}
        onPrint={() => window.print()}
        onNewApplication={onNewApplication}
      />
    );
  }

  return (
    <div className="review-submit">
      <div className="review-submit__header">
        <h1>Student Admission Application</h1>
      </div>

      <Stepper currentStep={6} />

      <div className="review-submit__card">
        <div className="review-submit__card-header">
          <div className="review-submit__card-title">
            <span className="review-submit__card-icon">✅</span>
            <h2>Review & Submit</h2>
          </div>
        </div>
        
        <div className="review-submit__content">
          <div className="review-submit__alert">
            <span className="review-submit__alert-icon">⚠️</span>
            <span className="review-submit__alert-text">
              Please review all information carefully before submitting. Once submitted, changes will require approval.
            </span>
          </div>

          <div className="review-submit__tabs">
            <button 
              className={`review-submit__tab ${activeTab === 'Student' ? 'review-submit__tab--active' : ''}`}
              onClick={() => handleTabChange('Student')}
            >
              Student
            </button>
            <button 
              className={`review-submit__tab ${activeTab === 'Academic' ? 'review-submit__tab--active' : ''}`}
              onClick={() => handleTabChange('Academic')}
            >
              Academic
            </button>
            <button 
              className={`review-submit__tab ${activeTab === 'Guardian' ? 'review-submit__tab--active' : ''}`}
              onClick={() => handleTabChange('Guardian')}
            >
              Guardian
            </button>
            <button 
              className={`review-submit__tab ${activeTab === 'Address' ? 'review-submit__tab--active' : ''}`}
              onClick={() => handleTabChange('Address')}
            >
              Address
            </button>
            <button 
              className={`review-submit__tab ${activeTab === 'Fee & Docs' ? 'review-submit__tab--active' : ''}`}
              onClick={() => handleTabChange('Fee & Docs')}
            >
              Fee & Docs
            </button>
          </div>

          <div className="review-submit__content-area">
            {renderActiveContent()}
          </div>

          <div className="review-submit__terms">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={termsAccepted}
              onChange={handleTermsChange}
              className="review-submit__checkbox"
            />
            <label htmlFor="termsAccepted" className="review-submit__checkbox-label">
              I accept the terms and conditions and confirm that all information provided is accurate.
            </label>
          </div>
        </div>

        <div className="review-submit__actions">
          <button 
            type="button" 
            className="review-submit__btn review-submit__btn--outline"
            onClick={handlePrevious}
          >
            ← Previous
          </button>
          <button 
            type="button" 
            className="review-submit__btn review-submit__btn--outline"
            onClick={handleSaveDraft}
          >
            Save as Draft
          </button>
          <button 
            type="button" 
            className="review-submit__btn review-submit__btn--primary"
            onClick={handleSubmit}
          >
            Submit Application →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
