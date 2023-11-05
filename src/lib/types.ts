export type MealItem = {
  id: string;
  name: string;
  dishType: string;
  src?: string;
  description: string;
  dateAdded: number | null;
  price: number;
  rating: number;
  restaurantId: string;
  checkoutId: string;
};

export type OrderForm = {
  name: string;
  location: string;
  paymentType: Payment;
  urgency: Urgency;
  schedule: string;
  timePlaced: number | null;
};

export enum Urgency {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
export enum Payment {
  VENMO = "venmo",
  CASHAPP = "cashapp",
  CASH = "cash",
}
