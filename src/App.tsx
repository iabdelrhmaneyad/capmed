import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CMSProvider } from "@/contexts/CMSContext";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import DoctorsPage from "./pages/DoctorsPage";
import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import MedicalTourismPage from "./pages/MedicalTourismPage";
import NewsPage from "./pages/NewsPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import ResearchPage from "./pages/ResearchPage";
import InsurancePage from "./pages/InsurancePage";
import InvestmentPage from "./pages/InvestmentPage";
import DevelopmentPhasesPage from "./pages/DevelopmentPhasesPage";
import LocationPage from "./pages/LocationPage";
import FAQPage from "./pages/FAQPage";
import CampusMapPage from "./pages/CampusMapPage";
import NotFound from "./pages/NotFound";
import Chatbot from "@/components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CMSProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/medical-tourism" element={<MedicalTourismPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/partnerships" element={<PartnershipsPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/insurance" element={<InsurancePage />} />
              <Route path="/investment" element={<InvestmentPage />} />
              <Route path="/development-phases" element={<DevelopmentPhasesPage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/campus-map" element={<CampusMapPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </HashRouter>
        </TooltipProvider>
      </CMSProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
