import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const statusCode = exception.getStatus();
        const message = exception.message
        const error = exception.name

        response
            .status(statusCode)
            .json({
                statusCode,
                timestamp: new Date().toISOString(),
                path: request.url,
                message,
                error
            });
    }
}