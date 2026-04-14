/**
 * FormInput — 라벨 + input/textarea 조합. ContactForm 섹션 로컬 (4회 사용).
 * research/contact-form.md §2.5 기반.
 */
type Props = {
  label: string;
  placeholder: string;
  type?: "text" | "tel" | "email";
  multiline?: boolean;
  rows?: number;
};

export function FormInput({
  label,
  placeholder,
  type = "text",
  multiline = false,
  rows = 3,
}: Props) {
  const inputId = `ci-${label}`;
  const wrapperCls =
    "bg-[#f3f4f5] border-[1.25px] border-solid border-[#f3f4f5] rounded-[12px] " +
    "px-[16px] py-[12px] w-full flex items-center gap-[8px] overflow-hidden";
  const fieldCls =
    "flex-1 bg-transparent border-0 outline-none font-normal text-[15px] leading-[22px] " +
    "tracking-[-0.375px] text-[#687685] placeholder:text-[#687685] resize-none";

  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <label
        htmlFor={inputId}
        className="font-normal text-[14px] leading-[20px] tracking-[-0.35px] text-[#313c4c] whitespace-nowrap"
      >
        {label}
      </label>
      <div className={wrapperCls} style={multiline ? undefined : { height: 48 }}>
        {multiline ? (
          <textarea
            id={inputId}
            placeholder={placeholder}
            rows={rows}
            className={fieldCls}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            placeholder={placeholder}
            className={fieldCls}
          />
        )}
      </div>
    </div>
  );
}
