import { Plan } from './plan';

export interface User {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    isAdmin?: boolean;
    planId?: string;
    history: [{
      text: String,
      translation?: {
        lang: String,
        text: String
      },
      date: Date
    }],
    plan?: Plan;
    payment: {
      date: Date;
      total: number;
    }[];
    subscription: {
      id: string,
      planName: string,
      planId: string;
      plan?: Plan;
      startDate: Date;
      endDate?: Date;
      annual: boolean;
    }[];
}
