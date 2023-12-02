import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { locales, defaultLocale } from "./lib/lang";

// get the language codes of available locales
const langCodes = locales.map((locale) => locale.code);

// detect browser languages
// determine befitting language
function getLocale(request) {
  let headers = {};
  request.headers.forEach((value, key) => (headers[key] = value));
  const languages = new Negotiator({ headers }).languages();
  return match(languages, langCodes, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // if pathname contains viable locale code do nothing
  const pathnameHasLocale = langCodes.some(
    (langCode) =>
      pathname.startsWith(`/${langCode}`) || pathname === `/${langCode}`
  );
  if (pathnameHasLocale) return;
  // redirect if there is no locale code
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths
    "/((?!api|favicon.ico|_next|.*\\..*).*)",
  ],
};
