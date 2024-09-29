import { UserMenu } from "@/components/menus/user-menu";

export default function HomeRoute() {
  return (
    <div className="text-xl font-medium">
      <div className="w-full bg-background h-24 border-separate border-border border-b flex items-center justify-between px-6">
        <div>
          <h4 className="text-foreground text-2xl">Platform Launch</h4>
        </div>

        <UserMenu />
      </div>
    </div>
  );
}
