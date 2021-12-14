const config = {
  user: 'web',
  password: 'Kenapa03,',
  server: 'db',
  // server: '128.199.108.148',
  database: 'DATAVERSE',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  port: 1433,
};

module.exports = config;
