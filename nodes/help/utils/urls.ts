import { BaseUrl } from '../type/enums';
import { getCurrentLocale, Locale } from '../i18n/types';

export const BASE_URL_BY_LOCALE: Record<Locale, BaseUrl> = {
	en: BaseUrl.Global,
	zh: BaseUrl.China,
};

export function getDocumentationUrl(path: string, locale: Locale = getCurrentLocale()): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;

	return `${BASE_URL_BY_LOCALE[locale]}${normalizedPath}`;
}
