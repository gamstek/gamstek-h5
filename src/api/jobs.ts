export interface Job {
  id: number;
  /** 职位分类：'rd' 研发｜'product' 产品｜'business' 业务 */
  category: string;
  title: string;
  summary: string;
  major: string;
  salary: string;
  education: string;
  headcount: string;
  responsibilities: string[];
  requirements: string[];
  sort: number;
}

interface ApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: Job[];
}

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch('https://admin.gamstek.com/api/job/list');
    if (!response.ok) {
      throw new Error('网络请求失败');
    }
    const result: ApiResponse = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error('获取社会招聘职位失败:', error);
    throw error;
  }
};
