// 웨딩홀 타입 정의
export interface WeddingHall {
  id: string;
  name: string;
  address: string;
  price: {
    min: number;
    max: number;
  };
  capacity: {
    min: number;
    max: number;
  };
  images: string[];
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  location: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email?: string;
  };
  availableDates?: string[];
  parkingSpaces?: number;
  hallCount?: number;
}

// 스튜디오 타입 정의
export interface Studio {
  id: string;
  name: string;
  address: string;
  price: {
    basic: number;
    premium?: number;
  };
  images: string[];
  description: string;
  services: string[];
  rating: number;
  reviewCount: number;
  location: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email?: string;
    instagram?: string;
  };
  portfolioImages?: string[];
  specialties?: string[];
  photographers?: number;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 리스트 응답 타입
export interface ListResponse<T> {
  items: T[];
  pagination: Pagination;
}

// 필터 옵션
export interface WeddingHallFilters {
  priceMin?: number;
  priceMax?: number;
  capacityMin?: number;
  capacityMax?: number;
  location?: string;
  features?: string[];
  sortBy?: 'price' | 'rating' | 'reviewCount';
  sortOrder?: 'asc' | 'desc';
}

export interface StudioFilters {
  priceMin?: number;
  priceMax?: number;
  location?: string;
  services?: string[];
  specialties?: string[];
  sortBy?: 'price' | 'rating' | 'reviewCount';
  sortOrder?: 'asc' | 'desc';
}