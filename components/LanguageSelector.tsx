'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/translations';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'vi' || value === 'en') {
      setLanguage(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('selectLanguage')}:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
      >
        <option value="vi">🇻🇳 Tiếng Việt</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </div>
  );
}
