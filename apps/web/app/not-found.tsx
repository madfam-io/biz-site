import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center p-8 max-w-lg">
            {/* 404 Graphic */}
            <div className="mb-8">
              <div className="text-9xl font-bold text-gray-300">404</div>
              <div className="text-2xl font-semibold text-gray-700 mt-2">Page Not Found</div>
            </div>

            <p className="text-gray-600 mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Return Home
            </Link>

            {/* Decorative elements */}
            <div className="mt-12 flex justify-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
