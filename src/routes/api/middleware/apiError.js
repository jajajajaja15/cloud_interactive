/**
 * 用來回應 api 錯誤的 error 類型
 * @param {String} code error code
 * @param {String} message error message
 * @param {String} status http status
 */
function ApiError(code, message, status) {
  this.code = code;
  this.message = message;
  this.status = isNaN(parseInt(status, 10)) ? 200 : parseInt(status, 10);

  this.toApiResponse = function() {
    return {
      status: this.status,
      code: this.code,
      message: this.message
    };
  };
}

exports.throw = function (code, message, status) { 
  throw new ApiError(code, message, status);
};

