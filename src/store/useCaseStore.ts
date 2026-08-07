import { create } from 'zustand';
import { CaseItem, fetchCases, fetchCaseCategories } from '../api/cases';

interface CaseState {
  cases: CaseItem[];
  categories: string[];
  activeCategory: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setActiveCategory: (category: string) => void;
  fetchData: () => Promise<void>;
}

export const useCaseStore = create<CaseState>((set) => ({
  cases: [],
  categories: [],
  activeCategory: '全部',
  isLoading: false,
  error: null,

  setActiveCategory: (category) => set({ activeCategory: category }),

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const casesData = await fetchCases();
      const categoriesData = await fetchCaseCategories(casesData);
      set({ 
        categories: categoriesData, 
        cases: casesData, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '获取数据失败', 
        isLoading: false 
      });
    }
  }
}));
