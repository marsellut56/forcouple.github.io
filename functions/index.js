const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.tryCreatePair = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) throw new functions.https.HttpsError("unauthenticated");

  const partnerUsername = data.partnerUsername;

  const userRef = db.collection("users").doc(uid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    throw new functions.https.HttpsError("not-found");
  }

  const user = userSnap.data();

  const partnerSnap = await db.collection("users")
    .where("username", "==", partnerUsername)
    .limit(1)
    .get();

  if (partnerSnap.empty) {
    await userRef.update({ partnerUsername, status: "waiting" });
    return { status: "waiting" };
  }

  const partnerDoc = partnerSnap.docs[0];
  const partner = partnerDoc.data();

  if (partner.partnerUsername !== user.username) {
    await userRef.update({ partnerUsername, status: "waiting" });
    return { status: "waiting" };
  }

  const pairRef = await db.collection("pairs").add({
    userA: uid,
    userB: partnerDoc.id,
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
    status: "active"
  });

  await userRef.update({ status: "paired", pairId: pairRef.id });
  await partnerDoc.ref.update({ status: "paired", pairId: pairRef.id });

  return { status: "paired" };
});
