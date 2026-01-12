export type Message = {
  role: 'user' | 'agent',
  isImage: boolean,
  content: string,
  prompt: string,
  updatedAt: number
}

export type Chat = {
  _id: string,
  user: string,
  message: Message[],
  updatedAt: string
}