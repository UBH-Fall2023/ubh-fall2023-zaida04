export type MealItem = {
  id: string;
  name: string;
  dishType: string;
  src?: string;
  description: string;
  dateAdded: number | null;
  price: number;
};
