import { create } from 'zustand';
import { Job, fetchJobs } from '../api/jobs';

interface JobState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  isLoading: false,
  error: null,
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchJobs();
      set({ jobs: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '获取社会招聘职位失败',
        isLoading: false,
      });
    }
  }
}));
