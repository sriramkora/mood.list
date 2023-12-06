import { redirect } from 'react-router-dom';

export function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('scope');
  localStorage.removeItem('refresh_token');
  return redirect('/auth');
}