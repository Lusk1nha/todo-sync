export function getRedirectPath(
  pathname: string,
  searchParamsFn: URLSearchParams
): URLSearchParams {
  searchParamsFn.set("redirect", pathname);
  return searchParamsFn;
}
