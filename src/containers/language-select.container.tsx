import { SelectChangeEvent } from '@mui/material';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

import { LanguageNativeSelect, LanguageSelect } from '@components/common';
import { useGetLanguagesQuery } from '@services/language';

export const LanguageSelectContainer = () => {
  const { i18n } = useTranslation();

  const { data: languages } = useGetLanguagesQuery();
  const language = i18n.language;

  const [cookie, setCookie] = useCookies(['APP_LOCALE']);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>,
  ) => {
    const code = event.target.value;
    const lang = languages?.find((el) => el.code === code);

    if (lang) i18n.changeLanguage(lang.code);
  };

  // Change NEXT_COOKIE when language was changed
  useEffect(() => {
    if (language && language !== cookie.APP_LOCALE)
      setCookie('APP_LOCALE', language, { path: '/', maxAge: 31536000 });
  }, [cookie, setCookie, language]);

  const touchscreen =
    typeof navigator !== 'undefined' &&
    'maxTouchPoints' in navigator &&
    navigator.maxTouchPoints > 0;

  return languages?.length ? (
    touchscreen ? (
      <LanguageNativeSelect
        languages={languages}
        onChange={handleChange}
        value={language}
      />
    ) : (
      <LanguageSelect
        languages={languages}
        onChange={handleChange}
        value={language}
      />
    )
  ) : (
    <></>
  );
};
