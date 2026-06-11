import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/stats/StatsSection";
import CagarBudayaSection from "@/components/heritage/CagarBudayaSection";
import WbtbShowcaseSection from "@/components/wbtb/WbtbShowcaseSection";
import OpkShowcase from "@/components/opk/OpkShowcase";
import CulturalOutro from "@/components/layout/CulturalOutro";
import MapSection from "@/components/map/MapSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />

      {/* Map section */}
      <section id="peta" className="relative py-20 md:py-28 bg-[#FAF5EE]">
        <div className="pattern-overlay absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-display font-bold text-[#1C0F08] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Peta Sebaran Budaya
            </h2>
            <p className="text-base text-[#6B4F3A] max-w-xl mx-auto">
              Lihat persebaran Cagar Budaya, ODCB, WBTB, dan objek budaya lain
              berdasarkan data geocoding dan centroid kecamatan. Beberapa titik
              masih dalam proses validasi koordinat.
            </p>
          </div>
          <MapSection />
        </div>
      </section>

      <CagarBudayaSection />
      <WbtbShowcaseSection />
      <OpkShowcase />
      <CulturalOutro />
    </>
  );
}
