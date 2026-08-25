import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const resumeSchema = {
  type: SchemaType.OBJECT,
  properties: {
    personal_info: {
      type: SchemaType.OBJECT,
      properties: {
        full_name: { type: SchemaType.STRING },
        email: { type: SchemaType.STRING },
        phone: { type: SchemaType.STRING },
        location: { type: SchemaType.STRING },
        headline: { type: SchemaType.STRING },
      },
      required: ['full_name', 'email'],
    },
    experiences: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          role: { type: SchemaType.STRING },
          company: { type: SchemaType.STRING },
          period: { type: SchemaType.STRING },
          highlights: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
          }
        }
      }
    }
  }
};