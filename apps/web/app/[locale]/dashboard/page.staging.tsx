export default function DashboardPage() {
  // Staging version without authentication
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              <strong>Staging Environment:</strong> Authentication is disabled. In production, this page requires login.
            </p>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Demo</h1>
          <div className="mt-4">
            <p className="text-gray-600">Welcome to the dashboard preview!</p>
            <p className="text-sm text-gray-500">Role: Demo User</p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Leads
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  42
                </dd>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  New This Week
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  7
                </dd>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Conversion Rate
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  16.7%
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}