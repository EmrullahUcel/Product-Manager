import { Client, Account, Databases , } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65704f186517aeac4eda")
  
  /*local*/

  
  /* .setEndpoint("http://apis.localhost/v1") 
  .setProject("657df36da3b49f64bc8e"); */

const account = new Account(client);
const databases = new Databases(client)

export {client , account , databases}