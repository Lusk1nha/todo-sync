import { useAtom } from "jotai";
import { useEffect } from "react";
import { sidebarAtom } from "../atoms";

export const useSidebar = () => {
  const [open, setOpen] = useAtom<boolean>(sidebarAtom);

  useEffect(() => {
    localStorage.setItem("todo-sync:is-sidebar-open", String(open));
  }, [open]);

  return {
    open,
    setOpen,
  };
};
