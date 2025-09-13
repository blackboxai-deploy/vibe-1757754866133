import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeX4XTJqIDp2GjdmK'; // 'admin123'

export interface User {
  id: string;
  username: string;
  role: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(user: User): string {
  return jwt.sign(
    { 
      userId: user.id, 
      username: user.username, 
      role: user.role 
    },
    JWT_SECRET,
    { 
      expiresIn: '24h',
      issuer: 'solhamedia',
      audience: 'solhamedia-admin'
    }
  );
}

// Verify JWT token
export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'solhamedia',
      audience: 'solhamedia-admin'
    }) as any;
    
    return {
      id: decoded.userId,
      username: decoded.username,
      role: decoded.role
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Authenticate admin user
export async function authenticateAdmin(username: string, password: string): Promise<User | null> {
  try {
    // Check username
    if (username !== ADMIN_USERNAME) {
      return null;
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, ADMIN_PASSWORD_HASH);
    if (!isValidPassword) {
      return null;
    }

    return {
      id: 'admin-1',
      username: ADMIN_USERNAME,
      role: 'admin'
    };
  } catch (error) {
    console.error('Authentication failed:', error);
    return null;
  }
}

// Extract token from request
export function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookies
  const cookies = request.cookies;
  const tokenCookie = cookies.get('auth-token');
  if (tokenCookie) {
    return tokenCookie.value;
  }

  return null;
}

// Middleware to check authentication
export function requireAuth(request: NextRequest): User | null {
  const token = getTokenFromRequest(request);
  if (!token) {
    return null;
  }

  const user = verifyToken(token);
  return user;
}

// Rate limiting helper (simple in-memory implementation)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(ip: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
}

// Clean up expired rate limit entries
export function cleanupRateLimit(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Initialize cleanup interval
if (typeof window === 'undefined') {
  // Only run on server side
  setInterval(cleanupRateLimit, 60 * 1000); // Clean up every minute
}