import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Bill } from '@prisma/client';
@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('WebSocket initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    sendBillNotification(bill: Bill) {
        this.server.emit('BILL_NOTIFICATION', bill);
        console.log("emit notification")
    }
}
