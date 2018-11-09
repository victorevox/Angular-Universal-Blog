import * as EmailTemplate from 'email-templates';
import { dotenvPathLoader } from '@server/utils/helpers';
import { config as dotEnvConfig } from 'dotenv'
dotEnvConfig({ path: dotenvPathLoader() })

const transport = {
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    secure: true,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
};

export const emailSender = new EmailTemplate({
    message: {
        from: process.env.MAIL_FROM
    },
    preview: false,
    send: true,
    transport,
    views: {
        root: './server/emails',
        options: {
            extension: 'handlebars' // <---- HERE
        }
    }
});