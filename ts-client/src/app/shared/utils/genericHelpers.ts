import { globalConstants } from '../constants/globalConstants';

const getFileExtension = (file: string): string | undefined => {
    if (validString(file)) {
        return file?.split('.')?.pop()?.toLowerCase();
    }

    return undefined;
};

const validString = (value: unknown): boolean => {
    if (value === undefined || value === null) {
        return false;
    }

    return typeof value === 'string' && value.length >= 0;
};

const isNullOrUndefined = (object: unknown): boolean => {
    return typeof object === 'undefined' || object === null;
};

const sleep = (delay = 0): Promise<unknown> => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const genericHelpers = {
    camelToSnakeCase,
    getFileExtension,
    isNullOrUndefined,
    sleep,
    validString,
};
