import { UsersProfilesService } from "../services/users-profiles-service";
import { UserProfile } from "../factories/user-profile-factory";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

interface IUseCurrentUser {
  currentUser: UserProfile | null | undefined;
  refetch: () => void;
  isFetching: boolean;
}

export const useCurrentUser = (): IUseCurrentUser => {
  const { getCurrentUser } = new UsersProfilesService();
  const { toast } = useToast();

  const {
    data: currentUser,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchUser,
    initialData: null,
  });

  async function fetchUser() {
    try {
      const user: UserProfile | null = await getCurrentUser();
      return user;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast({
          title: "Erro ao buscar usuário",
          description: error?.message,
          variant: "destructive",
        });
      }
    }
  }

  return { currentUser, refetch, isFetching };
};
