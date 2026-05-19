"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type EnumOption = { value: string; label: string };

export default function EnumFilter({
  paramName,
  options,
  ariaLabel,
}: {
  paramName: string;
  options: EnumOption[];
  ariaLabel?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const current = params?.get(paramName) ?? "all";

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const sp = new URLSearchParams(params?.toString() ?? "");
    if (e.target.value === "all") sp.delete(paramName);
    else sp.set(paramName, e.target.value);
    sp.delete("page");
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : "?");
  }

  return (
    <select
      aria-label={ariaLabel}
      value={current}
      onChange={onChange}
      className="admin-input"
      style={{
        maxWidth: 220,
        appearance: "none",
        paddingRight: 32,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%23888' d='M6 8L0 0h12z'/></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
