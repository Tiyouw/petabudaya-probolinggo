// ===== Stats Utilities — PetaBudaya Probolinggo =====
import { cagarBudaya, allCulturalSites } from '@/data/cultural-sites';
import { wbtbItems } from '@/data/wbtb';
import { opkCategories } from '@/data/opk';

export function getStats() {
  const cbCount = cagarBudaya.length;
  const wbtbCount = wbtbItems.length;
  const opkCategoryCount = opkCategories.length;
  const odcbCount = allCulturalSites.filter((item) => item.type === 'odcb').length;
  const totalItems = allCulturalSites.length + wbtbCount;

  return {
    cagarBudaya: cbCount,
    wbtb: wbtbCount,
    opkCategories: opkCategoryCount,
    odcb: odcbCount,
    total: totalItems,
  };
}

export function getNeedsValidationCount() {
  return allCulturalSites.filter((item) => item.confidence === 'needs-validation').length +
    wbtbItems.filter((item) => item.confidence === 'needs-validation').length;
}
