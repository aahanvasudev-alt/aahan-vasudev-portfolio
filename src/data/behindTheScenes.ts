/**
 * ============================================================================
 * BEHIND THE SCENES & PRODUCTION ARCHIVES DATA
 * ============================================================================
 * Centralized data source for your documentary filmmaking process,
 * on-set photography, storyboard sketches, and director notes.
 *
 * TO EDIT OR ADD ITEMS:
 * - Update, duplicate, or delete items in the `BTS_ITEMS` array below.
 * - Replace `imageUrl` with your actual on-set stills, contact sheets, or sketches.
 * - All metadata fields (dateOrScene, note, badge, description) are optional and editable.
 */

export interface BTSItem {
  id: string;
  title: string;
  category: 'ON-SET' | 'STORYBOARD' | 'CONTACT SHEET' | 'DIRECTOR LOG' | 'LIGHTING & CAM';
  dateOrScene?: string;
  aspectRatio: '1:1' | '16:9' | '4:3' | '3:2' | '2.39:1' | 'vertical';
  imageUrl: string;
  description?: string;
  note?: string; // Technical or creative note (e.g. lens choice, lighting, memory)
  badge?: string; // Tag pill (e.g. "35MM KODAK", "RAW TAKE", "STORYBOARD")
}

export const BTS_ITEMS: BTSItem[] = [
  {
    id: 'bts-01',
    title: '[ON-SET: CAMERA RIG & DOLLY RUN]',
    category: 'ON-SET',
    dateOrScene: 'SCENE 22 // DAY 04 - EXTERIOR HIGHLANDS',
    aspectRatio: '16:9',
    imageUrl:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    badge: '35MM ARRI LF',
    description:
      '[Placeholder: Camera dolly track setup on the cliffside during early dawn. 40-foot track laid over uneven moss to capture continuous tracking shot.]',
    note: 'LENS // 40MM COOKE ANAMORPHIC T2.0 - NATURAL OVERCAST DIFFUSION',
  },
  {
    id: 'bts-02',
    title: '[STORYBOARD: CLIMAX APERTURE SHIFT]',
    category: 'STORYBOARD',
    dateOrScene: 'BEAT 08 // FRAME SKETCH #42-B',
    aspectRatio: '4:3',
    imageUrl:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
    badge: 'HAND SKETCH',
    description:
      '[Placeholder: Pencil thumbnail sketch mapping the camera whip-pan from character reflection in broken glass to empty doorway.]',
    note: 'DIRECTOR NOTE: HOLD SILENCE FOR 4 SECONDS BEFORE AUDIO SPLIT CUT',
  },
  {
    id: 'bts-03',
    title: '[CONTACT SHEET: 35MM ROLL 04]',
    category: 'CONTACT SHEET',
    dateOrScene: 'ROLL #04 // FRAMES 14-22 - NIGHT EXTERIOR',
    aspectRatio: 'vertical',
    imageUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    badge: 'KODAK 5219 500T',
    description:
      '[Placeholder: Darkroom proof sheet displaying exposure variations and bracketed framing of the subterranean hallway confrontation.]',
    note: 'RED GREASE PENCIL SELECTION: FRAME 18A SELECTED FOR HERO KEY ART',
  },
  {
    id: 'bts-04',
    title: '[LIGHTING TEST: NEON & PRACTICAL HAZE]',
    category: 'LIGHTING & CAM',
    dateOrScene: 'SOUNDSTAGE B // PRE-LIGHT TEST',
    aspectRatio: '3:2',
    imageUrl:
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80',
    badge: 'LIGHTING STUDY',
    description:
      '[Placeholder: Testing sodium vapor streetlamps combined with oil-based atmospheric haze to create organic lens flares without post VFX.]',
    note: 'EXPOSURE: T1.4 @ ISO 1280 // SHUTTER 180°',
  },
  {
    id: 'bts-05',
    title: '[DIRECTOR LOG: RAIN RIG REHEARSAL]',
    category: 'DIRECTOR LOG',
    dateOrScene: 'DAY 11 // 03:40 AM - RAIN TOWER TEST',
    aspectRatio: '16:9',
    imageUrl:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    badge: 'LOG BOOK #02',
    description:
      '[Placeholder: Final blocking with lead actors under simulated downpour. Water pressure dialed to match 1970s neo-noir grain aesthetics.]',
    note: 'FIELD NOTE: "ACTORS SHIVERING AUTHENTICALLY. CAPTURED IN ONE CONTINUOUS TAKE."',
  },
  {
    id: 'bts-06',
    title: '[OPTICAL TESTING: PRISM & SPLIT-DIOPTER]',
    category: 'LIGHTING & CAM',
    dateOrScene: 'OPTICAL BENCH // CUSTOM VINTAGE GLASS',
    aspectRatio: '1:1',
    imageUrl:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
    badge: 'CUSTOM OPTICS',
    description:
      '[Placeholder: Handcrafted split-diopter mounted on matte box to hold both extreme foreground iris and background doorway in sharp focus.]',
    note: 'CALIBRATION: SPLIT LINE ALIGNED WITH ARCHITECTURAL CONCRETE PILLAR',
  },
];
