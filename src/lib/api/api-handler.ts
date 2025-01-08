/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosResponse } from 'axios';

import { getToken } from '../utils/token-handling';

// Typ für Request-Header
declare type Headers = {
    'Content-Type': string;
    Authorization?: string;
    'Cache-Control'?: string;
    Pragma?: string;
    Expires?: string;
};

/**
 * Funktion um eine GET-Request an das Backend abzuschicken.
 * 
 * @param url URL and die Request gesendet wird
 * @param successCallback Funktion die ausgeführt wird falls Request erfolgreich ist
 * @param errorCallback  Funktion die ausgeführt wird falls Request fehlschlägt
 * @param headerModifiers Modifikatoren aus denen Header erstellt wird
 */
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


/**
 * Funktion um eine POST-Request an das Backend abzuschicken.
 * 
 * @param url URL and die Request gesendet wird
 * @param successCallback Funktion die ausgeführt wird falls Request erfolgreich ist
 * @param errorCallback  Funktion die ausgeführt wird falls Request fehlschlägt
 * @param headerModifiers Modifikatoren aus denen Header erstellt wird
 */
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


/**
 * Funktion um eine DELETE-Request an das Backend abzuschicken.
 * 
 * @param url URL and die Request gesendet wird
 * @param successCallback Funktion die ausgeführt wird falls Request erfolgreich ist
 * @param errorCallback  Funktion die ausgeführt wird falls Request fehlschlägt
 * @param headerModifiers Modifikatoren aus denen Header erstellt wird
 */
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

// Abstrakte Funktion für Requests. Nimmt ein Promise entgegen, führt anschließend Callback Funktionen aus
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
                errorCallback(error.response);
            } else {
                console.error('Error', error.message);
            }
        });
}

// Erstellt Request-Header aus Headermodifikatoren
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
