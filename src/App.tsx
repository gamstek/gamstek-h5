import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { CampusLayout } from './components/CampusLayout';

const HomePage = lazy(() => import('./pages/HomePage').then(({ HomePage }) => ({ default: HomePage })));
const MS8100Details = lazy(() => import('./pages/products/MS8100Details').then(({ MS8100Details }) => ({ default: MS8100Details })));
const MS8000Details = lazy(() => import('./pages/products/MS8000Details').then(({ MS8000Details }) => ({ default: MS8000Details })));
const FTMSDetails = lazy(() => import('./pages/products/FTMSDetails').then(({ FTMSDetails }) => ({ default: FTMSDetails })));
const CasesPage = lazy(() => import('./pages/cases/CasesPage').then(({ CasesPage }) => ({ default: CasesPage })));
const NewsPage = lazy(() => import('./pages/about/NewsPage').then(({ NewsPage }) => ({ default: NewsPage })));
const CompanyIntroPage = lazy(() => import('./pages/about/CompanyIntroPage').then(({ CompanyIntroPage }) => ({ default: CompanyIntroPage })));
const SupportPage = lazy(() => import('./pages/support/SupportPage').then(({ SupportPage }) => ({ default: SupportPage })));
const InquiryPage = lazy(() => import('./pages/support/InquiryPage').then(({ InquiryPage }) => ({ default: InquiryPage })));
const RecruitmentPage = lazy(() => import('./pages/recruitment/RecruitmentPage').then(({ RecruitmentPage }) => ({ default: RecruitmentPage })));
const CampusRecruitmentPage = lazy(() => import('./pages/recruitment/CampusRecruitmentPage').then(({ CampusRecruitmentPage }) => ({ default: CampusRecruitmentPage })));
const JobDetailsPage = lazy(() => import('./pages/recruitment/JobDetailsPage').then(({ JobDetailsPage }) => ({ default: JobDetailsPage })));
const CampusResumePage = lazy(() => import('./pages/recruitment/CampusResumePage').then(({ CampusResumePage }) => ({ default: CampusResumePage })));
const CampusSubmitSuccessPage = lazy(() => import('./pages/recruitment/CampusSubmitSuccessPage').then(({ CampusSubmitSuccessPage }) => ({ default: CampusSubmitSuccessPage })));
const CampusApplicationRecordsPage = lazy(() => import('./pages/recruitment/CampusApplicationRecordsPage').then(({ CampusApplicationRecordsPage }) => ({ default: CampusApplicationRecordsPage })));
const MassClawPage = lazy(() => import('./pages/massclaw/MassClawPage').then(({ MassClawPage }) => ({ default: MassClawPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(({ NotFoundPage }) => ({ default: NotFoundPage })));

import { ToastProvider } from './components/Toast';

const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/+$/, '');

export default function App() {
  return (
    <ToastProvider>
      <Router basename={ROUTER_BASENAME}>
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products/ms8100" element={<MS8100Details />} />
          <Route path="products/ms7000" element={<MS8100Details productName="MS7000" />} />
          <Route path="products/ms6000" element={<MS8100Details productName="MS6000" />} />
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
        </Suspense>
    </Router>
  </ToastProvider>
  );
}
