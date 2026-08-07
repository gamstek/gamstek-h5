import { create } from 'zustand';
import { NewsItem, fetchHomeNews, fetchNewsPage } from '../api/news';

interface NewsState {
  homeNews: NewsItem[];
  
  // Paginated news
  newsList: NewsItem[];
  page: number;
  pageSize: number;
  hasMore: boolean;
  total: number;
  
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  
  // Actions
  fetchHomeNewsData: () => Promise<void>;
  fetchNewsList: (reset?: boolean) => Promise<void>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  homeNews: [],
  
  newsList: [],
  page: 1,
  pageSize: 10,
  hasMore: true,
  total: 0,
  
  isLoading: false,
  isLoadingMore: false,
  error: null,

  fetchHomeNewsData: async () => {
    set({ isLoading: true, error: null });
    try {
      const newsData = await fetchHomeNews();
      set({ 
        homeNews: newsData,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '获取新闻动态失败', 
        isLoading: false 
      });
    }
  },

  fetchNewsList: async (reset = false) => {
    const { page, pageSize, hasMore, isLoading, isLoadingMore } = get();
    
    if (!reset && (!hasMore || isLoading || isLoadingMore)) {
      return;
    }
    
    const currentPage = reset ? 1 : page;
    
    if (reset) {
      set({ isLoading: true, error: null });
    } else {
      set({ isLoadingMore: true, error: null });
    }
    
    try {
      const response = await fetchNewsPage(currentPage, pageSize);
      
      set((state) => {
        const newList = reset ? response.list : [...state.newsList, ...response.list];
        return {
          newsList: newList,
          total: response.total,
          page: currentPage + 1,
          hasMore: newList.length < response.total,
          isLoading: false,
          isLoadingMore: false,
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '获取新闻列表失败', 
        isLoading: false,
        isLoadingMore: false
      });
    }
  }
}));
