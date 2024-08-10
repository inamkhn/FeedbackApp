import { Message } from "@/model/User";

export interface ApiResponse {
    messages: never[];
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    Messages?: Array<Message>
}