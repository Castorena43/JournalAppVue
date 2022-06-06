
export interface Auth {
  uid: string
  name: string
}

export interface UI {
  loading: string
  msgError: string
}

export interface Notes {
  notes: Note[]
  active: Note
}

export interface Note {
  id: string
  title: string
  body: string
  url: string
}