export interface CaseItem {
  id: number;
  name: string;
  description: string;
  category: string;
  coverUrl: string;
  linkUrl: string;
}

interface ApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    list: CaseItem[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export const fetchCases = async (): Promise<CaseItem[]> => {
  try {
    const response = await fetch('https://admin.gamstek.com/api/typical-application/page?page=1&pageSize=50');
    if (!response.ok) {
      throw new Error('网络请求失败');
    }
    const result: ApiResponse = await response.json();
    if (result.success && result.data && result.data.list) {
      return result.data.list;
    }
    return [];
  } catch (error) {
    console.error('获取应用案例失败:', error);
    throw error;
  }
};

export const fetchCaseCategories = async (cases: CaseItem[]): Promise<string[]> => {
  const categories = new Set(cases.map(c => c.category).filter(Boolean));
  return ['全部', ...Array.from(categories)];
};

