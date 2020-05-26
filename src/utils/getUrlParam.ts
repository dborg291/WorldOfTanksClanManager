export function getUrlParam(url: URLSearchParams, name: string): string {
    const value: string | null = url.get(name);
    if (value) {
        return value;
    }
    throw Error('Param not found in url');
}
