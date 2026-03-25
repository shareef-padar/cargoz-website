const logos = [
  { src: '/logo-coca-cola.png', alt: 'Coca-Cola' },
  { src: '/logo-noon.png', alt: 'noon' },
  { src: '/logo-geepas.png', alt: 'Geepas' },
  { src: '/logo-sera.png', alt: 'Saudi Electricity Regulatory Authority' },
  { src: '/logo-starlinks.png', alt: 'Starlinks' },
  { src: '/logo-hilton.png', alt: 'Hilton' },
  { src: '/logo-halil.png', alt: 'هليل' },
];

const row = [...logos, ...logos];

export function LogoSlider() {
  return (
    <div className="tw-w-full tw-overflow-hidden tw-relative">
      <div className="tw-flex tw-gap-10 md:tw-gap-16 tw-items-center tw-animate-marquee tw-px-4 md:tw-px-8">
        {row.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="tw-flex-none tw-opacity-50 hover:tw-opacity-90 tw-transition tw-duration-300"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="tw-h-7 md:tw-h-8 tw-w-auto tw-object-contain tw-grayscale"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
