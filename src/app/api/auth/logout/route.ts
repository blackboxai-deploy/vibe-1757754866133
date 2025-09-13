import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Clear the auth cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(0),
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}