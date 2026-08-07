import { useEffect } from 'react';

const SITE_TITLE = '引力波智谱 GAMSTEK';

/**
 * 根据页面设置 document.title，格式：页面名 | 引力波智谱 GAMSTEK
 * 传空字符串或 null 时仅显示站点名。
 */
export function useDocumentTitle(pageTitle?: string | null) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;
  }, [pageTitle]);
}
