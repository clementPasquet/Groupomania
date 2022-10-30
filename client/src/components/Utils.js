export function addBackendUrl(postImage) {
  return `${process.env.REACT_APP_API_URL}${postImage}`;
}
