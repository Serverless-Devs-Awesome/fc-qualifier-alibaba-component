
module.exports = (inputs) => ({
  publish: {
    description: `Usage: s ${inputs.Project.ProjectName} publish
  
    Publish service version/alias.`,
    commands: [{
      name: 'version -d [description]',
      desc: 'publish version'
    }, {
      name: 'alias -n/--name [aliasName] -d [description] -v <versionId> -gv [grayVersionId] -w [grayVersionWeight]',
      desc: 'publish alias.'
    }]
  },
  unpublish: {
    description: `Usage: s ${inputs.Project.ProjectName} unpublish
  
    Unpublish service version/alias.`,
    commands: [{
      name: 'version -v/--versionId [versionId]',
      desc: 'unpublish the specified versionId.'
    }, {
      name: 'alias -n/--name [name]',
      desc: 'unpublish the specified alias name.'
    }]
  },
})