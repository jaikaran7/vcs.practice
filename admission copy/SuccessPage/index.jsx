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
    // Generate receipt content
    const receiptContent = generateReceiptContent();
    
    // Create and download the receipt
    downloadReceipt(receiptContent);
    
    if (onDownloadReceipt) {
      onDownloadReceipt();
    }
  };

  const generateReceiptContent = () => {
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    return {
      schoolName: "Campus 360 School",
      schoolAddress: "123 Education Street, Knowledge City",
      cityStateZip: "Learning District, State 12345",
      phone: "Phone: +1 (555) 123-4567",
      email: "Email: admissions@campus360.edu",
      website: "Website: www.campus360.edu",
      receiptTitle: "ADMISSION APPLICATION RECEIPT",
      admissionNumber: admissionData.admissionNumber || 'ADM20258529',
      studentName: admissionData.studentName || 'Not provided',
      classApplied: admissionData.classApplied || 'Not provided',
      applicationDate: admissionData.applicationDate || currentDate.toLocaleDateString('en-GB'),
      status: admissionData.status || 'Under Review',
      timestamp: timestamp,
      receiptNumber: `RCP-${Date.now()}`,
      // Additional details from form data
      studentDetails: admissionData.studentDetails || {},
      academicDetails: admissionData.academicDetails || {},
      guardianDetails: admissionData.guardianDetails || {},
      addressDetails: admissionData.addressDetails || {},
      feeDetails: admissionData.feeDetails || {}
    };
  };

  const downloadReceipt = (receiptData) => {
    // Create a new window for the receipt
    const receiptWindow = window.open('', '_blank', 'width=800,height=1000');
    
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Admission Receipt - ${receiptData.admissionNumber}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            color: #333;
          }
          .receipt-header {
            text-align: center;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .school-name {
            font-size: 28px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
          }
          .school-logo {
            font-size: 16px;
            color: #667eea;
            margin-bottom: 15px;
          }
          .school-info {
            text-align: right;
            font-size: 12px;
            color: #666;
            line-height: 1.4;
          }
          .receipt-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin: 30px 0;
            text-decoration: underline;
          }
          .receipt-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
          }
          .detail-label {
            font-weight: bold;
            color: #495057;
          }
          .detail-value {
            color: #6c757d;
          }
          .receipt-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 2px solid #667eea;
            padding-top: 20px;
          }
          .timestamp {
            font-weight: bold;
            color: #667eea;
            margin-top: 10px;
          }
          @media print {
            body { margin: 0; padding: 10px; }
            .receipt-header { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="receipt-header">
          <div class="school-name">${receiptData.schoolName}</div>
          <div class="school-logo">🏫 School Logo</div>
          <div class="school-info">
            ${receiptData.schoolAddress}<br>
            ${receiptData.cityStateZip}<br>
            ${receiptData.phone}<br>
            ${receiptData.email}<br>
            ${receiptData.website}
          </div>
        </div>

        <div class="receipt-title">${receiptData.receiptTitle}</div>

        <div class="receipt-details">
          <div class="detail-row">
            <span class="detail-label">Receipt Number:</span>
            <span class="detail-value">${receiptData.receiptNumber}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Admission Number:</span>
            <span class="detail-value">${receiptData.admissionNumber}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Student Name:</span>
            <span class="detail-value">${receiptData.studentName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Class Applied:</span>
            <span class="detail-value">${receiptData.classApplied}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Application Date:</span>
            <span class="detail-value">${receiptData.applicationDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value">${receiptData.status}</span>
          </div>
        </div>

        <div class="receipt-footer">
          <div>This is a computer-generated receipt.</div>
          <div class="timestamp">Generated on: ${receiptData.timestamp}</div>
          <div style="margin-top: 20px; font-size: 10px; color: #999;">
            Campus 360 School Admission System<br>
            Powered by Digital Admission Platform
          </div>
        </div>
      </body>
      </html>
    `;

    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    
    // Wait for content to load, then trigger print
    setTimeout(() => {
      receiptWindow.print();
    }, 500);
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      // Print the current success page
      window.print();
    }
  };

  const handleNewApplication = () => {
    console.log('SuccessPage: handleNewApplication called');
    console.log('SuccessPage: onNewApplication prop:', onNewApplication);
    
    if (onNewApplication) {
      console.log('SuccessPage: Calling onNewApplication function');
      onNewApplication();
    } else {
      console.log('SuccessPage: onNewApplication is not provided, logging fallback');
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
