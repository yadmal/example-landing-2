const smartgrid = require('smart-grid');

const settings = {
  columns: 12,
  offset: '30px',
  container:{
    maxWidth: '1170px',
    fields: '30px'
  },
  outputStyle: 'less',
  oldSizeStyle: false,
  properties: []
}

smartgrid('./src/preCss', settings);
