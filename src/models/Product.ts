export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    created_at: string
}

export type ProductUpdate = Omit<Product, 'id' | 'created_at'>;
export type ProductCreate = Omit<Product, 'id' | 'created_at'>;
