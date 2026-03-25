import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowItWorksVideo } from '@/components/HowItWorksVideo';
import { WhyCargoz } from '@/components/WhyCargoz';
import { StorageSolutions } from '@/components/StorageSolutions';
import { WarehousingOptions } from '@/components/WarehousingOptions';
import { FourSteps } from '@/components/FourSteps';
import { GoogleReviews } from '@/components/GoogleReviews';
import { Faq } from '@/components/Faq';
import { BottomCta } from '@/components/BottomCta';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="tw-relative tw-min-w-0 tw-bg-white tw-overflow-x-hidden">
      <Header />

      <main className="tw-relative tw-z-20 tw-min-w-0 tw-pt-24 md:tw-pt-28">
        <Hero />
        <HowItWorksVideo />
        <WhyCargoz />
        <StorageSolutions />
        <WarehousingOptions />
        <FourSteps />
        <GoogleReviews />
        <Faq />
        <BottomCta />
      </main>

      <Footer />
    </div>
  );
}
