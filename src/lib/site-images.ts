export const siteImages = {
  /** Cargo ship alongside port */
  hero: "/images/topone-port-hero.png",
  /** Container vessel in harbor */
  port: "/images/topone-port-hero.png",
  /** Warehouse aisle with pallet racks */
  warehouse: "/images/topone-warehouse-operations.png",
  /** Container terminal yard */
  yard: "/images/topone-container-yard.png",
  services: {
    /** Stacked shipping containers */
    seaFcl: "/images/topone-service-sea-fcl.jpg",
    /** Colorful container lot at port (LCL / consolidation) */
    seaLcl: "/images/topone-service-sea-lcl.jpg",
    /** Atlas Air cargo Boeing 747 */
    airFreight: "/images/topone-service-air-freight.jpg",
    /** Semi-truck at warehouse loading dock */
    landMultimodal: "/images/topone-service-land-multimodal.jpg"
  },
  routes: {
    africa: "/images/topone-port-hero.png",
    southAmerica: "/images/topone-service-sea-fcl.jpg",
    southeastAsia: "/images/topone-container-yard.png"
  }
} as const;
