<script lang=ts>

import { Amplify } from "aws-amplify";
import { env } from '$env/dynamic/public';


let AmplifyConfig = 
{
  "aws_project_region": import.meta.env.VITE_REGION,
  "aws_cognito_identity_pool_id": import.meta.env.VITE_IDENTITY_POOL_ID,
  "aws_cognito_region": import.meta.env.VITE_REGION,
  "aws_user_pools_id": import.meta.env.VITE_USER_POOL_ID,
  "aws_user_pools_web_client_id": import.meta.env.VITE_USER_POOL_CLIENT_ID,
  "oauth": {},
  "aws_cognito_username_attributes": [
    "EMAIL"
  ],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [],
  "aws_cognito_password_protection_settings": {
    "passwordPolicyMinLength": 8,
    "passwordPolicyCharacters": [
      "REQUIRES_LOWERCASE",
      "REQUIRES_UPPERCASE",
      "REQUIRES_NUMBERS",
      "REQUIRES_SYMBOLS"
    ]
  },
  "aws_cognito_verification_mechanisms": [
    "EMAIL"
  ],
  "aws_cloud_logic_custom": [
    {
      "name": "myrest",
      "endpoint":  import.meta.env.VITE_URL,
      "region": import.meta.env.VITE_REGION
    }
  ]
};


import { signIn, type SignInInput, AuthError } from 'aws-amplify/auth';
import {type ResourcesConfig } from 'aws-amplify';



let mycreds = { username : 'tony.samsom@asica.ca' , password: 'Passw0rd!' };
let myIsSignedIn = false;

async function handleSignIn({ username, password }: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    myIsSignedIn = isSignedIn;
    } catch (error) {
     // if ( error instanceof UserAlreadyAuthenticatedException ) { myIsSignedIn = true }
     console.log('error signing in', error);
  }
  return myIsSignedIn;
}

import { signOut } from 'aws-amplify/auth';

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }  
  return true;
}
let myPromise: Promise<boolean> = new Promise((resolve, reject) => {});

function handleClickLogin() {
      if (!myIsSignedIn) 
        myPromise = handleSignIn(mycreds);
    }

function handleClickLogout() {
  myPromise = handleSignOut();
}

function handleClickAmplifyInit() {
  try {
    Amplify.configure(AmplifyConfig);
//    Amplify.configure(AmplifyConfig, { "ssr" : true } );
  } catch (error) {
    console.log('error Amplify.configure ', error);
  }  
}
    

</script>

<h1>Cognito TestBed</h1>


<h3>{JSON.stringify(AmplifyConfig)}</h3>

<h3> ...</h3>

<button on:click={handleClickAmplifyInit}>Press for Amplify.configure </button>

<h3> ...</h3>

<button on:click={handleClickLogin}>Press to sign in </button>

<h3> ...</h3>

<button on:click={handleClickLogout}>Press to sign out </button>

<h3> Signed in: {myIsSignedIn}</h3>


<a href="/api">Api</a>


