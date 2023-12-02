import io from 'socket.io-client';

const SOCKET_URL = "http://localhost:3000"; // Replace with your server URL

class WebSocketService {
    socket;

    connect() {
        this.socket = io(SOCKET_URL);

        this.socket.on('connect', () => {
            console.log('WebSocket Connected');
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket Disconnected');
        });
    }

    on(eventName, callback) {
        if (this.socket) {
            this.socket.on(eventName, callback);
        }
    }

    off(eventName, callback) {
        if (this.socket) {
            this.socket.off(eventName, callback);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;