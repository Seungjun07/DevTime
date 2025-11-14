export default function Button({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-disabled-200 text-disabled-400 cursor-pointer rounded px-4 py-3 text-[14px] leading-[18px] font-semibold"
    >
      중복 확인
    </button>
  );
}
