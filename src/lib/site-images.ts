/** Freight-forwarding photography (Pexels / Unsplash). Replace with client photos when available. */
const pexels = (id: number, width = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=85&auto=format&fit=crop`;

export const siteImages = {
  /** Cargo ship alongside port */
  hero: unsplash("1494412574643-ff11b0a5c1c3", 1920),
  /** Container vessel in harbor */
  port: pexels(25003988, 1920),
  /** Warehouse aisle with pallet racks */
  warehouse: pexels(4483610),
  /** Container terminal yard */
  yard: pexels(163726),
  services: {
    /** Stacked shipping containers */
    seaFcl: unsplash("1578575437130-527eed3abbec"),
    /** Colorful container lot at port (LCL / consolidation) */
    seaLcl: pexels(906494),
    /** Atlas Air cargo Boeing 747 */
    airFreight: pexels(35707222),
    /** Semi-truck at warehouse loading dock */
    landMultimodal: pexels(18468444)
  },
  routes: {
    africa: unsplash("1494412574643-ff11b0a5c1c3"),
    southAmerica: unsplash("1578575437130-527eed3abbec"),
    southeastAsia: pexels(163726)
  }
} as const;
