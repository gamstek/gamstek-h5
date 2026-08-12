export interface CampusJob {
  id: number;
  projectName: string;
  category: string;
  title: string;
  description: string[];
  requirements: string[];
  city: string;
  sort: number;
}

interface ApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: CampusJob[];
}

export const fetchCampusJobs = async (): Promise<CampusJob[]> => {
  try {
    const response = await fetch('https://admin.gamstek.com/api/campus/jobs');
    if (!response.ok) {
      throw new Error('网络请求失败');
    }
    const result: ApiResponse = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error('获取校园招聘职位失败:', error);
    throw error;
  }
};

export interface PrivacyNotice {
  version: string;
  title: string;
  content: string;
}

export const fetchPrivacyNotice = async (): Promise<PrivacyNotice | null> => {
  try {
    const res = await fetch('https://admin.gamstek.com/api/campus/privacy-notices/current');
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return null;
  } catch (error) {
    console.error('获取隐私声明失败:', error);
    throw error;
  }
};

export const sendSmsCode = async (phone: string, captchaToken?: string, noticeVersion: string = 'V1.0') => {
  const res = await fetch('https://admin.gamstek.com/api/campus/auth/sms/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone,
      captchaToken,
      privacyAccepted: true,
      noticeVersion
    })
  });
  return res.json();
};

export const loginWithSms = async (phone: string, code: string, privacyAccepted: boolean, noticeVersion: string) => {
  const res = await fetch('https://admin.gamstek.com/api/campus/auth/sms/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone,
      code,
      privacyAccepted,
      noticeVersion
    })
  });
  return res.json();
};

export interface CampusFile {
  id: number;
  originalName: string;
  mime: string;
  size: number;
  createdAt: string;
}

const handleUnauthorized = () => {
  // 多个并发请求可能同时返回 401。第一个请求清除 token 后，
  // 后续请求不再重复派发登录过期事件。
  if (!localStorage.getItem('campus_token')) return;
  localStorage.removeItem('campus_token');
  localStorage.removeItem('campus_phone');
  window.dispatchEvent(new CustomEvent('campus-unauthorized'));
};

export const fetchCampusFiles = async (): Promise<CampusFile[]> => {
  const token = localStorage.getItem('campus_token') || '';
  const response = await fetch('https://admin.gamstek.com/api/campus/files', {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  const json = await response.json();
  if (json.code === 401) {
    handleUnauthorized();
    return [];
  }
  if (json.success && json.data) {
    return json.data;
  }
  return [];
};

export const uploadFile = async (file: File) => {
  const token = localStorage.getItem('campus_token') || '';
  const response = await fetch('https://admin.gamstek.com/api/campus/files', {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': file.type || 'application/octet-stream',
      'x-file-name': encodeURIComponent(file.name)
    },
    body: file
  });
  const json = await response.json();
  if (json.code === 401) {
    handleUnauthorized();
  }
  return json;
};

export const fetchResume = async () => {
  const token = localStorage.getItem('campus_token') || '';
  const response = await fetch('https://admin.gamstek.com/api/campus/resume', {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  const json = await response.json();
  if (json.code === 401) {
    handleUnauthorized();
    return null;
  }
  if (json.success && json.data) {
    return json.data;
  }
  return null;
};

export const submitResume = async (payload: any) => {
  const token = localStorage.getItem('campus_token') || '';
  const response = await fetch('https://admin.gamstek.com/api/campus/resume', {
    method: 'PUT',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (response.status === 401) {
    handleUnauthorized();
  } else {
    try {
      const clone = response.clone();
      const json = await clone.json();
      if (json.code === 401) {
        handleUnauthorized();
      }
    } catch (e) {
      // ignore non-json
    }
  }
  return response;
};

export interface ApplicationHistory {
  id: number;
  fromStatus: string;
  toStatus: string;
  statusLabel: string;
  note: string;
  createdAt: string;
}

export interface ApplicationRecord {
  id: number;
  job: CampusJob;
  status: string;
  statusLabel: string;
  rejectionMessage: string | null;
  createdAt: string;
  updatedAt: string;
  history?: ApplicationHistory[];
}

export const submitApplication = async (jobId: number, privacyAccepted: boolean, noticeVersion: string) => {
  const token = localStorage.getItem('campus_token') || '';

  // 投递前先查询已有投递记录
  try {
    const existingApps = await fetchApplications();
    if (existingApps && existingApps.length > 0) {
      // 如果找到已有投递记录
      const activeApp = existingApps[0];
      const jobTitle = activeApp.job?.title || '该职位';
      return {
        success: false,
        message: `您已投递“${jobTitle}”，招聘流程结束前不能再次投递`
      };
    }
  } catch (err) {
    console.error('检查已有投递记录失败:', err);
  }

  const response = await fetch('https://admin.gamstek.com/api/campus/applications', {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ jobId, privacyAccepted, noticeVersion })
  });
  const json = await response.json();
  if (json.code === 401) {
    handleUnauthorized();
  }
  return json;
};

export const fetchApplications = async (): Promise<ApplicationRecord[]> => {
  const token = localStorage.getItem('campus_token') || '';
  const response = await fetch('https://admin.gamstek.com/api/campus/applications', {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  const json = await response.json();
  if (json.code === 401) {
    handleUnauthorized();
    return [];
  }
  if (json.success && json.data) {
    return json.data;
  }
  return [];
};

export const fetchApplicationDetails = async (id: number): Promise<ApplicationRecord | null> => {
  const token = localStorage.getItem('campus_token') || '';
  const response = await fetch(`https://admin.gamstek.com/api/campus/applications/${id}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  const json = await response.json();
  if (json.code === 401) {
    handleUnauthorized();
    return null;
  }
  if (json.success && json.data) {
    return json.data;
  }
  return null;
};

export const logout = async () => {
  const token = localStorage.getItem('campus_token') || '';
  if (!token) return;
  try {
    const response = await fetch('https://admin.gamstek.com/api/campus/auth/logout', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
