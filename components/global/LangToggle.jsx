"use client";
import { locales } from "@/lib/lang";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function LangToggle({ lang }) {
  const pathname = usePathname();
  const router = useRouter();

  const redirect = (locale) => {
    const pathArr = pathname.split("/");
    pathArr[1] = locale;
    const newPath = pathArr.join("/");
    router.push(newPath);
  };

  return (
    <select
      className="bg-inherit capitalize p-2"
      value={lang}
      onChange={(e) => redirect(e.target.value)}
    >
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.name}
        </option>
      ))}
    </select>
  );
}
