import { NextApiRequest } from 'next';

export function propToParam<T>(
  param: T,
  key: keyof T,
  defaultValue?: string
): string {
  return param[key]
    ? `${key.toString()}=${param[key]}&`
    : defaultValue
    ? defaultValue + '&'
    : '';
}

export function getBaseUrl(req?: NextApiRequest): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  } else if (req?.headers) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:3000';
    return `${protocol}://${host}`;
  }
  return 'http://localhost:3000';
}
