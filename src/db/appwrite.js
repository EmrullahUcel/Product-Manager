import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("http://apis.localhost/v1")
  .setProject("657df36da3b49f64bc8e");

const account = new Account(client);

export {client , account}