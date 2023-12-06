import type { SSTConfig } from "sst";
import { SvelteKitSite, Cognito, Function, Api } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "svelte-test2",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {

        const auth = new Cognito(stack, "Auth", {
          login: ["email"],
        });
          
        const api = new Api(stack, "Api", {
        defaults: {
          authorizer: "iam",
          },
        routes: {
          "GET /notes": "src/functions/sv4gateway.handler",
          },
      });

      auth.attachPermissionsForAuthUsers(stack, [
        api,
      ]);

      const site = new SvelteKitSite(stack, "site" , {
        environment: {
          VITE_REGION: app.region,
          VITE_USER_POOL_ID: auth.userPoolId,
          VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
          VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
          VITE_URL: api.url,

        },
      });

      stack.addOutputs({
        url: site.url,
        api: api.url,
      });
    
    });
  },
} satisfies SSTConfig;
