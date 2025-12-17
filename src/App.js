import { useEffect } from "react"
import { doc, setDoc, onSnapshot } from "firebase/firestore"
import { authAnon, db } from "./firebase"
import { getTelegramUser } from "./telegram"

export default function App() {
  const [screen, setScreen] = React.useState(null)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    tg?.ready()
    tg?.expand()

    async function init() {
      const tgUser = getTelegramUser()
      if (!tgUser || !tgUser.username) {
        alert("Telegram username обязателен")
        return
      }

      await authAnon()

      const userRef = doc(db, "users", String(tgUser.id))

      // 🔑 СОЗДАЁМ USER АВТОМАТИЧЕСКИ
      await setDoc(
        userRef,
        {
          uid: String(tgUser.id),
          username: tgUser.username,
          status: "single",
          createdAt: Date.now()
        },
        { merge: true }
      )

      // 🔄 ПОДПИСКА НА ИЗМЕНЕНИЯ
      onSnapshot(userRef, snap => {
        if (!snap.exists()) return
        const u = snap.data()

        if (u.status === "single") setScreen("ENTER")
        if (u.status === "waiting") setScreen("WAITING")
        if (u.status === "paired") setScreen("HOME")
        if (u.status === "broken") setScreen("BROKEN")
      })
    }

    init()
  }, [])

  if (screen === "ENTER") return <EnterPartner />
  if (screen === "WAITING") return <Waiting />
  if (screen === "HOME") return <Home />
  if (screen === "BROKEN") return <Broken />

  return null
}
