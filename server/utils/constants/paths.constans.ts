import { join, resolve } from 'path';

export const CWD = resolve(process.cwd());
export const DIST_FOLDER = join(CWD, 'dist');
export const STORAGE_FOLDER = join(CWD, 'storage')
export const IMAGES_FOLDER = join(STORAGE_FOLDER, 'images');
