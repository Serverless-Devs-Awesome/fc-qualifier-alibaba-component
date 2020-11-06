'use strict'
const FC = require('@alicloud/fc2');
const ServerlessError = require('./error');

class Client {
  constructor (credentials, region) {
    this.region = region
    this.credentials = credentials

    this.accountId = credentials.AccountID
    this.accessKeyID = credentials.AccessKeyID
    this.accessKeySecret = credentials.AccessKeySecret
    this.stsToken = credentials.SecurityToken
  }

  buildFcClient () {
    return new FC(this.accountId, {
      accessKeyID: this.accessKeyID,
      accessKeySecret: this.accessKeySecret,
      securityToken: this.stsToken,
      region: this.region,
      timeout: 6000000
    })
  }

  /**
   * 抛出错误，用作数据统计
   * @param {*} e Error 对象或者 { name, message }
   */
  throwError (e) {
    new ServerlessError(e);
  }
}

module.exports = Client;
