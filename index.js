const { Component } = require('@serverless-devs/s-core');
const getHelp = require('./utils/help');
const ServerlessError = require('./utils/error')

class FcComponent extends Component {
  constructor() {
    super();
  }

  async publish (inputs) {
    this.help(inputs, getHelp(inputs).publish);
  }

  async unpublish (inputs) {
    this.help(inputs, getHelp(inputs).unpublish);

  }
}

module.exports = FcComponent;