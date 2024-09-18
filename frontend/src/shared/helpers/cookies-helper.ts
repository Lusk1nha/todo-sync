export function getTokenAuthorization(): string {
  const cookies = document.cookie;
  const user = cookies.split("=")[1];

  return user;
}
