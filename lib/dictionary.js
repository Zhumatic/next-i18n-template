import "server-only";
import { locales } from "./lang";

const dictionaries = {};

locales.forEach((locale) => {
  dictionaries[locale.code] = () =>
    // make sure dictionary file's name is eqaul to its code
    import(`./dictionaries/${locale.code}.json`).then(
      (module) => module.default
    );
});

export const getDictionary = async (locale) => dictionaries[locale]();
