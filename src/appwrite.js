import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65704f186517aeac4eda");

const account = new Account(client);

const promise = account.create("[USER_ID]", "email@example.com", "");

promise.then(
  function (response) {
    console.log(response);
  },
  function (error) {
    console.log(error);
  }
);
