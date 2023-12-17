import React, { useState } from "react";
import { Client, Account, ID } from "appwrite"; // Appwrite modülünü içeri aktar


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Appwrite istemci oluştur
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65704f186517aeac4eda");

  const account = new Account(client);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await account.create(email, password, ID.unique());

      console.log(response); // Yanıtı konsola yazdır

      // Kullanıcı başarıyla oluşturulduysa başarılı mesajını göster
      if (response) {
        setSuccess(true);
        setError(null);
      }
    } catch (error) {
      // Hata durumunda hatayı ayarla
      console.error(error); // Hata mesajını konsola yazdır
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <input
          name="email"
          type="email"
          placeholder="E-posta adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Kayıt ol</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Kayıt başarılı!</p>}
    </>
  );
};

export default Register;
