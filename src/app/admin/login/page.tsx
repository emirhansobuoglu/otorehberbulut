import { getCurrentUser } from "@/app/actions/getuser";
import LoginClient from "@/components/auth/login-client";

export default async function Login() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <LoginClient currentUser={currentUser} />
    </div>
  );
}
