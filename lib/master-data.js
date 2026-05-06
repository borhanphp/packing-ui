export const COMMODITY_TYPE_MASTER_ROWS = [
  { id: 1, name: "Wheat", acosCode: "WHT001", testRequired: "No" },
  { id: 2, name: "Barley", acosCode: "BAR002", testRequired: "Yes" },
];

export const COMMODITY_MASTER_ROWS = [
  {
    id: 1,
    commodityCode: "COM-001",
    description: "Australian Hard Wheat",
    commodityTypeId: 1,
    commodityTypeName: "Wheat",
    status: "Active",
    shrinkAmount: "2%",
  },
  {
    id: 2,
    commodityCode: "COM-002",
    description: "Premium Malt Barley",
    commodityTypeId: 2,
    commodityTypeName: "Barley",
    status: "Active",
    shrinkAmount: "1.5%",
  },
];

export const CUSTOMER_MASTER_ROWS = [
  { id: 1, code: "AC001", name: "Agri-Corp Pty Ltd" },
  { id: 2, code: "BN007", name: "BlueNest Foods" },
];

export const DEFAULT_CONTAINER_SIZES = ["10FT", "20FT", "40FT", "45FT", "48FT", "53FT"];
