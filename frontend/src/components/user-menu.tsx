import { useAtom } from "jotai";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { profileAtom } from "@/shared/atoms";
import { Separator } from "./ui/separator";

import { LogoutButton } from "./buttons/logout-button";
import { UserSettingsButton } from "./buttons/user-settings-button";

export function UserMenu() {
  const [profile] = useAtom(profileAtom);

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="w-8 md:w-10 h-8 md:h-10 border border-solid border-accent hover:border-primary transition-colors">
          <AvatarImage
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/1?v=4"
            alt="User"
          />
          <AvatarFallback>{profile?.username}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-52 flex flex-col gap-2">
        <div>
          <h2 className="text-base">Perfil</h2>
          <p className="text-xs text-primary">Ver e editar perfil de usuário</p>
        </div>

        <Separator />

        <UserSettingsButton
          strings={{ text: "Editar perfil" }}
          className="w-full"
        />
        <LogoutButton strings={{ text: "Desconectar" }} />
      </PopoverContent>
    </Popover>
  );
}
