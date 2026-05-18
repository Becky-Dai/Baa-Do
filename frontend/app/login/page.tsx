/**
 * 中文：Mock 登录/注册页面，Web Preview 阶段不接真实后端，点击即跳转。
 * English: Mock login/register page for Web Preview — no real auth, clicks redirect directly.
 */
import LoginPage from '../../components/auth/LoginPage';

export default function Login() {
  return <LoginPage />;
}
