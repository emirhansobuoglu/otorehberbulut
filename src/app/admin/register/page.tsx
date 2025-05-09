import { getCurrentUser } from "@/app/actions/getuser";
import RegisterClient from "@/components/auth/register-client";

export default async function Register() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <RegisterClient currentUser={currentUser} />
    </div>
  );
}
