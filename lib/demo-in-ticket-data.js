/** Demo fixtures for the In-Ticket form until AppContext / APIs exist. */

export const DEMO_SITE = 1;

export const DEMO_CUSTOMERS = [
  { id: 1, name: "GrainCorp Trading", code: "GCT" },
  { id: 2, name: "Riverina Co-op", code: "RIV" },
];

export const DEMO_INTERNAL_ACCOUNTS = [{ id: 101, name: "Internal — Screenings" }];

export const DEMO_COMMODITY_TYPES = [
  { id: 1, name: "Grain" },
  { id: 2, name: "Oilseeds" },
];

export const DEMO_COMMODITIES = [
  {
    id: 10,
    commodityTypeId: 1,
    commodityCode: "BARLEY-F1",
    description: "Feed barley F1",
    status: "active",
    unitType: "MT",
    testThresholds: [
      { testName: "Moisture", testId: 1, min: 8, max: 14 },
      { testName: "Protein", testId: 2, min: 9, max: 12 },
    ],
  },
  {
    id: 11,
    commodityTypeId: 1,
    commodityCode: "WHEAT-APW",
    description: "Wheat APW1",
    status: "active",
    unitType: "MT",
    testThresholds: [
      { testName: "Moisture", testId: 1, min: 9, max: 13 },
      { testName: "Protein", testId: 2, min: 10, max: 13 },
    ],
  },
  {
    id: 20,
    commodityTypeId: 2,
    commodityCode: "CANOLA-NGM",
    description: "Canola non-GM",
    status: "active",
    unitType: "MT",
    testThresholds: [{ testName: "Moisture", testId: 1, min: 6, max: 9 }],
  },
];

export const DEMO_TESTS = [
  { id: 1, unit: "%" },
  { id: 2, unit: "%" },
];

export const DEMO_CMOS = [
  {
    id: 1,
    direction: "in",
    cmoReference: "CMO-0142",
    customerId: 1,
    commodityTypeId: 1,
    commodityId: 10,
    status: "Open",
    estimatedAmount: 5200,
  },
  {
    id: 2,
    direction: "in",
    cmoReference: "CMO-0139",
    customerId: 2,
    commodityTypeId: 1,
    commodityId: 11,
    status: "Open",
    estimatedAmount: 3000,
  },
];

export const DEMO_TRUCKS = [
  { id: 1, name: "MHY-104", driver: "Alex Nguyen" },
  { id: 2, name: "MHY-227", driver: "Jamie Cole" },
];

export const DEMO_STOCK_LOCATIONS = [
  { id: 1, name: "Bay 12", locationType: "Bay", status: "active", site: DEMO_SITE },
  { id: 2, name: "Shed C", locationType: "Shed", status: "active", site: DEMO_SITE },
  { id: 3, name: "Laneway 4", locationType: "Lane", status: "active", site: DEMO_SITE },
];

export const DEMO_USERS = [
  { id: 1, name: "Alec Stead", active: true },
  { id: 2, name: "Jordan Miles", active: true },
];

export const DEMO_TICKETS = [];

/** Optional seed when opening /ticketing/in/[id] for demo edit flows */
export function demoExistingTicket(id) {
  if (id !== 10421) return null;
  return {
    id: 10421,
    type: "in",
    site: DEMO_SITE,
    status: "booked",
    cmoId: 1,
    truck: DEMO_TRUCKS[0],
    customerId: 1,
    commodityTypeId: 1,
    commodityId: 10,
    grossWeights: [],
    tareWeights: [],
    grossWeightDateTimes: [],
    tareWeightDateTimes: [],
    splitLoad: false,
    tests: {},
    commodityConfirmed: false,
    commodityOverrideReason: "",
    signoff: "",
    unloadedLocation: "",
    notes: "",
    ticketReference: "IN-DEMO-01",
    additionalReference: "",
    date: new Date().toISOString().split("T")[0],
  };
}

export const DEMO_TRANSACTIONS_BY_TICKET = {};

export function getDemoTransactionsByTicket(ticketId) {
  return DEMO_TRANSACTIONS_BY_TICKET[ticketId] || [];
}
