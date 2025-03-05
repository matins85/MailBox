export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  messagesCount: number;
  unReadCount: number;
}

export interface Sender {
  _id: string;
  first_name: string;
  last_name: string;
  image: string;
}

export interface Message {
  _id: string;
  subject: string;
  content: string;
  sender: Sender;
  recipient: string;
  isRead: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    user: User;
    messages: Message[];
    messagesCount: number;
    unReadCount: number;
  };
}
