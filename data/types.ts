// ===== Core Type Definitions — PetaBudaya Probolinggo =====

export type SourceRef = {
  document: string;
  page?: number;
  note?: string;
};

export type CoordinateConfidence = 'exact' | 'approx-district' | 'unknown';
export type DataConfidence = 'official' | 'source-backed' | 'needs-validation';

export type CulturalItem = {
  id: string;
  name: string;
  displayName?: string;
  slug: string;
  type: 'cagar-budaya' | 'odcb' | 'wbtb' | 'opk';
  category?: string;
  subcategory?: string;
  status?: 'ditetapkan' | 'diduga' | 'tercatat' | 'rekomendasi-penetapan' | 'unknown';
  locationText?: string;
  district?: string;
  village?: string;
  regency?: string;
  province?: string;
  year?: number;
  skNumber?: string;
  skDate?: string;
  domain?: string;
  description?: string;
  keterangan?: string;
  notes?: string;
  sources: SourceRef[];
  confidence: DataConfidence;
  coordinateConfidence: CoordinateConfidence;
  lat?: number;
  lng?: number;
  googleMapsUrl?: string;
  mapPosition?: {
    xPercent: number;
    yPercent: number;
  };
  clusterSubItems?: string[];
  tags?: string[];
  status_mvp?: 'active' | 'coming_soon';
};

export type OPKCategoryId =
  | 'manuskrip'
  | 'tradisi-lisan'
  | 'adat-istiadat'
  | 'ritus'
  | 'pengetahuan-tradisional'
  | 'teknologi-tradisional'
  | 'seni'
  | 'bahasa'
  | 'permainan-rakyat'
  | 'olahraga-tradisional';

export type OPKItem = {
  id: string;
  name: string;
  categoryId: OPKCategoryId;
  subcategory?: string;
  description?: string;
  locationText?: string;
  notes?: string;
};

export type OPKCategory = {
  id: OPKCategoryId;
  name: string;
  count: number;
  description?: string;
  accentColor: string;
  items: OPKItem[];
  source: SourceRef;
};

export type MapRegion = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  xPercent: number;
  yPercent: number;
};
