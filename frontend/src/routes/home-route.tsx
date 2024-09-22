import { profileAtom } from "@/shared/atoms";
import { useAtom } from "jotai";

export default function HomeRoute() {
  const [profile] = useAtom(profileAtom);

  return (
    <div className="text-xl font-medium py-6">
      <div>
        <h2 className="text-muted-foreground">
          Bem vindo de volta! <span>{profile?.username}</span>
        </h2>
      </div>
    </div>
  );
}
