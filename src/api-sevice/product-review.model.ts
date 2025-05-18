export interface ProductReview {
  id?: number;            // Có thể undefined khi tạo mới
  productId: string;
  userId: number;
  rating: number;         // Từ 1 đến 5
  comment: string;
  createdAt?: string;     // ISO string
  updatedAt?: string;
}