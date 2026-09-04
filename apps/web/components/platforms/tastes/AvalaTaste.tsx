const FEATURES = [
  {
    title: 'EC/CONOCER Alignment',
    content: (
      <div className="mt-3 space-y-1.5 text-xs">
        {[
          'Competency mapping complete',
          'Evaluation criteria defined',
          'Certification path ready',
        ].map(item => (
          <div key={item} className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <svg
              className="w-3.5 h-3.5 text-green-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'DC-3 Certificates',
    content: (
      <div className="mt-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 p-3 text-center">
        <svg
          className="w-8 h-8 mx-auto text-gray-300 dark:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="mt-1.5 text-[10px] text-gray-400 dark:text-gray-500">DC-3 Template Preview</p>
      </div>
    ),
  },
  {
    title: 'Open Badges 3.0',
    content: (
      <div className="mt-3 flex justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-gray-300 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        </div>
      </div>
    ),
  },
];

export function AvalaTaste() {
  return (
    <div
      role="img"
      aria-label="Avala competency-based training platform preview with feature highlights and a link to avala.studio"
    >
      {/* Heading with live badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3">
          <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-500">Avala</h3>
          <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700">
            Live
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          Competency-based training aligned with Mexican standards
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {FEATURES.map(feature => (
          <div
            key={feature.title}
            className="rounded-xl border border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-800/50 p-4 opacity-80"
          >
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {feature.title}
            </h4>
            {feature.content}
          </div>
        ))}
      </div>

      {/* Product front door (visual only) */}
      <div className="max-w-md mx-auto">
        <div className="px-5 py-2.5 rounded-lg bg-gray-300 dark:bg-gray-600 text-sm font-medium text-white dark:text-gray-300 text-center cursor-default">
          Open Avala
        </div>
        <p className="mt-2 text-[10px] text-gray-400 text-center">Live at avala.studio</p>
      </div>
    </div>
  );
}
