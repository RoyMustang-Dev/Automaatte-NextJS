
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { AuthCallbackPage } from './pages/auth/AuthCallbackPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { CoreServicesPage } from './pages/services/CoreServicesPage';
import { SpecialServicesPage } from './pages/services/SpecialServicesPage';
import { FreeServicesPage } from './pages/services/FreeServicesPage';
import { PaidServicesPage } from './pages/services/PaidServicesPage';
import { EnterpriseServicesPage } from './pages/services/EnterpriseServicesPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { BlogAdminPage } from './pages/admin/BlogAdminPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { SupportPage } from './pages/SupportPage';
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/legal/TermsOfServicePage';
import { Footer } from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/auth/signin" element={
          <ProtectedRoute requireAuth={false}>
            <SignInPage />
          </ProtectedRoute>
        } />
        <Route path="/auth/signup" element={
          <ProtectedRoute requireAuth={false}>
            <SignUpPage />
          </ProtectedRoute>
        } />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/auth/reset-password" element={
          <ProtectedRoute requireAuth={false}>
            <ResetPasswordPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/services/core" element={<CoreServicesPage />} />
        <Route path="/services/special" element={<SpecialServicesPage />} />
        <Route path="/services/free" element={<FreeServicesPage />} />
        <Route path="/services/paid" element={<PaidServicesPage />} />
        <Route path="/services/enterprise" element={<EnterpriseServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/admin/blog" element={<BlogAdminPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />

        {/* Admin Dashboard - Protected like regular user routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <BlogAdminPage />
          </ProtectedRoute>
        } />

        {/* Additional routes will be added here */}
      </Routes>

      <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;