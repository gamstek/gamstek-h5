import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CampusLayout } from './components/CampusLayout';
import { HomePage } from './pages/HomePage';
import { MS8100Details } from './pages/products/MS8100Details';
import { MS8000Details } from './pages/products/MS8000Details';
import { FTMSDetails } from './pages/products/FTMSDetails';
import { CasesPage } from './pages/cases/CasesPage';
import { NewsPage } from './pages/about/NewsPage';
import { CompanyIntroPage } from './pages/about/CompanyIntroPage';
import { SupportPage } from './pages/support/SupportPage';
import { InquiryPage } from './pages/support/InquiryPage';
import { RecruitmentPage } from './pages/recruitment/RecruitmentPage';
import { CampusRecruitmentPage } from './pages/recruitment/CampusRecruitmentPage';
import { JobDetailsPage } from './pages/recruitment/JobDetailsPage';
import { CampusResumePage } from './pages/recruitment/CampusResumePage';
import { CampusSubmitSuccessPage } from './pages/recruitment/CampusSubmitSuccessPage';
import { CampusApplicationRecordsPage } from './pages/recruitment/CampusApplicationRecordsPage';
import { MassClawPage } from './pages/massclaw/MassClawPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { ToastProvider } from './components/Toast';

const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/+$/, '');

export default function App() {
  return (
    <ToastProvider>
      <Router basename={ROUTER_BASENAME}>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products/ms8100" element={<MS8100Details />} />
          <Route path="products/ms8000" element={<MS8000Details />} />
          <Route path="products/ftms" element={<FTMSDetails />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="about" element={<CompanyIntroPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="inquiry" element={<InquiryPage />} />
          <Route path="recruitment" element={<RecruitmentPage />} />
          <Route path="massclaw" element={<MassClawPage />} />
        </Route>
        
        {/* Campus Recruitment routes with separate layout */}
        <Route path="/" element={<CampusLayout />}>
          <Route path="campus-recruitment" element={<CampusRecruitmentPage />} />
          <Route path="campus-recruitment/job/:id" element={<JobDetailsPage />} />
          <Route path="campus-recruitment/resume" element={<CampusResumePage />} />
          <Route path="campus-recruitment/submit-success" element={<CampusSubmitSuccessPage />} />
          <Route path="campus-recruitment/records" element={<CampusApplicationRecordsPage />} />
        </Route>
        
        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </ToastProvider>
  );
}
