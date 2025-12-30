import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const PropertySetupCabo = lazy(() => import("./pages/PropertySetupCabo"));
const VacationRentalSetupCabo = lazy(() => import("./pages/VacationRentalSetupCabo"));
const FurnitureAssemblyCabo = lazy(() => import("./pages/FurnitureAssemblyCabo"));
const TVMountingCabo = lazy(() => import("./pages/TVMountingCabo"));
const HandymanCaboSanLucas = lazy(() => import("./pages/HandymanCaboSanLucas"));
const PlumberCaboSanLucas = lazy(() => import("./pages/PlumberCaboSanLucas"));
const ToiletTubUncloggingCabo = lazy(() => import("./pages/ToiletTubUncloggingCabo"));
const CeilingFanInstallationCabo = lazy(() => import("./pages/CeilingFanInstallationCabo"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-primary text-lg">Loading...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/property-setup-cabo" element={<PropertySetupCabo />} />
              <Route path="/vacation-rental-setup-cabo" element={<VacationRentalSetupCabo />} />
              <Route path="/furniture-assembly-cabo" element={<FurnitureAssemblyCabo />} />
              <Route path="/tv-mounting-cabo" element={<TVMountingCabo />} />
              <Route path="/handyman-cabo-san-lucas" element={<HandymanCaboSanLucas />} />
              <Route path="/plumber-cabo-san-lucas" element={<PlumberCaboSanLucas />} />
              <Route path="/toilet-tub-unclogging-cabo" element={<ToiletTubUncloggingCabo />} />
              <Route path="/ceiling-fan-installation-cabo" element={<CeilingFanInstallationCabo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;