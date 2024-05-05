export const sortObject = (obj: any) => {
    return Object.keys(obj).sort().reduce((result: any, key) => {
        result[key] = obj[key];
        return result;
    }, {});
}

export function resolveUrlString(host: string, path: string): string {
    host = host.trim();
    path = path.trim();
    while (host.endsWith('/') || host.endsWith('\\')) {
        host = host.slice(0, -1);
    }
    while (path.startsWith('/') || path.startsWith('\\')) {
        path = path.slice(1);
    }
    return `${host}/${path}`;
}
