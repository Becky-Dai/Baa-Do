/**
 * 中文：BaaDo Web Preview Landing Page，产品入口页面。
 * English: BaaDo Web Preview Landing Page - the product entry page.
 */

import HeroSection from '../components/landing/HeroSection';
import FeatureList from '../components/landing/FeatureList';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <HeroSection />
      <FeatureList />
    </main>
  );
}
