/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosResponse } from 'axios';

import { getToken } from '../token-handling';

declare type Headers = {
    'Content-Type': string;
    Authorization?: string;
    'Cache-Control'?: string;
    Pragma?: string;
    Expires?: string;
};

export function apiGet(
    url: string,
    successCallback: any,
    errorCallback: any,
    headerModifiers?: {
        noCache: boolean;
        token: boolean;
        contentType?: string;
    },
) {
    apiFunction(
        axios.get(url, { headers: getHeaders(headerModifiers) }),
        successCallback,
        errorCallback,
    );
}

export function apiPost(
    url: string,
    body: any,
    successCallback: any,
    errorCallback: any,
    headerModifiers?: {
        noCache: boolean;
        token: boolean;
        contentType?: string;
    },
) {
    apiFunction(
        axios.post(url, body, { headers: getHeaders(headerModifiers) }),
        successCallback,
        errorCallback,
    );
}

export function apiDelete(
    url: string,
    successCallback: any,
    errorCallback: any,
    headerModifiers?: {
        noCache: boolean;
        token: boolean;
        contentType?: string;
    },
) {
    apiFunction(
        axios.delete(url, { headers: getHeaders(headerModifiers) }),
        successCallback,
        errorCallback,
    );
}

function apiFunction(
    axiosPromise: Promise<AxiosResponse<any, any>>,
    successCallback: any,
    errorCallback: any,
) {
    axiosPromise
        .then((response) => {
            console.log(response);
            successCallback(response);
        })
        .catch((error) => {
            if (error.response) {
                errorCallback(error.response.status);
            } else {
                console.error('Error', error.message);
            }
        });
}

// 'If-Match': `"0"`, // Header für Optimistic Locking

function getHeaders(headerModifiers?: {
    noCache: boolean;
    token: boolean;
    contentType?: string;
}) {
    const headers = {
        'Content-Type': headerModifiers?.contentType ?? 'application/json',
    } as Headers;

    if (headerModifiers?.token) {
        headers.Authorization = `Bearer ${getToken()}`;
    }

    if (headerModifiers?.noCache) {
        headers['Cache-Control'] = 'no-cache, no-store';
        headers.Pragma = 'no-cache';
        headers.Expires = '0';
    }

    return headers;
}
