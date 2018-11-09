import { existsSync } from 'fs-extra';
import { join } from 'path';

export const dotenvPathLoader = () => {
    const envPath = join('./.env');
    const envSamplePath = join('./.env.example');
    if (existsSync(envPath)) return envPath
    else if (existsSync(envSamplePath)) return envSamplePath
    else throw Error('No .env file found');
}