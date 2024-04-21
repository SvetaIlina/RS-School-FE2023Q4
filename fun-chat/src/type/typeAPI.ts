export type currentUser = {
    login: string;
    password: string;
};
export type thirdPartyUser = {
    login: string;
    isLogined: boolean;
};

type user = {
    user: currentUser | thirdPartyUser | Array<thirdPartyUser> | Pick<currentUser, 'login'>;
};

type sendedMessage = {
    to: string;
    text: string;
};

type messageStatus = {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
    isDeleted?: boolean;
};

export type receivedMessage = {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: messageStatus;
};

export type messageState = {
    id: string;
    status: Partial<messageStatus>;
};

type message = {
    message:
        | sendedMessage
        | receivedMessage
        | Array<receivedMessage>
        | messageState
        | Pick<messageState, 'id'>
        | Pick<receivedMessage, 'id' | 'text' | 'status'>;
};

type payload =
    | {
          user: currentUser | thirdPartyUser;
      }
    | {
          message:
              | receivedMessage
              | Array<receivedMessage>
              | messageState
              | Pick<receivedMessage, 'id' | 'text' | 'status'>;
      }
    | {
          users: Array<thirdPartyUser>;
      };

type serverError = {
    error: string;
};

export type errorResponse = {
    id: string;
    type: string;
    payload: serverError;
};

export type generalRequest = {
    id: string;
    type: string;
    payload: payload | null;
};

export interface apiData {
    id: string | null;
    type: string;
    payload: user | message | null;
}
