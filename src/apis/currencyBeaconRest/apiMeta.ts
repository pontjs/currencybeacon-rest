export const specMeta = {
  name: "CurrencyBeacon REST API v1",
  hasTags: false,
  url: [
    {
      url: "https://api.currencybeacon.com/v1"
    }
  ],
  apis: {
    "convert": {
      method: "GET",
      path: "/convert",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["from", "to", "amount", "date"],
      bodyParams: null
    },

    "currencies": {
      method: "GET",
      path: "/currencies",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: null,
      bodyParams: null
    },

    "historical": {
      method: "GET",
      path: "/historical",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["date", "base", "symbols"],
      bodyParams: null
    },

    "latest": {
      method: "GET",
      path: "/latest",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["base", "symbols"],
      bodyParams: null
    },

    "timeseries": {
      method: "GET",
      path: "/timeseries",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["start_date", "end_date", "base", "symbols"],
      bodyParams: null
    }
  }
} as const;
