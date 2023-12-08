<script lang=ts>

import { get, post } from 'aws-amplify/api';
 
let base_str = "";
let book_str = "";

async function getapi() {
  try {
    const restOperation = get({ 
      apiName: 'myapi',
      path: '/notes',
    });
    const response = await restOperation.response;
    console.log('GET call succeeded: ', response);
    base_str = await JSON.stringify(response);
    console.log('base_str', base_str);
  } catch (error) {
    console.log('GET call failed: ', error);
  }
 
}

async function postlambda() {
  try {
    const restOperation = post({ 
      apiName: 'mylambda',
      path: '' ,
      options: {
        body: '{ "key1": "value1"}'
      }
    });
    const response = await restOperation.response;
    console.log('POST call succeeded: ', response);
    book_str = await JSON.stringify(response);
  } catch (error) {
    console.log('POST call failed: ', error);
  }
}

import { getCurrentUser } from 'aws-amplify/auth';

async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${JSON.stringify(signInDetails)}`);
    } catch (err) {
    console.log(err);
  }
}

</script>     

<h1> API Page</h1>

    <button on:click={currentAuthenticatedUser}>Press to get current user </button>

    <h3> ...</h3>
    
    <button on:click={getapi}>Press for (get) to api gateway</button>
    
    <h3> base_str : {base_str} ...</h3>

    <button on:click={postlambda}>Press for (post) to lambda function</button>
    

    <h3> auth_str : {book_str} ...</h3>

    
    
    