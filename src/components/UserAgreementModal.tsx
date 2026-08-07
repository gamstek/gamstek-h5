import React from 'react';
import { BottomSheet } from './BottomSheet';

interface UserAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserAgreementModal({ isOpen, onClose }: UserAgreementModalProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="引力波智谱用户协议">
      <div className="flex flex-col gap-4 pb-8">
        <p>欢迎您使用合肥引力波智谱科技有限公司（以下简称“引力波智谱”或“我们”）提供的产品和服务。</p>
        
        <p>
          本协议是您与引力波智谱之间关于使用我们产品和服务所订立的协议。请您仔细阅读以下全部内容。如果您不同意本协议的任意内容，或者无法准确理解条款的含义，请不要进行后续操作。
        </p>
        
        <h3 className="font-bold text-gray-900 mt-2 mb-1 text-[16px]">1. 服务的提供与使用</h3>
        
        <p>
          我们提供的服务包括但不限于质谱仪器相关的咨询、购买、技术支持及售后服务。您在使用我们的服务时，应遵守国家法律法规及本协议的规定，不得利用我们的服务从事任何违法违规活动。
        </p>
        
        <h3 className="font-bold text-gray-900 mt-2 mb-1 text-[16px]">2. 用户信息与隐私</h3>
        
        <p>
          我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。关于我们如何收集、使用、存储和保护您的个人信息，请参见《隐私政策声明》。
        </p>
        
        <h3 className="font-bold text-gray-900 mt-2 mb-1 text-[16px]">3. 知识产权</h3>
        
        <p>
          引力波智谱提供的所有产品、技术、软件、程序、数据及其他信息（包括文字、图像、图片、照片、音频、视频、图表、色彩、版面设计、电子文档）的所有知识产权（包括但不限于版权、商标权、专利权、商业秘密等）及相关权利，均归引力波智谱或其关联公司所有。未经我们书面许可，任何人不得擅自使用。
        </p>
        
        <h3 className="font-bold text-gray-900 mt-2 mb-1 text-[16px]">4. 免责声明</h3>
        
        <p>
          在法律允许的最大范围内，引力波智谱对因使用或不能使用本服务而引起的任何直接、间接、偶然、特殊及后续的损害不承担责任。
        </p>

        <h3 className="font-bold text-gray-900 mt-2 mb-1 text-[16px]">5. 协议修改</h3>
        
        <p>
          引力波智谱有权随时修改本协议的任何条款，一旦本协议的内容发生变动，我们将会在官方网站或相关页面上公布修改之后的协议内容，该公布行为视为引力波智谱已经通知您修改内容。
        </p>
      </div>
    </BottomSheet>
  );
}
