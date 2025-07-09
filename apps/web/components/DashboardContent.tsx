'use client';

import { useTranslations } from 'next-intl';

interface DashboardContentProps {
  userEmail: string;
  userRole: string;
}

export function DashboardContent({ userEmail, userRole }: DashboardContentProps) {
  const t = useTranslations('dashboard');
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <div className="mt-4">
            <p className="text-gray-600">{t('welcome')} {userEmail}!</p>
            <p className="text-sm text-gray-500">{t('role')}: {userRole}</p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {t('metrics.totalLeads')}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  -
                </dd>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {t('metrics.newThisWeek')}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  -
                </dd>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {t('metrics.conversionRate')}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  -%
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}