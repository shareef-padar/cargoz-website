'use client';

import { useState } from 'react';
import { MagneticButton } from './MagneticButton';

const TABS = [
  { value: 'blocks', label: 'Blocks', tooltip: 'Dedicated block storage areas' },
  { value: 'cages', label: 'Cages', tooltip: 'Secure cage-style storage units' },
];

const DURATIONS = [
  { value: '1', label: '1 month' },
  { value: '3', label: '3 months' },
  { value: '6', label: '6 months' },
  { value: '12', label: '12 months' },
  { value: '24', label: '24+ months' },
];

export function QuoteBuilder() {
  const [activeTab, setActiveTab] = useState('blocks');

  return (
    <div className="tw-glass tw-rounded-[2rem] tw-overflow-hidden">
      {/* Tabs */}
      <div className="tw-bg-gray-100/80 tw-p-1.5 tw-flex tw-gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={[
              'tw-relative tw-flex tw-items-center tw-gap-1.5 tw-flex-1 tw-justify-center tw-rounded-[1.25rem] tw-px-3 tw-py-2.5 tw-text-sm tw-font-semibold tw-transition-all tw-duration-200',
              activeTab === tab.value
                ? 'tw-bg-white tw-text-gray-900 tw-shadow-sm'
                : 'tw-text-gray-500 hover:tw-text-gray-700',
            ].join(' ')}
            title={tab.tooltip}
          >
            {tab.label}
            <span className="tw-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-200/80 tw-text-[10px] tw-font-bold tw-text-gray-500">
              i
            </span>
          </button>
        ))}
      </div>

      {/* Fields row */}
      <div className="tw-p-4 md:tw-p-5">
        <form
          action="/quote"
          method="get"
          className="tw-flex tw-flex-col md:tw-flex-row tw-gap-3"
        >
          <input type="hidden" name="storage_type" value={activeTab} />

          {/* Location */}
          <div className="tw-flex tw-flex-col tw-gap-1 tw-flex-1">
            <label className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-gray-400">
              Location
            </label>
            <select
              name="location"
              defaultValue=""
              className="tw-w-full tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm tw-text-gray-900 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2"
            >
              <option value="" disabled>Select city</option>
              <option>Riyadh</option>
              <option>Jeddah</option>
              <option>Dammam</option>
              <option>Khobar</option>
              <option>Makkah</option>
              <option>Madinah</option>
            </select>
          </div>

          {/* Size */}
          <div className="tw-flex tw-flex-col tw-gap-1 tw-flex-1">
            <label className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-gray-400">
              Size
            </label>
            <input
              name="space"
              type="text"
              placeholder="e.g. 500 sqm"
              className="tw-w-full tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm tw-text-gray-900 placeholder:tw-text-gray-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2"
            />
          </div>

          {/* Start date */}
          <div className="tw-flex tw-flex-col tw-gap-1 tw-flex-1">
            <label className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-gray-400">
              Start
            </label>
            <input
              name="start"
              type="date"
              className="tw-w-full tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm tw-text-gray-900 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2"
            />
          </div>

          {/* Duration */}
          <div className="tw-flex tw-flex-col tw-gap-1 tw-flex-1">
            <label className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-gray-400">
              Duration
            </label>
            <select
              name="duration"
              className="tw-w-full tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm tw-text-gray-900 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2"
            >
              {DURATIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <span className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-transparent tw-select-none">
              &nbsp;
            </span>
            <MagneticButton>
              <button
                type="submit"
                className="tw-inline-flex tw-h-full tw-min-h-[50px] tw-items-center tw-justify-center tw-rounded-2xl tw-bg-purple-500 tw-px-7 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-purple-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2 tw-whitespace-nowrap"
              >
                Search
              </button>
            </MagneticButton>
          </div>
        </form>
      </div>
    </div>
  );
}
