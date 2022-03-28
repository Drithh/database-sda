const config = {
  user: 'websomee',
  password: 'Kenapa03,',
  server: 'dataverse.mssql.somee.com',
  database: 'DATAVERSE',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  port: 1433,
};

module.exports = config;
