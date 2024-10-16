export const ColorToast = ({ color }: { color: string }) => (
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
);
