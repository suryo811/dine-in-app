import { slots } from "@/store/restaurants";
import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Uploads all restaurants from the restaurants array to Firestore
 * Uses batched writes for better performance
 */
async function uploadData() {
  try {
    // Create a batch for better performance with multiple writes
    const batch = writeBatch(db);

    // Reference to the restaurants collection
    const collectionRef = collection(db, "slots");

    // Add each restaurant to the batch
    slots.forEach((slot, index) => {
      const docRef = doc(collectionRef, `slot_${index + 1}`);
      batch.set(docRef, slot);
    });

    // Commit the batch
    await batch.commit();

    console.log(`Successfully uploaded to Firestore`);
    return true;
  } catch (error) {
    console.error("Error uploading to Firestore:", error);
    return false;
  }
}

uploadData();
