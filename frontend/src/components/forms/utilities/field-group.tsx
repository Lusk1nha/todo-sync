interface IFieldGroupProps {
  children: React.ReactNode;
}

export function FieldGroup(props: Readonly<IFieldGroupProps>) {
  const { children } = props;

  return <fieldset className="flex flex-col gap-y-6">{children}</fieldset>;
}
