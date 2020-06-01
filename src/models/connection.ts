import { phoneExists } from "./phone";

enum ConnectionStatus {
  Calling = "calling",
  Missed = "missed",
  Ringing = "ringing",
  Talking = "talking",
  Rejected = "rejected",
  Closed = "closed",
}

type Connection = {
  id?: number;
  caller: number;
  callee: number;
  status: ConnectionStatus;
  createdAt: Date;
};

/* Connection states */
type CallingState = Connection & {
  status: ConnectionStatus.Calling;
};

type RingingState = Connection & {
  status: ConnectionStatus.Ringing;
};

type TalkingState = Connection & {
  status: ConnectionStatus.Talking;
};

type RejectedState = Connection & {
  status: ConnectionStatus.Rejected;
};

type MissedState = Connection & {
  status: ConnectionStatus.Missed;
};

type ClosedState = Connection & {
  status: ConnectionStatus.Closed;
};

type ConnectionState =
  | CallingState
  | RingingState
  | TalkingState
  | RejectedState
  | MissedState
  | ClosedState;

/* State transitions */
enum ConnectionAction {
  call = "call",
  ring = "ring",
  accept = "accept",
  reject = "reject",
  cancel = "cancel",
  close = "close",
  ignore = "ignore",
}

const connections: Record<number, Connection> = {};

const validateConnection = (connection: Connection): void => {
  if (!phoneExists(connection.caller)) throw new Error("caller doesn't exist");
  if (!phoneExists(connection.callee)) throw new Error("callee doesn't exist");
  if (connection.caller === connection.callee)
    throw new Error("caller can't call itself");
};

/* Transitions */
const ring = (connection: CallingState): RingingState => {
  return { ...connection, status: ConnectionStatus.Ringing };
};

const accept = (connection: RingingState): TalkingState => {
  return { ...connection, status: ConnectionStatus.Talking };
};

const reject = (connection: RingingState): RejectedState => {
  return { ...connection, status: ConnectionStatus.Rejected };
};

const close = (connection: TalkingState): ClosedState => {
  return { ...connection, status: ConnectionStatus.Closed };
};

const miss = (connection: CallingState | RingingState): MissedState => {
  return { ...connection, status: ConnectionStatus.Missed };
};

const transition = (
  connection: ConnectionState,
  action: ConnectionAction
): ConnectionState => {
  switch (action) {
    case ConnectionAction.ring:
      if (connection.status === ConnectionStatus.Calling)
        return ring(connection);
      break;
    case ConnectionAction.accept:
      if (connection.status === ConnectionStatus.Ringing)
        return accept(connection);
      break;
    case ConnectionAction.reject:
      if (connection.status === ConnectionStatus.Ringing)
        return reject(connection);
      break;
    case ConnectionAction.cancel:
    case ConnectionAction.ignore:
      if (
        connection.status === ConnectionStatus.Ringing ||
        connection.status === ConnectionStatus.Calling
      )
        return miss(connection);
      break;
    case ConnectionAction.close:
      if (connection.status === ConnectionStatus.Talking)
        return close(connection);
      break;
  }

  throw new Error(
    `invalid state: ${JSON.stringify(connection)} or action: ${action}`
  );
};

export const createConnection = (caller: number, callee: number) => {
  const connection: Connection = {
    caller,
    callee,
    status: ConnectionStatus.Calling,
    createdAt: new Date(),
  };
  validateConnection(connection);
  connection.id = Date.now();
  connections[connection.id] = connection;
  return connection;
};

export const updateConnection = (id: number, action: ConnectionAction) => {
  if (connections[id] === undefined)
    throw new Error("connection doesn't exist");
  const connection = transition(connections[id], action);
  connections[connection.id] = connection;
  return connection;
};

export const listConnections = (): Connection[] => {
  return Object.values(connections);
};

export const getConnection = (id: number): Connection => {
  return connections[id];
};

export const isAction = (action: string): action is ConnectionAction => {
  return Object.values(ConnectionAction)
    .map((x) => x.toString())
    .includes(action);
};
