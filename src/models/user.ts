export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  planId: string;
  history: [{
    text: String,
    translation: {
      lang: String,
      text: String
    },
    date: Date
  }],
  payment: {
    date: Date;
    total: number;
  }[];
  subscription: {
    id: string,
    planName: string,
    planId: string;
    startDate: Date;
    endDate: Date;
    annual: boolean;
  }[];
  permissions: {
    selection: boolean;
    preview: boolean;
    history: boolean;
    translation: boolean;
    capture: boolean;
    quickCapture: boolean;
  }
}
