interface AjaxResponse {
  /**
   * 状态码
   *
   * @type {Number}
   * @memberOf AjaxResponse
   */
  code: Number;
  /**
   * 数据
   *
   * @type {Object}
   * @memberOf AjaxResponse
   */
  data?: Object;
  /**
   * 消息
   *
   * @type {String}
   * @memberOf AjaxResponse
   */
  msg: String;
  /**
   * 登录后返回的Token
   *
   * @type {String}
   * @memberOf AjaxResponse
   */
  token?: String;
}

declare var AjaxResponse
