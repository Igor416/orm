export interface Choices {
  product_names: string[]
  sizes: string[]
  shops: string[]
  salesmen: string[]
}

export interface Product {
  name: string;
  size: string;
  non_standard_size?: string;
  price: number;
}

export interface Client {
  name: string;
  phone: string;
  address: string;
}

export interface Sale {
  date: Date;
  shop: string;
  salesman: string;
  products: Product[];
  client: Client;
}