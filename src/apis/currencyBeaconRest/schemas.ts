/**
 * @title 货币换算成功响应；服务同时返回 response 包装与其顶层字段。
 * @description 货币换算成功响应；服务同时返回 response 包装与其顶层字段。
 */
export type ConversionResponse = {
  /**
   * @description 待换算的金额。
   */
  amount: number;
  /**
   * @description 历史查询或换算使用的日期，格式为 YYYY-MM-DD。
   */
  date: string;
  /**
   * @description 待换算货币的三字母代码。
   */
  from: string;
  meta: SuccessMeta;
  /**
   * @description 货币换算成功响应；服务同时返回 response 包装与其顶层字段。
   */
  response: {
    /**
     * @description 待换算的金额。
     */
    amount: number;
    /**
     * @description 历史查询或换算使用的日期，格式为 YYYY-MM-DD。
     */
    date: string;
    /**
     * @description 待换算货币的三字母代码。
     */
    from: string;
    /**
     * @description 货币换算成功响应；服务同时返回 response 包装与其顶层字段。
     */
    timestamp: number;
    /**
     * @description 目标货币的三字母代码。
     */
    to: string;
    /**
     * @description 货币换算成功响应；服务同时返回 response 包装与其顶层字段。
     */
    value: number
  };
  /**
   * @description 货币换算成功响应；服务同时返回 response 包装与其顶层字段。
   */
  timestamp: number;
  /**
   * @description 目标货币的三字母代码。
   */
  to: string;
  /**
   * @description 货币换算成功响应；服务同时返回 response 包装与其顶层字段。
   */
  value: number;
}

/**
 * @title 以数字字符串为 key 的货币定义动态映射；这是供应商实际返回的 JSON 对象，而非数组。
 * @description 以数字字符串为 key 的货币定义动态映射；这是供应商实际返回的 JSON 对象，而非数组。
 */
export type CurrenciesResponse = Record<any, Currency>

/**
 * @title 供应商列出的一个可用货币定义。
 * @description 供应商列出的一个可用货币定义。
 */
export type Currency = {
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  code: string;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  decimal_mark: string;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  id: number;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  name: string;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  precision: number;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  short_code: string;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  subunit: number;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  symbol: string;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  symbol_first: boolean;
  /**
   * @description 供应商列出的一个可用货币定义。
   */
  thousands_separator: string;
}

/**
 * @title 以 YYYY-MM-DD 日期为 key、当日汇率映射为 value 的动态映射。
 * @description 以 YYYY-MM-DD 日期为 key、当日汇率映射为 value 的动态映射。
 */
export type DateRateMap = Record<any, RateMap>

/**
 * @title 服务返回的错误状态与说明元数据。
 * @description 服务返回的错误状态与说明元数据。
 */
export type ErrorMeta = {
  /**
   * @description 服务返回的错误状态与说明元数据。
   */
  code: number;
  /**
   * @description 服务返回的错误状态与说明元数据。
   */
  disclaimer?: string;
  /**
   * @description 服务返回的错误状态与说明元数据。
   */
  error_detail?: string;
  /**
   * @description 服务返回的错误状态与说明元数据。
   */
  error_type?: string;
}

/**
 * @title 服务未能完成请求时返回的错误响应。
 * @description 服务未能完成请求时返回的错误响应。
 */
export type ErrorResponse = {
  /**
   * @description 服务未能完成请求时返回的错误响应。
   */
  message?: string;
  meta: ErrorMeta;
  /**
   * @description 服务未能完成请求时返回的错误响应。
   */
  response: Array<string>;
}

/**
 * @title 历史汇率成功响应；服务同时返回 response 包装与其顶层字段。
 * @description 历史汇率成功响应；服务同时返回 response 包装与其顶层字段。
 */
export type HistoricalRatesResponse = {
  /**
   * @description 基准货币的三字母代码；未提供时服务默认使用 USD。
   */
  base: string;
  /**
   * @description 历史汇率成功响应；服务同时返回 response 包装与其顶层字段。
   */
  date: string;
  meta: SuccessMeta;
  rates: RateMap;
  /**
   * @description 历史汇率成功响应；服务同时返回 response 包装与其顶层字段。
   */
  response: {
    /**
     * @description 基准货币的三字母代码；未提供时服务默认使用 USD。
     */
    base: string;
    /**
     * @description 历史汇率成功响应；服务同时返回 response 包装与其顶层字段。
     */
    date: string;
    rates: RateMap
  };
}

/**
 * @title 最新汇率成功响应；服务同时返回 response 包装与其顶层字段。
 * @description 最新汇率成功响应；服务同时返回 response 包装与其顶层字段。
 */
export type LatestRatesResponse = {
  /**
   * @description 基准货币的三字母代码；未提供时服务默认使用 USD。
   */
  base: string;
  /**
   * @description 最新汇率成功响应；服务同时返回 response 包装与其顶层字段。
   */
  date: string;
  meta: SuccessMeta;
  rates: RateMap;
  /**
   * @description 最新汇率成功响应；服务同时返回 response 包装与其顶层字段。
   */
  response: {
    /**
     * @description 基准货币的三字母代码；未提供时服务默认使用 USD。
     */
    base: string;
    /**
     * @description 最新汇率成功响应；服务同时返回 response 包装与其顶层字段。
     */
    date: string;
    rates: RateMap
  };
}

/**
 * @title 以货币代码为 key、汇率数值为 value 的动态映射。
 * @description 以货币代码为 key、汇率数值为 value 的动态映射。
 */
export type RateMap = Record<any, number>

/**
 * @title 服务返回的状态与免责声明元数据。
 * @description 服务返回的状态与免责声明元数据。
 */
export type SuccessMeta = {
  /**
   * @description 服务返回的状态与免责声明元数据。
   */
  code: number;
  /**
   * @description 服务返回的状态与免责声明元数据。
   */
  disclaimer: string;
}

/**
 * @title 时间序列成功响应；服务同时返回 response 包装与其顶层日期键。
 * @description 时间序列成功响应；服务同时返回 response 包装与其顶层日期键。
 */
export type TimeseriesResponse = {
  meta: SuccessMeta;
  response: DateRateMap;
}