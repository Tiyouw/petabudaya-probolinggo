"use client";

import { useState, useCallback } from "react";
import { PinLayerType } from "@/lib/map-utils";

interface UseMapFilterOptions {
  defaultLayers?: PinLayerType[];
}

export function useMapFilter({ defaultLayers }: UseMapFilterOptions = {}) {
  const [activeLayers, setActiveLayers] = useState<PinLayerType[]>(
    defaultLayers || ["cb", "odcb", "wbtb"]
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const toggleLayer = useCallback((layer: PinLayerType) => {
    setActiveLayers((prev) => {
      if (prev.includes(layer)) {
        return prev.filter((l) => l !== layer);
      }
      return [...prev, layer];
    });
  }, []);

  const toggleAll = useCallback(() => {
    setActiveLayers((prev) =>
      prev.length === 4 ? [] : ["cb", "odcb", "wbtb", "opk"]
    );
  }, []);

  const selectItem = useCallback((id: string | null) => {
    setSelectedItemId(id);
  }, []);

  return {
    activeLayers,
    toggleLayer,
    toggleAll,
    selectedItemId,
    selectItem,
  };
}
