export const sanitize = (str: string) =>
  str
    .replace(/[^a-zA-Z0-9-_\.]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^-/, 'a-')
    .replace(/^\d/, 'a$&')
    .trim();
