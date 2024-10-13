import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";

interface IColorButtonProps {
  color: string;
}

export function ColorButton(props: Readonly<IColorButtonProps>) {
  const { color } = props;

  const { toast } = useToast();

  function onCopyColor() {
    toast({
      title: "Cor copiada",
      variant: "default",
      description: (
        <p>
          Cor{" "}
          <span
            style={{
              color: color,
            }}
          >
            {color}
          </span>{" "}
          copiada para área de transferência
        </p>
      ),
    });

    navigator.clipboard.writeText(color);
  }

  return (
    <Badge
      className="min-w-[72px] w-[72px] cursor-pointer"
      variant="outline"
      style={{ color: color }}
      onClick={onCopyColor}
    >
      {color}
    </Badge>
  );
}
