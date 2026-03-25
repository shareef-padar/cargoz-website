import Link from 'next/link';

export function QuoteBuilder() {
  return (
    <div className="tw-glass tw-rounded-[2rem] tw-p-4 md:tw-p-6">
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-mb-4">
        <div className="tw-flex tw-flex-col">
          <span className="tw-text-sm md:tw-text-base tw-font-semibold tw-text-gray-900">
            Build your quote in under 60 seconds
          </span>
          <span className="tw-text-xs md:tw-text-sm tw-text-gray-500">
            Tell us the basics — we’ll match you with verified options.
          </span>
        </div>
        <Link
          href="/quote"
          className="tw-hidden md:tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-no-underline hover:tw-border-gray-300 hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200 focus:tw-ring-offset-2"
        >
          Full form
        </Link>
      </div>

      <form action="/quote" method="get" className="tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-3 md:tw-gap-4">
        <div className="md:tw-col-span-5">
          <label htmlFor="hero_location" className="tw-block tw-text-xs tw-font-semibold tw-text-gray-700 tw-mb-1">
            City
          </label>
          <input
            id="hero_location"
            name="location"
            placeholder="Riyadh, Jeddah, Dammam…"
            className="tw-w-full tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm md:tw-text-base tw-text-gray-900 placeholder:tw-text-gray-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200 focus:tw-ring-offset-2"
          />
        </div>
        <div className="md:tw-col-span-4">
          <label htmlFor="hero_space" className="tw-block tw-text-xs tw-font-semibold tw-text-gray-700 tw-mb-1">
            Space needed
          </label>
          <select
            id="hero_space"
            name="space"
            className="tw-w-full tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm md:tw-text-base tw-text-gray-900 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200 focus:tw-ring-offset-2"
          >
            <option value="">Select sqm range</option>
            <option value="0-200">0–200 sqm</option>
            <option value="200-500">200–500 sqm</option>
            <option value="500-1000">500–1,000 sqm</option>
            <option value="1000-3000">1,000–3,000 sqm</option>
            <option value="3000+">3,000+ sqm</option>
          </select>
        </div>
        <div className="md:tw-col-span-3">
          <label htmlFor="hero_temp" className="tw-block tw-text-xs tw-font-semibold tw-text-gray-700 tw-mb-1">
            Storage type
          </label>
          <select
            id="hero_temp"
            name="storage_type"
            className="tw-w-full tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm md:tw-text-base tw-text-gray-900 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200 focus:tw-ring-offset-2"
          >
            <option value="">Any</option>
            <option value="ambient">Ambient</option>
            <option value="temperature-controlled">Temperature controlled</option>
            <option value="cold-storage">Cold storage</option>
            <option value="bonded">Bonded</option>
          </select>
        </div>

        <div className="md:tw-col-span-9 tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
          <span className="tw-text-xs tw-font-semibold tw-text-gray-700">Popular:</span>
          <button
            type="button"
            className="tw-rounded-full tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-1.5 tw-text-xs tw-font-medium tw-text-gray-700 hover:tw-border-gray-300 hover:tw-bg-gray-50"
            onClick={() => {
              const el = document.getElementById('hero_location') as HTMLInputElement | null;
              if (el) el.value = 'Riyadh';
            }}
          >
            Riyadh
          </button>
          <button
            type="button"
            className="tw-rounded-full tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-1.5 tw-text-xs tw-font-medium tw-text-gray-700 hover:tw-border-gray-300 hover:tw-bg-gray-50"
            onClick={() => {
              const el = document.getElementById('hero_location') as HTMLInputElement | null;
              if (el) el.value = 'Jeddah';
            }}
          >
            Jeddah
          </button>
          <button
            type="button"
            className="tw-rounded-full tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-1.5 tw-text-xs tw-font-medium tw-text-gray-700 hover:tw-border-gray-300 hover:tw-bg-gray-50"
            onClick={() => {
              const el = document.getElementById('hero_temp') as HTMLSelectElement | null;
              if (el) el.value = 'temperature-controlled';
            }}
          >
            Temp controlled
          </button>
          <button
            type="button"
            className="tw-rounded-full tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-1.5 tw-text-xs tw-font-medium tw-text-gray-700 hover:tw-border-gray-300 hover:tw-bg-gray-50"
            onClick={() => {
              const el = document.getElementById('hero_temp') as HTMLSelectElement | null;
              if (el) el.value = 'cold-storage';
            }}
          >
            Cold storage
          </button>
        </div>

        <div className="md:tw-col-span-3 tw-flex md:tw-justify-end">
          <button
            type="submit"
            className="tw-w-full tw-inline-flex tw-h-[52px] tw-items-center tw-justify-center tw-rounded-2xl tw-border-2 tw-border-primary-600 tw-bg-primary-600 tw-px-4 tw-py-2 tw-text-base tw-font-medium tw-text-white tw-no-underline hover:tw-bg-primary-700 hover:tw-border-primary-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200 focus:tw-ring-offset-2"
          >
            Get matches
          </button>
        </div>
      </form>

      <div className="tw-mt-4 tw-flex tw-flex-col md:tw-flex-row tw-items-start md:tw-items-center tw-justify-between tw-gap-2">
        <div className="tw-text-xs md:tw-text-sm tw-text-gray-500">
          <span className="tw-font-semibold tw-text-gray-700">No commitment.</span> Compare verified warehouses and flexible plans.
        </div>
        <div className="tw-flex tw-items-center tw-gap-2">
          <a className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-no-underline hover:tw-border-gray-300 hover:tw-bg-gray-50" href="#how-it-works">How it works</a>
          <Link className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-transparent tw-bg-transparent tw-px-2 tw-py-2 tw-text-sm tw-font-medium tw-text-primary-600 tw-no-underline hover:tw-text-primary-700" href="/become-partner">List your warehouse</Link>
        </div>
      </div>
    </div>
  );
}
