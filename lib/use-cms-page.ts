"use client";

import { useEffect, useState } from "react";
import { CmsMap, mergeCmsWithDefaults } from "@/lib/cms-utils";

export function useCmsPage<T extends CmsMap>(page: string, defaults: T): T {
  const [cms, setCms] = useState<T>(defaults);

  useEffect(() => {
    let mounted = true;

    const loadCms = async () => {
      setCms(defaults);

      try {
        const res = await fetch(`/api/cms/${page}`, { cache: "no-store" });
        const json = await res.json();

        if (!mounted || !res.ok || !json?.success) {
          return;
        }

        const merged = mergeCmsWithDefaults(defaults, json.cms);
        setCms(merged);
      } catch {
        // Keep defaults when CMS API/DB is unavailable.
      }
    };

    loadCms();

    return () => {
      mounted = false;
    };
  }, [page, defaults]);

  return cms;
}
