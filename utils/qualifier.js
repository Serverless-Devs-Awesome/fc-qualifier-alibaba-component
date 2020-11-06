'use strict'

const Client = require('./client');
const Logger = require('../logger');


class Qualifier extends Client {
  constructor (credentials, region) {
    super(credentials, region)
    this.fcClient = this.buildFcClient()
    this.logger = new Logger()
  }

  async listVersion (serviceName) {
    try {
      return await this.fcClient.listVersions(serviceName)
    } catch (ex) {
      return ex.message
    }
  }

  publishVersion (serviceName, description) {
    try {
      this.logger.info('Publish version.');
      const { data } = await this.fcClient.publishVersion(serviceName, description);
      this.logger.success(`Publish version successfully: ${data.versionId}`);
      return data.versionId;
    } catch (ex) {
      this.throwError(ex);
    }
  }

  async findAlias (serviceName, name) {
    const listAlias = await this.fcClient.listAliases(serviceName);
    const { aliases } = listAlias.data;
    for (const alias of aliases) {
      if (alias.aliasName === name) {
        return alias;
      }
    }
  }

  async updateAlias (name, versionId, parames, serviceName) {
    try {
      this.logger.info(`Update alias: ${name}`);
      await this.fcClient.updateAlias(serviceName, name, versionId, parames);
      this.logger.success(`Update alias successfully: ${name}`);
      return name;
    } catch (ex) {
      this.throwError(ex);
    }
  }

  async createAlias (name, versionId, parames, serviceName) {
    try {
      this.logger.info(`Create alias: ${name}`);
      await this.fcClient.createAlias(serviceName, name, versionId, parames);
      this.logger.success(`Create alias successfully: ${name}`);
      return name;
    } catch (ex) {
      this.throwError(ex);
    }
  }

  publishAlias (serviceName, parameters) {
    const { n, name, v, versionId, d, description, gv, w } = parameters;
    const name = n || name;
    const version = `${v || versionId}`;

    const parames = {
      description: d || description,
      additionalVersionWeight: gv && w ? { gv: w / 100 } : {}
    };

    const alias = await this.findAlias(serviceName, name);
    if (alias) {
      return await this.updateAlias(name, version, parames, serviceName);
    } else {
      return await this.createAlias(name, version, parames, serviceName);
    }
  }
}

module.exports = Qualifier;
