import { Document } from 'mongoose';

export interface Course extends Document {
  id: string;
  subject: string;
  courseNumber: string;
  description: string;
}
