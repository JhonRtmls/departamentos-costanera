import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const segments = url.pathname.split('/');
  // Buscamos el primer segmento que coincida con un idioma soportado
  const lang = segments.find(s => s in ui);
  if (lang) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return (ui[lang] as typeof ui[typeof defaultLang])[key] ?? ui[defaultLang][key];
  }
}
