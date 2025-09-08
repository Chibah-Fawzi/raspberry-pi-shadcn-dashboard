# Shutdown Button Feature

## Overview
A secure shutdown button has been added to the Raspberry Pi dashboard that allows users to safely power off the device with a confirmation dialog.

## Features
- **Confirmation Dialog**: Prevents accidental shutdowns with a clear warning dialog
- **Visual Feedback**: Loading states and clear visual indicators during shutdown process
- **Security**: API endpoint includes origin validation for security
- **Responsive Design**: Works on both desktop and mobile devices

## Components Added

### 1. Shutdown API Endpoint (`/api/shutdown`)
- **Method**: POST
- **Security**: Origin validation to prevent unauthorized access
- **Command**: Uses `sudo shutdown -h now` for immediate shutdown
- **Error Handling**: Comprehensive error handling with user-friendly messages

### 2. UI Components
- **Dialog Component** (`/components/ui/dialog.tsx`): Reusable modal dialog
- **Button Component** (`/components/ui/button.tsx`): Styled button with variants
- **Shutdown Button** (`/components/shutdown-button.tsx`): Main shutdown component with confirmation

### 3. Integration
- Added to the main dashboard header
- Positioned next to the theme toggle for easy access
- Responsive design that works on all screen sizes

## Usage
1. Click the red "Shutdown Pi" button in the dashboard header
2. A confirmation dialog will appear with a warning message
3. Click "Yes, Shutdown" to confirm or "Cancel" to abort
4. The system will immediately begin the shutdown process

## Security Considerations
- The API endpoint validates the request origin
- Uses `sudo` command which requires proper permissions
- Confirmation dialog prevents accidental shutdowns
- Clear warning messages inform users of the consequences

## Requirements
- The application must run with appropriate permissions to execute shutdown commands
- The user running the application must have sudo privileges
- The Raspberry Pi must be properly configured for shutdown commands

## Error Handling
- Network errors are caught and displayed to the user
- Permission errors are handled gracefully
- Loading states prevent multiple simultaneous shutdown attempts
- Clear error messages help users understand what went wrong
