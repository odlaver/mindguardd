type CharacterCountProps = {
  max: number;
  min?: number;
  optional?: boolean;
  value: string;
};

export function CharacterCount({
  max,
  min,
  optional = false,
  value,
}: CharacterCountProps) {
  const count = value.trim().length;
  const isTooShort = !optional && typeof min === "number" && count < min;
  const isOptionalTooShort = optional && count > 0 && typeof min === "number" && count < min;
  const isTooLong = count > max;
  const tone = isTooLong || isTooShort || isOptionalTooShort ? "text-danger" : "text-ink-soft";

  return (
    <p className={`text-xs font-medium ${tone}`}>
      {count}/{max} karakter
      {typeof min === "number" ? `, minimal ${min}` : ""}
      {optional ? " jika diisi" : ""}
    </p>
  );
}
