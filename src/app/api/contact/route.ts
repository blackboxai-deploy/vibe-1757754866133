import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { addContactMessage, getContactMessages } from '@/data/contact-messages';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid input data', 
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, company, service, message } = validation.data;

    // Save contact message
    const contactMessage = addContactMessage({
      name,
      email,
      phone,
      company,
      service,
      message
    });

    // In production, you might want to:
    // 1. Send email notification to admin
    // 2. Send confirmation email to user
    // 3. Log the submission for analytics

    return NextResponse.json({
      success: true,
      message: 'Contact message sent successfully',
      id: contactMessage.id
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated (admin only)
    const user = requireAuth(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get all contact messages
    const messages = getContactMessages();

    return NextResponse.json({
      success: true,
      messages
    });

  } catch (error) {
    console.error('Get contact messages API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}