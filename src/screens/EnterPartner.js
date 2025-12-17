import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase.js";

export default function EnterPartner() {
  const [value, setValue] = useState("");

  async function submit() {
    const fn = httpsCallable(functions, "tryCreatePair");
    await fn({ partnerUsername: value });
  }

  return (
    <div>
      <h2>Введите ник партнера</h2>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={submit}>Подключиться</button>
    </div>
  );
}
