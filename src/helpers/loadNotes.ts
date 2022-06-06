import { db } from "../firebase/firebase-config"


export const loadNotes = async ( uid: string ) => {
  const notesSnap = await db.collection(`${ uid }/journal/notes`).get()
  const notes: any = [];

  notesSnap.forEach(snap => {
    notes.push({
      id: snap.id,
      ...snap.data()
    })
  })

  return notes;
}