"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="relative overflow-hidden transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium">
          {language === 'id' ? '🇮🇩 ID' : '🇺🇸 EN'}
        </span>
      </div>
    </Button>
  );
}