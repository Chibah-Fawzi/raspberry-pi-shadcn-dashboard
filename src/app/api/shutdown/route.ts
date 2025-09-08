import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Verify the request is coming from the same origin for security
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    if (origin && !origin.includes(host || '')) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      );
    }

    // Execute shutdown command with immediate shutdown
    // Using 'now' option for immediate shutdown without delay
    await execAsync('sudo shutdown -h now');
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Raspberry Pi is shutting down...' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Shutdown error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to shutdown system',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
