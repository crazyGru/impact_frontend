import { Configuration } from '@azure/msal-browser'

const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Your Azure app client ID
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Your Azure tenant ID
    redirectUri: 'http://localhost:3000' // Your redirect URI
  }
}

export default msalConfig
