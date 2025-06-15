import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

const query = `
{
  posts {
    id
    title
    content
    author {
      name
      email
    }
  }
}`;

export default function () {
  const url = 'http://localhost:4000/graphql';
  const payload = JSON.stringify({ query });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  sleep(1);
}