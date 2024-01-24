import io from 'socket.io-client';

const SOCKET_URL = "http://localhost:3000"; // Replace with your server URL

class WebSocketService {
    socket;

    connect() {
        this.socket = io(SOCKET_URL, {
            // Additional options if needed
        });

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

    emit(eventName, data) {
        if (this.socket) {
            this.socket.emit(eventName, data);
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

    // Example: Subscribe to task updates
    subscribeToTaskUpdates(callback) {
        this.on('taskUpdated', callback);
    }

    // Example: Notify server about task completion
    notifyTaskCompletion(taskId) {
        this.emit('taskCompleted', { taskId });
    }

    // Add more event-specific methods as needed...
}

const webSocketService = new WebSocketService();
export default webSocketService;