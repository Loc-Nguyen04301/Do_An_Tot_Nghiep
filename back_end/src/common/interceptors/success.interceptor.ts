import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
    constructor(private readonly customMessage: string = 'Success') { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse<Response>();

        return next.handle().pipe(
            map(data => {
                const statusCode = response.statusCode;
                const message = this.customMessage;
                return { statusCode, data, message };
            }),
        );
    }
}
