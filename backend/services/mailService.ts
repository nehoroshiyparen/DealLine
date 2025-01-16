import nodemailer, { Transporter } from 'nodemailer'

class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'ivankuzin616@gmail.com', // ваш SMTP-пользователь
                pass: 'ycia gnuy kjbz jkuy '  // ваш пароль
            },
        })
    }

    public async sendActivationMail(to: string, link: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: 'ivankuzin616@gmail.com',
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