'use client';

import { useModals } from '@gitroom/frontend/components/layout/new-modal';
import {
  cookieName,
  defaultLng,
  languages,
} from '@gitroom/react/translation/i18n.config';
import { brand } from '@gitroom/helpers/brand/brand.config';
import i18next from 'i18next';
import useCookie from 'react-use-cookie';
import React, { useCallback } from 'react';

import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { ModalWrapperComponent } from '../new-launch/modal.wrapper.component';

import clsx from 'clsx';

export const ChangeLanguageComponent = () => {
  const currentLanguage = i18next.resolvedLanguage || defaultLng;
  const [_, setCookie] = useCookie(cookieName, currentLanguage);
  const modals = useModals();
  const t = useT();

  const primary = brand.primaryLanguages as readonly string[];
  const others = languages.filter((l) => !primary.includes(l));

  const handleLanguageChange = (language: string) => {
    setCookie(language, { days: 365, path: '/', SameSite: 'Lax' });
    modals.closeCurrent();
    // Reload so server-rendered text, page titles and direction all switch
    // together (Arabic is right-to-left, English left-to-right).
    i18next.changeLanguage(language).finally(() => {
      window.location.reload();
    });
  };

  // Language name written in its own script, e.g. "العربية", "English"
  const getLanguageName = useCallback((code: string) => {
    try {
      const displayNames = new Intl.DisplayNames([code], {
        type: 'language',
      });
      return displayNames.of(code);
    } catch (error) {
      return code;
    }
  }, []);

  const item = (language: string, large: boolean) => (
    <button
      type="button"
      key={language}
      lang={language}
      dir="auto"
      aria-pressed={language === currentLanguage}
      onClick={() => handleLanguageChange(language)}
      className={clsx(
        'flex items-center justify-center rounded-[10px] border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-btnPrimary',
        large ? 'h-[64px] text-[18px] font-[600]' : 'h-[44px] text-[14px]',
        language === currentLanguage
          ? 'border-btnPrimary bg-btnPrimary text-white'
          : 'border-newTableBorder bg-newTableHeader hover:bg-newTableBorder text-textColor'
      )}
    >
      {getLanguageName(language)}
    </button>
  );

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-2 gap-[12px]">
        {primary.map((l) => item(l, true))}
      </div>
      <div className="text-[13px] text-textItemBlur">
        {t('other_languages', 'Other languages')}
      </div>
      <div className="grid grid-cols-3 mobile:grid-cols-2 gap-[8px]">
        {others.map((l) => item(l, false))}
      </div>
    </div>
  );
};

export const LanguageComponent = () => {
  const modal = useModals();
  const currentLanguage = i18next.resolvedLanguage || defaultLng;
  const t = useT();
  const openModal = () => {
    modal.openModal({
      title: t('change_language', 'Change Language'),
      withCloseButton: true,
      children: <ChangeLanguageComponent />,
    });
  };
  return (
    <button
      type="button"
      onClick={openModal}
      aria-label={t('change_language', 'Change Language')}
      title={t('change_language', 'Change Language')}
      className="h-[32px] px-[10px] rounded-[8px] flex items-center gap-[6px] text-[13px] font-[600] text-textItemBlur hover:text-newTextColor hover:bg-boxFocused outline-none focus-visible:ring-2 focus-visible:ring-btnPrimary"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span>{currentLanguage.startsWith('ar') ? 'ع' : currentLanguage.toUpperCase()}</span>
    </button>
  );
};
