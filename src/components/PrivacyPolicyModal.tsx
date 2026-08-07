import React from 'react';
import { BottomSheet } from './BottomSheet';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="用户隐私政策">
      <div className="flex flex-col gap-4 pb-8">
        <p>为切实保护用户隐私权，优化用户体验，合肥引力波智谱科技有限公司（“引力波智谱”或“我们”）根据现行法规及政策，制定本用户隐私政策。引力波智谱了解个人信息对客户的重要性，我们力求明确说明我们获取、管理及保护用户个人信息的政策及措施。</p>
        
        <p>本隐私政策将帮助您了解以下内容：</p>
        <div className="space-y-1">
          <p>一. 我们会收集哪些信息（无论其是否为个人信息）</p>
          <p>二. 我们如何使用信息</p>
          <p>三. 我们如何共享信息</p>
          <p>四. 我们如何转让信息</p>
          <p>五. 我们如何公开披露信息</p>
          <p>六. 一般储存期限</p>
          <p>七. 我们如何确保您的信息安全</p>
          <p>八. 本隐私政策不适用的范围</p>
          <p>九. 本隐私政策如何更新</p>
          <p>十. 联系我们</p>
        </div>

        <p>本隐私政策适用于引用或链接本隐私政策的与引力波智谱有关的引力波智谱网站或应用程序。此外，我们还可能为特定应用程序准备了独立的隐私说明，届时，该产品的隐私说明和本隐私政策将共同作为该产品的隐私政策文件。</p>

        <p>引力波智谱深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。</p>
      </div>
    </BottomSheet>
  );
}
