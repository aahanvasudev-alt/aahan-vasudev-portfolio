/**
 * Three selected films for the portfolio.
 * Drive video IDs are paired to the thumbnail order supplied in chat.
 */
export interface ProjectCredit {
  label: string;
  value: string;
}

export interface FilmProject {
  id: string;
  title: string;
  subtitle?: string;
  year?: string;
  category?: string;
  role?: string;
  duration?: string;
  aspectRatio?: string;
  description?: string;
  credits?: ProjectCredit[];
  thumbnailUrl?: string;
  videoUrl?: string;
  awards?: string[];
  accentColor?: string;
}

export const PROJECTS_DATA: FilmProject[] = [
  {
    id: 'project-01',
    title: 'FILM 01',
    subtitle: 'Selected Short Film',
    category: 'NARRATIVE',
    aspectRatio: '16:9',
    thumbnailUrl: '/images/projects/film-01.png',
    // Thumbnail 1: monochrome doorway still
    videoUrl:
      'https://drive.google.com/file/d/1UoRctGZOR8Z7_WZ252BeYX4cuf09KhlX/preview',
  },
  {
    id: 'project-02',
    title: 'FILM 02',
    subtitle: 'Selected Short Film',
    category: 'NARRATIVE',
    aspectRatio: '16:9',
    thumbnailUrl: '/images/projects/film-02.png',
    // Thumbnail 2: woman in white saree
    videoUrl:
      'https://drive.google.com/file/d/17hXY992TjW9CF-NuLfjVTxaX6lbBucha/preview',
  },
  {
    id: 'project-03',
    title: 'FILM 03',
    subtitle: 'Selected Short Film',
    category: 'NARRATIVE',
    aspectRatio: '16:9',
    thumbnailUrl: '/images/projects/film-03.png',
    // Thumbnail 3: boy in red shirt
    videoUrl:
      'https://drive.google.com/file/d/13mBedgss6IwUZ7AgepjQZ7rRP-Ome4oa/preview',
  },
];
