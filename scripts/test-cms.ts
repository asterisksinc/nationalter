import { CMS_PAGES } from "../app/(admin)/admin-overview/cms-planning/cmsData";
import { resolvePlanningPageKey, resolvePlanningSectionKey, defaultsForSection } from "../lib/cms-planning-utils";
import { getCmsSchema } from "../lib/cms-schema";

let fails = 0;
let oks = 0;

for (const page of CMS_PAGES) {
  const pageKey = resolvePlanningPageKey(page.key);
  
  for (const sec of page.sections) {
    const secKey = resolvePlanningSectionKey(page.key, sec.key);
    const key = `${pageKey}.${secKey}`;
    const schema = getCmsSchema(key);
    const def = defaultsForSection(sec);
    
    if (schema) {
      const res = schema.safeParse(def);
      if (!res.success) {
        console.error(`FAIL: ${key}`);
        console.error(JSON.stringify(res.error.issues, null, 2));
        fails++;
      } else {
        oks++;
      }
    } else {
      console.error(`NO SCHEMA: ${key}`);
      fails++;
    }
  }
}
console.log(`SUMMARY { FAIL: ${fails}, OK: ${oks} }`);