const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// API 호출 헬퍼 함수
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

// 웨딩홀 API 서비스
export const weddingHallService = {
  // 웨딩홀 목록 조회
  async getList(params?: {
    offset?: number;
    limit?: number;
    sidos?: string[];
    guguns?: string[];
    guest_counts?: string[];
    wedding_types?: string[];
    food_menus?: string[];
    hall_types?: string[];
    hall_styles?: string[];
    rental_cost_ranges?: string[];
    food_cost_ranges?: string[];
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // 배열인 경우 각 값을 개별적으로 추가
            value.forEach(v => queryParams.append(key, v));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }
    
    const query = queryParams.toString();
    const endpoint = `/wedding-halls${query ? `?${query}` : ''}`;
    return fetchAPI(endpoint);
  },

  // 웨딩홀 검색
  async search(query: string, params?: {
    offset?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams({ q: query });
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return fetchAPI(`/wedding-halls/search?${queryParams.toString()}`);
  },

  // 웨딩홀 상세 정보 조회
  async getDetail(productId: string) {
    return fetchAPI(`/wedding-halls/${productId}`);
  },

  // 웨딩홀 개수 조회
  async getCount(params?: {
    sidos?: string[];
    guguns?: string[];
    guest_counts?: string[];
    wedding_types?: string[];
    hall_types?: string[];
    rental_cost_ranges?: string[];
    food_cost_ranges?: string[];
    food_menus?: string[];
    hall_styles?: string[];
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, String(v)));
          } else {
            queryParams.append(key, String(value));
          }
        }
      });
    }
    
    const query = queryParams.toString();
    const endpoint = `/wedding-halls/count${query ? `?${query}` : ''}`;
    return fetchAPI(endpoint);
  },
};

// 스튜디오 API 서비스
export const studioService = {
  // 스튜디오 목록 조회
  async getList(params?: {
    offset?: number;
    limit?: number;
    sidos?: string[];
    guguns?: string[];
    price_ranges?: string[];
    shooting_styles?: string[];
    shooting_types?: string[];
    scene_types?: string[];
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // 배열인 경우 각 값을 개별적으로 추가
            value.forEach(v => queryParams.append(key, v));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }
    
    const query = queryParams.toString();
    const endpoint = `/studios${query ? `?${query}` : ''}`;
    return fetchAPI(endpoint);
  },

  // 스튜디오 검색
  async search(query: string, params?: {
    offset?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams({ q: query });
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return fetchAPI(`/studios/search?${queryParams.toString()}`);
  },

  // 스튜디오 상세 정보 조회
  async getDetail(studioId: string) {
    return fetchAPI(`/studios/${studioId}`);
  },

  // 스튜디오 패키지 조회
  async getPackages(studioId: string) {
    return fetchAPI(`/studios/${studioId}/packages`);
  },

  // 스튜디오 개수 조회
  async getCount(params?: {
    sidos?: string[];
    guguns?: string[];
    price_ranges?: string[];
    shooting_styles?: string[];
    shooting_types?: string[];
    scene_types?: string[];
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, String(v)));
          } else {
            queryParams.append(key, String(value));
          }
        }
      });
    }
    
    const query = queryParams.toString();
    const endpoint = `/studios/count${query ? `?${query}` : ''}`;
    return fetchAPI(endpoint);
  },
};

// 매거진 API 서비스
export const magazineService = {
  // 매거진 목록 조회
  async getList(params?: {
    offset?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const query = queryParams.toString();
    const endpoint = `/magazines${query ? `?${query}` : ''}`;
    return fetchAPI(endpoint);
  },

  // 매거진 상세 정보 조회
  async getDetail(magazineId: string) {
    return fetchAPI(`/magazines/${magazineId}`);
  },
};

// 큐레이션 API 서비스
export const curationService = {
  // 큐레이션 템플릿 목록 조회
  async getList(params?: {
    offset?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const query = queryParams.toString();
    const endpoint = `/curations/templates${query ? `?${query}` : ''}`;
    return fetchAPI(endpoint);
  },

  // 큐레이션 템플릿 상세 정보 조회
  async getDetail(templateId: string) {
    return fetchAPI(`/curations/templates/${templateId}`);
  },

  // 큐레이션 템플릿 콘텐츠 조회
  async getContents(templateId: string) {
    return fetchAPI(`/curations/templates/${templateId}/contents`);
  },
};

// 뉴스 API 서비스
export const newsService = {
  // 뉴스 목록 조회
  async getList(params?: {
    offset?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const query = queryParams.toString();
    const endpoint = `/news${query ? `?${query}` : ''}`;
    return fetchAPI(endpoint);
  },

  // 뉴스 상세 정보 조회
  async getDetail(newsId: string) {
    return fetchAPI(`/news/${newsId}`);
  },
};

// 위시리스트 API 서비스
export const wishlistService = {
  // 위시리스트 목록 조회
  async getList() {
    return fetchAPI('/wishlists');
  },

  // 위시리스트에 추가
  async add(productId: string, productType: 'wedding_hall' | 'studio') {
    return fetchAPI('/wishlists', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        product_type: productType,
      }),
    });
  },

  // 위시리스트에서 삭제
  async remove(productId: string) {
    return fetchAPI(`/wishlists/${productId}`, {
      method: 'DELETE',
    });
  },
};