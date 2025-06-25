
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

const PDFDocumentationGenerator = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;
    const lineHeight = 7;
    const margin = 20;

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize = 12, isBold = false) => {
      doc.setFontSize(fontSize);
      if (isBold) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      
      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      
      if (yPosition + lines.length * lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * lineHeight + 3;
    };

    const addHeading = (text: string, fontSize = 16) => {
      yPosition += 5;
      addText(text, fontSize, true);
      yPosition += 5;
    };

    const addSubheading = (text: string) => {
      addText(text, 14, true);
    };

    // Title Page
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Elizabeth Clinic', pageWidth / 2, 40, { align: 'center' });
    
    doc.setFontSize(20);
    doc.text('Appointment Management System', pageWidth / 2, 55, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('Technical Documentation', pageWidth / 2, 75, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated on: ' + new Date().toLocaleDateString(), pageWidth / 2, 90, { align: 'center' });

    // Add new page for content
    doc.addPage();
    yPosition = 20;

    // Table of Contents
    addHeading('Table of Contents', 18);
    addText('1. Methodology');
    addText('2. Analysis of the Current System');
    addText('3. Analysis of the Proposed System');
    addText('4. System Design');
    addText('5. Design Procedure');
    addText('   • Input Form Design');
    addText('   • Output Form Design');
    addText('   • Database Design');
    addText('6. System Specification');
    addText('7. Data Flow Diagram');
    addText('8. System Flowchart');
    addText('9. Algorithm');

    doc.addPage();
    yPosition = 20;

    // 1. Methodology
    addHeading('1. Methodology', 18);
    addSubheading('Development Approach');
    addText('The Elizabeth Clinic Appointment Management System follows an Agile development methodology with iterative development cycles. The system is built using modern web technologies including React, TypeScript, and Supabase for backend services.');
    
    addSubheading('Technology Stack');
    addText('• Frontend: React 18.3.1 with TypeScript for type safety');
    addText('• UI Framework: Tailwind CSS with shadcn/ui components');
    addText('• Backend: Supabase (PostgreSQL database with real-time capabilities)');
    addText('• Authentication: Supabase Auth with role-based access control');
    addText('• State Management: TanStack Query for server state management');
    addText('• Build Tool: Vite for fast development and optimized builds');

    // 2. Analysis of Current System
    addHeading('2. Analysis of the Current System', 18);
    addSubheading('Current Challenges');
    addText('The traditional appointment booking system faces several limitations:');
    addText('• Manual appointment scheduling leading to human errors');
    addText('• Limited accessibility for patients to book appointments');
    addText('• Inefficient record keeping and patient data management');
    addText('• Lack of real-time updates and notifications');
    addText('• Paper-based systems prone to loss and damage');
    addText('• Difficulty in managing multiple healthcare providers');

    addSubheading('Identified Problems');
    addText('• Time-consuming manual processes');
    addText('• Poor patient experience due to long waiting times');
    addText('• Inefficient resource utilization');
    addText('• Limited reporting capabilities');
    addText('• Security concerns with paper records');

    // 3. Analysis of Proposed System
    addHeading('3. Analysis of the Proposed System', 18);
    addSubheading('Proposed Solutions');
    addText('The new digital appointment management system addresses current limitations through:');
    addText('• Online appointment booking with real-time availability');
    addText('• Automated notifications and reminders');
    addText('• Digital patient records with secure access');
    addText('• Role-based dashboards for admins and patients');
    addText('• Real-time updates and synchronization');
    addText('• Comprehensive reporting and analytics');

    addSubheading('Expected Benefits');
    addText('• Improved patient satisfaction through convenient online booking');
    addText('• Reduced administrative workload for clinic staff');
    addText('• Enhanced data security and backup capabilities');
    addText('• Better resource planning and optimization');
    addText('• Comprehensive audit trails and reporting');

    // 4. System Design
    addHeading('4. System Design', 18);
    addSubheading('Architecture Overview');
    addText('The system follows a client-server architecture with the following components:');
    addText('• Frontend: React-based single-page application (SPA)');
    addText('• Backend: Supabase providing database, authentication, and real-time features');
    addText('• Database: PostgreSQL with Row Level Security (RLS)');
    addText('• Authentication: JWT-based authentication with role-based access');

    addSubheading('Key Components');
    addText('• Authentication System: Handles user login, registration, and role management');
    addText('• User Dashboard: Patient interface for booking and managing appointments');
    addText('• Admin Dashboard: Administrative interface for managing appointments and users');
    addText('• Appointment Management: Core booking and scheduling functionality');
    addText('• Real-time Updates: Live synchronization of appointment changes');

    // 5. Design Procedure
    addHeading('5. Design Procedure', 18);
    
    addSubheading('Input Form Design');
    addText('User Registration Form:');
    addText('• Full Name (text input, required)');
    addText('• Email (email input, required, unique)');
    addText('• Phone Number (tel input, required)');
    addText('• Password (password input, minimum 6 characters)');
    addText('• Role Selection (admin requires verification code)');

    addText('Appointment Booking Form:');
    addText('• Patient Information (auto-filled for logged users)');
    addText('• Appointment Date (date picker)');
    addText('• Appointment Time (time slots)');
    addText('• Department/Service Selection');
    addText('• Reason for Visit (textarea)');

    addSubheading('Output Form Design');
    addText('User Dashboard Displays:');
    addText('• Upcoming appointments list');
    addText('• Appointment history');
    addText('• Booking confirmation messages');
    addText('• Profile information');

    addText('Admin Dashboard Displays:');
    addText('• All appointments table with filtering');
    addText('• User management interface');
    addText('• Appointment statistics and reports');
    addText('• System configuration options');

    addSubheading('Database Design');
    addText('Core Tables:');
    addText('• profiles: User information and roles');
    addText('• appointments: Appointment details and status');
    addText('• auth.users: Supabase authentication data');

    addText('Key Relationships:');
    addText('• One-to-many: User to Appointments');
    addText('• Foreign keys ensure data integrity');
    addText('• Row Level Security policies control access');

    // 6. System Specification
    addHeading('6. System Specification', 18);
    
    addSubheading('Functional Requirements');
    addText('• User registration and authentication');
    addText('• Role-based access control (Admin/User)');
    addText('• Appointment booking and management');
    addText('• Real-time appointment updates');
    addText('• Email notifications for appointments');
    addText('• Admin panel for appointment oversight');

    addSubheading('Non-Functional Requirements');
    addText('• Performance: Page load time < 3 seconds');
    addText('• Security: Data encryption and secure authentication');
    addText('• Scalability: Support for 1000+ concurrent users');
    addText('• Availability: 99.9% uptime');
    addText('• Usability: Intuitive interface for all user types');

    addSubheading('Technical Requirements');
    addText('• Modern web browser support (Chrome, Firefox, Safari, Edge)');
    addText('• Responsive design for mobile and desktop');
    addText('• Internet connection for real-time features');
    addText('• Supabase backend infrastructure');

    // 7. Data Flow Diagram
    addHeading('7. Data Flow Diagram', 18);
    addText('Level 0 DFD (Context Diagram):');
    addText('External Entities: Patients, Administrators');
    addText('System: Appointment Management System');
    addText('Data Flows: Login credentials, appointment requests, confirmations');

    addText('Level 1 DFD:');
    addText('Process 1: User Authentication');
    addText('Process 2: Appointment Booking');
    addText('Process 3: Appointment Management');
    addText('Process 4: User Management');
    addText('Data Stores: User Database, Appointment Database');

    // 8. System Flowchart
    addHeading('8. System Flowchart', 18);
    addText('User Registration Flow:');
    addText('Start → Registration Form → Validate Input → Check Admin Code (if admin) → Create Account → Send Confirmation → End');

    addText('Appointment Booking Flow:');
    addText('Start → Login → Select Date/Time → Fill Details → Validate Availability → Book Appointment → Send Confirmation → End');

    addText('Admin Management Flow:');
    addText('Start → Admin Login → View Dashboard → Select Action → Manage Appointments/Users → Update Database → End');

    // 9. Algorithm
    addHeading('9. Algorithm', 18);
    
    addSubheading('Authentication Algorithm');
    addText('1. User submits login credentials');
    addText('2. System validates email format and password strength');
    addText('3. Supabase Auth verifies credentials against database');
    addText('4. On success, generate JWT token and user session');
    addText('5. Redirect user to appropriate dashboard based on role');
    addText('6. On failure, display error message and retry option');

    addSubheading('Appointment Booking Algorithm');
    addText('1. User selects desired appointment date and time');
    addText('2. System checks availability in real-time');
    addText('3. If available, reserve time slot temporarily');
    addText('4. User fills appointment details form');
    addText('5. Validate all required fields');
    addText('6. Submit appointment to database with user ID');
    addText('7. Send confirmation email to user');
    addText('8. Update dashboard with new appointment');

    addSubheading('Row Level Security Algorithm');
    addText('1. User makes database request');
    addText('2. Supabase extracts JWT token from request');
    addText('3. RLS policy checks user permissions');
    addText('4. For appointments: users can only access their own data');
    addText('5. For admin functions: verify admin role in user metadata');
    addText('6. Allow/deny request based on policy evaluation');

    // Save the PDF
    doc.save('Elizabeth-Clinic-Documentation.pdf');
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={generatePDF} className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        Download PDF Documentation
      </Button>
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <FileText className="h-4 w-4" />
        Technical Specifications
      </div>
    </div>
  );
};

export default PDFDocumentationGenerator;
