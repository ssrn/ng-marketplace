export interface Product {
  id: string;
  name: string;
  category: {
    parentId: string,
    id: string
  };
  price: number;
  photos: string[];
  description: string;
  published: boolean;
}
