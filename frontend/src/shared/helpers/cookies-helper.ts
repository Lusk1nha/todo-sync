export function getTokenAuthorization(): string {
  const cookies = document.cookie;
  const user = cookies.split("=")[1];

  return user;
}

export async function clearTokenAuthorization(): Promise<void> {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
