import Config from './config';
import { ENV } from './env';

export const DEBUG = new Config({
    environment: ENV.INT,
    endPoint: 'https://dev-lms-mobileapi.t99.vn/api/',
    identityEndPoint: 'https://dev-lms-identity.t99.vn/',
    enableDeveloperConsole: true,
    enableNetworkDebugger: true,
    universalLink: '',
    deeplinkScheme: 'app',
    dynamicLinkUrl: '',
    accessTokenEkycVnpt:
        'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlM2Y4NDJhOS00NjhiLTZhZGYtZTA1My02MzE5OWYwYTJiYTgiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoiaHV5bnFAdmRjcy52biIsInNjb3BlIjpbInJlYWQiXSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJuYW1lIjoiaHV5bnFAdmRjcy52biIsInV1aWRfYWNjb3VudCI6ImUzZjg0MmE5LTQ2OGItNmFkZi1lMDUzLTYzMTk5ZjBhMmJhOCIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiZWI3OGM3ODgtMzVhYy00ZmViLTljYzItYmZlMGI2YTUwYWIyIiwiY2xpZW50X2lkIjoiYWRtaW5hcHAifQ.jphedWkliskPXiXaww6hhuXVsQkxDeEnZMrvpg9fk4qf1NJt8F5-evZfDPKxYDqS0o0BuNJpshOco2KANjWJV79hu5IXwSwdJpw8V0HwFRPEtCJztrcSXPXhns6R6Z9IRnbhYqdSoDGiE0ei-YM7qNfOm74NAa1T9SHIaGc_rYY0A9bhkTGZ1kSuAk16DAhF4sQY7meFrPrI6kA6f-fQh-NpS-6LTdyWd0kQ82U7bEJHDIIEe2PWc2_zny7a9hytzbfyS1lWfHNlpvRh8Vw57Z8muZq6jLWLyBNOcIZ5r-F3FdHo1Y1zcoc8pbi9VaWJDbOLHB5Atmt2PyRvksBbwA',
    tokenIdEkycVnpt: 'e3f85fa3-85e0-0cee-e053-63199f0aca42',
    tokenKeyEkycVnpt:
        'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJAj0SdpuoIEQbzWkbh0clAT3jjDi/oCGbj1z8/RQpeYpkR7L1JfUx50/xqV5r4Bzt5GbpV5HDnuAXjQtYJxp5kCAwEAAQ=='
});
