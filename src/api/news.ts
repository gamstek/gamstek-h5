export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  coverUrl: string;
  sourceUrl?: string;
  publishTime: string;
}

interface ApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: NewsItem[];
}

interface NewsPageResponse {
  list: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface ApiPageResponse {
  code: number;
  success: boolean;
  message: string;
  data: NewsPageResponse;
}

export const fetchNewsPage = async (page: number, pageSize: number): Promise<NewsPageResponse> => {
  try {
    const response = await fetch(`https://admin.gamstek.com/api/news/page?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error('网络请求失败');
    }
    const result: ApiPageResponse = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    return { list: [], total: 0, page: 1, pageSize };
  } catch (error) {
    console.error('获取新闻列表失败:', error);
    throw error;
  }
};

export const fetchHomeNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch('https://admin.gamstek.com/api/news/home?limit=3');
    if (!response.ok) {
      throw new Error('网络请求失败');
    }
    const result: ApiResponse = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error('获取新闻动态失败:', error);
    throw error;
  }
};
