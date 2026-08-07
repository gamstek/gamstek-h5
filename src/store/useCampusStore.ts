import { create } from 'zustand';
import { CampusJob, fetchCampusJobs } from '../api/campus';

interface CampusState {
  jobs: CampusJob[];
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
}

export const useCampusStore = create<CampusState>((set) => ({
  jobs: [],
  isLoading: false,
  error: null,
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchCampusJobs();
      set({ jobs: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '获取校园招聘职位失败', 
        isLoading: false 
      });
    }
  }
}));
