type generalRequest = {
    id: string;
    type: string;
    payload: payload;
};

type payload =
    | {
          user: currentUser | thirdPartyUser | Array<thirdPartyUser>;
      }
    | {
          message:
              | receivedMessage
              | Array<receivedMessage>
              | messageState
              | Pick<receivedMessage, 'id' | 'text' | 'status'>;
      };

type errorResponse = {
    id: string;
    type: string;
    payload: serverError;
};

type serverError = {
    error: string;
};

type currentUser = {
    login: string;
    password: string;
};
type thirdPartyUser = {
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

type receivedMessage = {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: messageStatus;
};

type messageState = {
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

interface apiData {
    id: string | null;
    type: string;
    payload: user | message | null;
}
