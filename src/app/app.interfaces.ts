export interface Product {
  id: string;
  category: {};
  img: string[];
  name: string;
  price: number;
  description: string;
  published: boolean;
}

export interface Category {
  id: string;
  name: string;
  parentId: string;
  url?: string;
  weight: number;
}

export interface Menu {
  name: string;
  url: string;
  weight: number;
}
