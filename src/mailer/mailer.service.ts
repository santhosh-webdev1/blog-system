
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService{

    private transporter : nodemailer.Transporter;

    constructor(private config : ConfigService){
        this.transporter = nodemailer.createTransport({
            host : this.config.get<string>('MAIL_HOST'),
            port : this.config.get<number>('MAIL_PORT'),
            auth : {
               user : this.config.get<string>('MAIL_USER'),
               pass : this.config.get<string>('MAIL_PASS'),
            }
        })
    }

    // mailer function to for Activation Link
    async sentActivationLink(to : string, token : string){

        const url = `${this.config.get('FRONTEND_URL')}/set-password` +
            `?email=${encodeURIComponent(to)}` +
            `&token=${encodeURIComponent(token)}`;

        return this.transporter.sendMail({
            from : this.config.get('MAIL_FROM'),
            to : to,
            subject : 'Set your password to activate account',
            html : `<p> Click below to set your password (expires in 1 hour):</p>
                    <a href=${url}>${url}</a>`,
        });
    }


    async sendTestMail(to : string){
        const info = await this.transporter.sendMail({
            from : this.config.get<string>('MAIL_FROM'),
            to,
            subject : 'Hello from nest js',
            text : ' this is the test mail for nodemailer service',
        });
        console.log('Message sent : %s', info.messageId);
        return info;        
    }
}