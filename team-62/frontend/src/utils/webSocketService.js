import io from 'socket.io-client';

const SOCKET_URL = "http://localhost:3000"; // Replace with your server URL

class WebSocketService {
    socket;
    attempts = 0;
    maxAttempts = 5; // Maximum reconnection attempts

    connect() {
        this.socket = io(SOCKET_URL, {
            // Additional options if needed, like authentication tokens
            reconnectionAttempts: this.maxAttempts,
        });

        this.socket.on('connect', () => {
            console.log('WebSocket Connected');
            this.attempts = 0; // Reset reconnection attempts on successful connection
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket Disconnected');
            // Attempt to reconnect with a backoff strategy
            setTimeout(() => {
                if (this.attempts < this.maxAttempts) {
                    this.attempts++;
                    console.log(`Reconnection attempt #${this.attempts}`);
                    this.connect(); // Reconnect
                }
            }, 1000 * this.attempts); // Exponential backoff strategy
        });

        this.socket.on('connect_error', (error) => {
            console.error('Connection Error:', error);
        });

        // Handle any global errors or event-specific errors here
        this.socket.on('error', (error) => {
            console.error('WebSocket Error:', error);
        });
    }

    on(eventName, callback) {
        if (this.socket) {
            this.socket.on(eventName, (data) => {
                console.log(`Event received: ${eventName}`, data);
                callback(data);
            });
        }
    }

    emit(eventName, data) {
        if (this.socket) {
            console.log(`Emitting event: ${eventName}`, data);
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