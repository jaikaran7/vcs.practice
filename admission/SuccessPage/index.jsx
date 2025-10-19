import React from 'react';
import './style.scss';

const SuccessPage = ({ 
  admissionData = {},
  onDownloadReceipt,
  onPrint,
  onNewApplication
}) => {
  const {
    admissionNumber = 'ADM20258529',
    studentName = 'Not provided',
    classApplied = 'Not provided',
    applicationDate = new Date().toLocaleDateString('en-GB'),
    status = 'Under Review'
  } = admissionData;

  const handleDownloadReceipt = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    } else {
      console.log('Downloading receipt...');
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleNewApplication = () => {
    if (onNewApplication) {
      onNewApplication();
    } else {
      console.log('Starting new application...');
    }
  };

  return (
    <div className="success-page">
      <div className="success-page__header">
        <h1>Student Admission Application</h1>
      </div>

      <div className="success-page__card">
        <div className="success-page__success-icon">
          <div className="success-page__checkmark">✓</div>
        </div>
        
        <h2 className="success-page__success-title">
          Admission Application Submitted Successfully!
        </h2>

        <div className="success-page__details">
          <h3 className="success-page__details-title">Admission Details</h3>
          <div className="success-page__details-grid">
            <div className="success-page__detail-item">
              <span className="success-page__detail-label">Admission Number:</span>
              <span className="success-page__detail-value">{admissionNumber}</span>
            </div>
            <div className="success-page__detail-item">
              <span className="success-page__detail-label">Student Name:</span>
              <span className="success-page__detail-value">{studentName}</span>
            </div>
            <div className="success-page__detail-item">
              <span className="success-page__detail-label">Class Applied:</span>
              <span className="success-page__detail-value">{classApplied}</span>
            </div>
            <div className="success-page__detail-item">
              <span className="success-page__detail-label">Application Date:</span>
              <span className="success-page__detail-value">{applicationDate}</span>
            </div>
            <div className="success-page__detail-item">
              <span className="success-page__detail-label">Status:</span>
              <span className="success-page__status-badge">{status}</span>
            </div>
          </div>
        </div>

        <div className="success-page__info">
          <div className="success-page__info-icon">⚠️</div>
          <div className="success-page__info-text">
            Your application is under review. You will be contacted within 3-5 business days regarding the admission status.
          </div>
        </div>

        <div className="success-page__actions">
          <button 
            className="success-page__btn success-page__btn--secondary"
            onClick={handleDownloadReceipt}
          >
            <span className="success-page__btn-icon">⬇️</span>
            Download Receipt
          </button>
          <button 
            className="success-page__btn success-page__btn--secondary"
            onClick={handlePrint}
          >
            <span className="success-page__btn-icon">🖨️</span>
            Print
          </button>
          <button 
            className="success-page__btn success-page__btn--primary"
            onClick={handleNewApplication}
          >
            New Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
