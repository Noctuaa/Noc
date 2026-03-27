export const encodedEmail = (str: string) =>
  str.split('').map((c: string) => `&#${c.charCodeAt(0)};`).join(''); // prettier-ignore


export const encodedMailto = (str: string) =>
  `mailto:${str}`.split('').map((c: string) => `&#${c.charCodeAt(0)};`).join(''); // prettier-ignore