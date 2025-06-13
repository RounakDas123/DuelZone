export const fetchClient = async (url, method = 'GET', body = null) => {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${url}`, config);

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Something went wrong');

  return data;
};
