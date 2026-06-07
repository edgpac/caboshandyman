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
const KitchenServicesCabo = lazy(() => import("./pages/KitchenServicesCabo"));
const BathroomServicesCabo = lazy(() => import("./pages/BathroomServicesCabo"));
const ElectricalServicesCabo = lazy(() => import("./pages/ElectricalServicesCabo"));
const PropertyCarePlans = lazy(() => import("./pages/PropertyCarePlans"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const ToiletInstallationCabo = lazy(() => import("./pages/ToiletInstallationCabo"));
const WaterHeaterCabo = lazy(() => import("./pages/WaterHeaterCabo"));
const FaucetInstallationCabo = lazy(() => import("./pages/FaucetInstallationCabo"));
const TileInstallationCabo = lazy(() => import("./pages/TileInstallationCabo"));
const CabinetInstallationCabo = lazy(() => import("./pages/CabinetInstallationCabo"));
const OutletInstallationCabo = lazy(() => import("./pages/OutletInstallationCabo"));
const ShowerInstallationCabo = lazy(() => import("./pages/ShowerInstallationCabo"));
const GarbageDisposalCabo = lazy(() => import("./pages/GarbageDisposalCabo"));
const CeilingLightInstallationCabo = lazy(() => import("./pages/CeilingLightInstallationCabo"));
const SinkInstallationCabo = lazy(() => import("./pages/SinkInstallationCabo"));
const CountertopInstallationCabo = lazy(() => import("./pages/CountertopInstallationCabo"));
const BacksplashInstallationCabo = lazy(() => import("./pages/BacksplashInstallationCabo"));
const KitchenHardwareCabo = lazy(() => import("./pages/KitchenHardwareCabo"));
const PantryShelvingCabo = lazy(() => import("./pages/PantryShelvingCabo"));
const BathroomLightingCabo = lazy(() => import("./pages/BathroomLightingCabo"));
const ShowerHeadReplacementCabo = lazy(() => import("./pages/ShowerHeadReplacementCabo"));
const ToiletLeakRepairCabo = lazy(() => import("./pages/ToiletLeakRepairCabo"));
const TowelRackInstallationCabo = lazy(() => import("./pages/TowelRackInstallationCabo"));
const MirrorInstallationCabo = lazy(() => import("./pages/MirrorInstallationCabo"));
const BathroomShelvingCabo = lazy(() => import("./pages/BathroomShelvingCabo"));
const OfficeLightingCabo = lazy(() => import("./pages/OfficeLightingCabo"));
const GeneratorHookupCabo = lazy(() => import("./pages/GeneratorHookupCabo"));
const LandscapeMaintenanceCabo = lazy(() => import("./pages/LandscapeMaintenanceCabo"));
const CommonAreaLightingCabo = lazy(() => import("./pages/CommonAreaLightingCabo"));
const DoorLockReplacementCabo = lazy(() => import("./pages/DoorLockReplacementCabo"));
const WindowRepairCabo = lazy(() => import("./pages/WindowRepairCabo"));
const PaintingCabo = lazy(() => import("./pages/PaintingCabo"));
const FlooringCabo = lazy(() => import("./pages/FlooringCabo"));
const WaterLeakDetectorCabo = lazy(() => import("./pages/WaterLeakDetectorCabo"));
const CommercialSinkCabo = lazy(() => import("./pages/CommercialSinkCabo"));
const BoothInstallationCabo = lazy(() => import("./pages/BoothInstallationCabo"));
const BarInstallationCabo = lazy(() => import("./pages/BarInstallationCabo"));
const DecorativeLightingCabo = lazy(() => import("./pages/DecorativeLightingCabo"));
const BathroomSinkInstallationCabo = lazy(() => import("./pages/BathroomSinkInstallationCabo"));
const Blog = lazy(() => import("./pages/Blog"));
const TopHandymanServicesLosCabos = lazy(() => import("./pages/TopHandymanServicesLosCabos"));

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
              <Route path="/kitchen-services-cabo" element={<KitchenServicesCabo />} />
              <Route path="/bathroom-services-cabo" element={<BathroomServicesCabo />} />
              <Route path="/electrical-services-cabo" element={<ElectricalServicesCabo />} />
              <Route path="/property-care-plans" element={<PropertyCarePlans />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/toilet-installation-cabo-san-lucas" element={<ToiletInstallationCabo />} />
              <Route path="/water-heater-cabo-san-lucas" element={<WaterHeaterCabo />} />
              <Route path="/faucet-installation-cabo-san-lucas" element={<FaucetInstallationCabo />} />
              <Route path="/tile-installation-cabo-san-lucas" element={<TileInstallationCabo />} />
              <Route path="/cabinet-installation-cabo-san-lucas" element={<CabinetInstallationCabo />} />
              <Route path="/outlet-installation-cabo-san-lucas" element={<OutletInstallationCabo />} />
              <Route path="/shower-installation-cabo-san-lucas" element={<ShowerInstallationCabo />} />
              <Route path="/garbage-disposal-cabo-san-lucas" element={<GarbageDisposalCabo />} />
              <Route path="/ceiling-light-installation-cabo-san-lucas" element={<CeilingLightInstallationCabo />} />
              <Route path="/sink-installation-cabo-san-lucas" element={<SinkInstallationCabo />} />
              <Route path="/countertop-installation-cabo-san-lucas" element={<CountertopInstallationCabo />} />
              <Route path="/backsplash-installation-cabo-san-lucas" element={<BacksplashInstallationCabo />} />
              <Route path="/kitchen-hardware-installation-cabo-san-lucas" element={<KitchenHardwareCabo />} />
              <Route path="/pantry-shelving-cabo-san-lucas" element={<PantryShelvingCabo />} />
              <Route path="/bathroom-lighting-cabo-san-lucas" element={<BathroomLightingCabo />} />
              <Route path="/shower-head-replacement-cabo-san-lucas" element={<ShowerHeadReplacementCabo />} />
              <Route path="/toilet-leak-repair-cabo-san-lucas" element={<ToiletLeakRepairCabo />} />
              <Route path="/towel-rack-installation-cabo-san-lucas" element={<TowelRackInstallationCabo />} />
              <Route path="/mirror-installation-cabo-san-lucas" element={<MirrorInstallationCabo />} />
              <Route path="/bathroom-shelving-cabo-san-lucas" element={<BathroomShelvingCabo />} />
              <Route path="/office-lighting-cabo-san-lucas" element={<OfficeLightingCabo />} />
              <Route path="/generator-hookup-cabo-san-lucas" element={<GeneratorHookupCabo />} />
              <Route path="/landscape-maintenance-cabo-san-lucas" element={<LandscapeMaintenanceCabo />} />
              <Route path="/common-area-lighting-cabo-san-lucas" element={<CommonAreaLightingCabo />} />
              <Route path="/door-lock-replacement-cabo-san-lucas" element={<DoorLockReplacementCabo />} />
              <Route path="/window-repair-cabo-san-lucas" element={<WindowRepairCabo />} />
              <Route path="/painting-cabo-san-lucas" element={<PaintingCabo />} />
              <Route path="/flooring-cabo-san-lucas" element={<FlooringCabo />} />
              <Route path="/water-leak-detector-cabo-san-lucas" element={<WaterLeakDetectorCabo />} />
              <Route path="/commercial-sink-installation-cabo-san-lucas" element={<CommercialSinkCabo />} />
              <Route path="/booth-installation-cabo-san-lucas" element={<BoothInstallationCabo />} />
              <Route path="/bar-installation-cabo-san-lucas" element={<BarInstallationCabo />} />
              <Route path="/decorative-lighting-cabo-san-lucas" element={<DecorativeLightingCabo />} />
              <Route path="/bathroom-sink-installation-cabo-san-lucas" element={<BathroomSinkInstallationCabo />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/top-handyman-services-in-los-cabos-plumbing-electrical-repairs-more" element={<TopHandymanServicesLosCabos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;