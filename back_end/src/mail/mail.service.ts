import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { HTML_TEMPLATE_CREATE, HTML_TEMPLATE_NEWPASSWORD, HTML_TEMPLATE_REJECT } from 'src/utils';
@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.APP_GOOGLE_PASSWORD,
            },
        });
    }

    async sendMailCreateBill({ to, subject, bill_id, customer_name }: { to: string, subject: string, bill_id: number, customer_name: string }) {
        const mailOptions: MailOptions = {
            from: 'nguyengialoc7@gmail.com',
            to,
            subject,
            html: HTML_TEMPLATE_CREATE(bill_id, customer_name),
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    }

    async sendMailRejectBill({ to, subject, bill_id, customer_name }: { to: string, subject: string, bill_id: number, customer_name: string }) {
        const mailOptions: MailOptions = {
            from: process.env.SENDER_EMAIL,
            to,
            subject,
            html: HTML_TEMPLATE_REJECT(bill_id, customer_name),
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    }

    async sendNewPassword({ to, subject, new_password }: { to: string, subject: string, new_password: string }) {
        const mailOptions: MailOptions = {
            from: process.env.SENDER_EMAIL,
            to,
            subject,
            html: HTML_TEMPLATE_NEWPASSWORD(new_password),
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    }
}