"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput({
  placeholder = "Rechercher",
  paramName = "q",
}: {
  placeholder?: string;
  paramName?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params?.get(paramName) ?? "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(params?.get(paramName) ?? "");
  }, [params, paramName]);

  useEffect(() => {
    const id = setTimeout(() => {
      const current = params?.get(paramName) ?? "";
      if (value === current) return;
      const sp = new URLSearchParams(params?.toString() ?? "");
      if (value) sp.set(paramName, value);
      else sp.delete(paramName);
      sp.delete("page");
      const qs = sp.toString();
      router.replace(qs ? `?${qs}` : "?");
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="admin-input"
      style={{ maxWidth: 320 }}
    />
  );
}
