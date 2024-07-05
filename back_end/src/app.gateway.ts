import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Bill } from '@prisma/client'
@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server
    private connectedClients: Set<string> = new Set()

    afterInit(server: Server) {
        console.log('WebSocket initialized')
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`)
        this.connectedClients.add(client.id)
        this.updateOnlineUserCount()
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`)
        this.connectedClients.delete(client.id)
        this.updateOnlineUserCount()
    }

    updateOnlineUserCount() {
        const onlineUserCount = this.connectedClients.size
        this.server.emit('ONLINE_USERS_COUNT', onlineUserCount)
        console.log("emit ONLINE_USERS_COUNT", onlineUserCount)
    }

    sendBillNotification(bill: Bill) {
        this.server.emit('BILL_NOTIFICATION', bill)
        console.log("emit notification")
    }
}
