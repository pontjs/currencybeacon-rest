/**
 * @author pontx-generator
 * @description API 类型定义
 */

export declare namespace APIs {
  export type ConvertParams = {
    /**
     * @description 待换算货币的三字母代码。
     */
    from: string;
    /**
     * @description 目标货币的三字母代码。
     */
    to: string;
    /**
     * @description 待换算的金额。
     */
    amount: number;
    /**
     * @description 历史查询或换算使用的日期，格式为 YYYY-MM-DD。
     */
    date?: string;
  };

  export type HistoricalParams = {
    /**
     * @description 历史查询或换算使用的日期，格式为 YYYY-MM-DD。
     */
    date: string;
    /**
     * @description 基准货币的三字母代码；未提供时服务默认使用 USD。
     */
    base?: string;
    /**
     * @description 可选的逗号分隔货币代码列表，用于限制返回汇率。
     */
    symbols?: string;
  };

  export type LatestParams = {
    /**
     * @description 基准货币的三字母代码；未提供时服务默认使用 USD。
     */
    base?: string;
    /**
     * @description 可选的逗号分隔货币代码列表，用于限制返回汇率。
     */
    symbols?: string;
  };

  export type TimeseriesParams = {
    /**
     * @description 时间序列起始日期，格式为 YYYY-MM-DD。
     */
    start_date: string;
    /**
     * @description 时间序列结束日期，格式为 YYYY-MM-DD，且不得早于起始日期。
     */
    end_date: string;
    /**
     * @description 基准货币的三字母代码；未提供时服务默认使用 USD。
     */
    base?: string;
    /**
     * @description 可选的逗号分隔货币代码列表，用于限制返回汇率。
     */
    symbols?: string;
  };

}

// ============ API 集合类型 ============

/**
 * API 类型定义
 */
export type APIs = {
  /**
   * GET /convert
   * 使用当前或指定历史日期的汇率换算金额。
   * @summary: 换算货币金额
   */
  convert: (
    params: APIs.ConvertParams,
    requestInit?: RequestInit,
  ) => Promise<any>;

  /**
   * GET /currencies
   * 返回可用货币的数字 key 映射及其名称、代码、精度和显示符号。
   * @summary: 列出支持的货币
   */
  currencies: (
    requestInit?: RequestInit,
  ) => Promise<any>;

  /**
   * GET /historical
   * 返回指定日期的历史汇率，可按 symbols 限制返回货币。
   * @summary: 查询历史汇率
   */
  historical: (
    params: APIs.HistoricalParams,
    requestInit?: RequestInit,
  ) => Promise<any>;

  /**
   * GET /latest
   * 按基准货币返回当前可用汇率，可按 symbols 限制返回货币。
   * @summary: 查询最新汇率
   */
  latest: (
    params: APIs.LatestParams,
    requestInit?: RequestInit,
  ) => Promise<any>;

  /**
   * GET /timeseries
   * 返回给定日期范围内的每日汇率。
   * @summary: 查询汇率时间序列
   */
  timeseries: (
    params: APIs.TimeseriesParams,
    requestInit?: RequestInit,
  ) => Promise<any>;

};

export declare namespace APIs {
}
