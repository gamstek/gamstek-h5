export interface ConsultPayload {
  name: string;
  phone: string;
  organization: string;
  region: string;
  productModel: string;
  question: string;
  source: 'consult_page';
}

interface ConsultResponse {
  code: number;
  success: boolean;
  message: string;
  data: unknown;
}

export async function submitConsult(payload: ConsultPayload): Promise<void> {
  try {
    const response = await fetch('https://admin.gamstek.com/api/consult', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('网络请求失败');
    }

    const result: ConsultResponse = await response.json();
    if (!result.success) {
      throw new Error(result.message || '提交失败，请稍后重试');
    }
  } catch (error) {
    console.error('提交咨询信息失败:', error);
    throw error;
  }
}
