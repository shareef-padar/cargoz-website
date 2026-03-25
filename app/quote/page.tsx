import { Header } from '@/components/Header';
import { QuotePageContent } from '@/components/QuotePageContent';

export default function QuotePage() {
  return (
    <div className="tw-relative tw-min-h-screen tw-min-w-0 tw-bg-white tw-overflow-x-hidden">
      <Header />
      <main className="tw-relative tw-z-20 tw-min-w-0 tw-pt-24 md:tw-pt-28 tw-px-4 tw-pb-10">
        <QuotePageContent />
      </main>
    </div>
  );
}

