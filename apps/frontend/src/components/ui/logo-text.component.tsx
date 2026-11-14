'use client';

import React from 'react';
import i18next from 'i18next';
import { brand, brandName } from '@gitroom/helpers/brand/brand.config';

/**
 * The full official logo (calendar, wordmark and paper plane).
 * Light lettering on the dark theme, navy lettering on the light theme.
 */
export const LogoTextComponent = () => {
  const name = brandName(i18next.resolvedLanguage);
  return (
    <span className="ltr inline-flex select-none" dir="ltr">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={brand.assets.logoWithText}
        alt={name}
        width={180}
        height={68}
        draggable={false}
        className="block [.light_&]:hidden h-[68px] w-auto"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={brand.assets.logoWithTextDark}
        alt={name}
        width={180}
        height={68}
        draggable={false}
        className="hidden [.light_&]:block h-[68px] w-auto"
      />
    </span>
  );
};
