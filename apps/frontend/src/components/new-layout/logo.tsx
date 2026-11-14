'use client';

import React from 'react';
import i18next from 'i18next';
import { BrandMark } from '@gitroom/frontend/components/ui/brand.mark';
import { brandName } from '@gitroom/helpers/brand/brand.config';

export const Logo = () => {
  return (
    <span title={brandName(i18next.resolvedLanguage)} className="inline-flex">
      <BrandMark size={40} />
    </span>
  );
};
