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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;