const { Component } = require('@serverless-devs/s-core');
const getHelp = require('./utils/help');
const ServerlessError = require('./utils/error');
const Qualifier = require('./utils/qualifier');

class QualifierComponent extends Component {

  checkInput (command, commands) {
    if (!(commands[0] && ['alias', 'version'].includes(commands[0]))) {
      new ServerlessError({
        code: 'CommandsError',
        message: `Commands error,please execute the \'s ${command} --help\' command.`
      });
    }
  }

  handlerInputs (inputs) {
    const {
      Properties: properties = {},
      Credentials: credentials = {}
    } = inputs;

    const {
      Region: region,
      Service: serviceProp = {},
      Function: functionProp = {}
    } = properties;
    
    const serviceName = serviceProp.Name;

    return {
      credentials,
      region,
      serviceName
    }
  }

  async publish (inputs) {
    this.help(inputs, getHelp(inputs).publish);

    const { credentials, region, serviceName } = this.handlerInputs(inputs);
    const { Commands: commands, Parameters: parameters = {} } = this.args(inputs.Args);
    this.checkInput('publish', commands);

    const qualifier = new Qualifier(credentials, region);

    if (commands[0] === 'version') {
      await qualifier.publishVersion(serviceName, parameters.d || parameters.description);
    } else {
      await qualifier.publishAlias(serviceName, parameters);
    }
  }

  async unpublish (inputs) {
    this.help(inputs, getHelp(inputs).unpublish);
    const { credentials, region, serviceName } = this.handlerInputs(inputs);
    const { Commands: commands, Parameters: parameters = {} } = this.args(inputs.Args);
    this.checkInput('unpublish', commands);

    const qualifier = new Qualifier(credentials, region);
    if (commands[0] === 'version') {
      await qualifier.deleteVersion(serviceName, parameters.v || parameters.versionId);
    } else {
      await qualifier.deleteAlias(serviceName, parameters.n || parameters.name);
    }
  }
}

module.exports = QualifierComponent;