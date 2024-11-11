export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
  };
}
