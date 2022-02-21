import SocketService from "./SocketService";
import Event from "./Event";
import { SocketContext } from "./SocketContext";

if (window) window.ReactSocketIO = { SocketService, Event, SocketContext };

export { SocketService, Event, SocketContext };
