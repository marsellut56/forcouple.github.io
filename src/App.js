import { useEffect } from "react";
import { authAnon, db } from "./firebase.js";
import { doc, onSnapshot } from "firebase/firestore";
import { getTelegramUser } from "./telegram.js";
import EnterPartner from "./screens/EnterPartner.js";
import Waiting from "./screens/Waiting.js";
import Home from "./screens/Home.js";

export default function App() {
  const [screen, setScreen] = React.useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();

    async function init() {
      const user = getTelegramUser();
      if (!user) return;
      await authAnon();

      const ref = doc(db, "users", String(user.id));
      onSnapshot(ref, snap => {
        if (!snap.exists()) return;
        const u = snap.data();
        if (u.status === "single") setScreen("ENTER");
        if (u.status === "waiting") setScreen("WAITING");
        if (u.status === "paired") setScreen("HOME");
      });
    }
    init();
  }, []);

  if (screen === "ENTER") return <EnterPartner />;
  if (screen === "WAITING") return <Waiting />;
  if (screen === "HOME") return <Home />;
  return null;
}
