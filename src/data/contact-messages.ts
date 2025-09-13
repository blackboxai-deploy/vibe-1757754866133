// Simple in-memory storage for contact messages
// In production, this would be replaced with a proper database

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

// In-memory storage (replace with database in production)
let contactMessages: ContactMessage[] = [];

export function addContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
  const newMessage: ContactMessage = {
    ...message,
    id: generateId(),
    createdAt: new Date(),
    status: 'new'
  };
  
  contactMessages.push(newMessage);
  return newMessage;
}

export function getContactMessages(): ContactMessage[] {
  return contactMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getContactMessageById(id: string): ContactMessage | undefined {
  return contactMessages.find(message => message.id === id);
}

export function updateContactMessageStatus(id: string, status: ContactMessage['status']): boolean {
  const message = contactMessages.find(m => m.id === id);
  if (message) {
    message.status = status;
    return true;
  }
  return false;
}

export function deleteContactMessage(id: string): boolean {
  const index = contactMessages.findIndex(m => m.id === id);
  if (index !== -1) {
    contactMessages.splice(index, 1);
    return true;
  }
  return false;
}

export function getContactStats() {
  const total = contactMessages.length;
  const new_ = contactMessages.filter(m => m.status === 'new').length;
  const read = contactMessages.filter(m => m.status === 'read').length;
  const replied = contactMessages.filter(m => m.status === 'replied').length;

  return {
    total,
    new: new_,
    read,
    replied
  };
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}