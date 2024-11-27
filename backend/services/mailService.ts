import nodemailer, { Transporter } from 'nodemailer'

class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru', // почтовый сервер Яндекса
            port: 465, // порт для STARTTLS
            secure: true, // для STARTTLS secure должен быть false
            auth: {
                user: 'ZxcGhoul.123@yandex.ru', // ваш SMTP-пользователь
                pass: 'czdrcskipuhysaom'  // ваш пароль
            },
        })
    }

    public async sendActivationMail(to: string, link: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: 'ZxcGhoul.123@yandex.ru',
                to,
                subject: 'Активация аккаунта DealLine',
                text: '',
                html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href='${link}'>${link}</a>
                    </div>
                `
            });
        } catch (error) {
            console.error("Ошибка отправки письма:", error);
            throw new Error('Ошибка при отправке письма');
        }
    }
}

export default new MailService()