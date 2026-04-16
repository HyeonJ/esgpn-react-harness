/**
 * FormInput — contact-form 섹션 로컬 입력 필드.
 *
 * Figma 노드 `134:3721~134:3724` (Text Field_Label instance) 시각 재현.
 * - 라벨 14/20/-0.35 #313c4c (gray-800)
 * - wrapper: bg #f3f4f5 + 1.25px solid border #f3f4f5 + rounded-12 + 16/12 padding
 * - input/textarea: 15/22/-0.375 #687685 (gray-600), bg transparent, border 0
 * - multiline: textarea (rows prop)
 *
 * 접근성: `<label htmlFor>` + `<input id>` 연결 (G5 jsx-a11y PASS 조건).
 * 정적 구현 — onChange/value 없음, placeholder만 표시 (polymorphic uncontrolled).
 */

type FormInputProps = {
  label: string;
  placeholder: string;
  name: string;
  type?: "text" | "tel" | "email";
  multiline?: boolean;
  rows?: number;
  required?: boolean;
};

export function FormInput({
  label,
  placeholder,
  name,
  type = "text",
  multiline = false,
  rows = 3,
  required = false,
}: FormInputProps) {
  const inputId = `contact-${name}`;
  const wrapperCls =
    "bg-[#f3f4f5] border-[1.25px] border-solid border-[#f3f4f5] rounded-[12px] " +
    "px-[16px] py-[12px] w-full flex items-center gap-[8px] overflow-hidden";
  const fieldCls =
    "flex-1 bg-transparent border-0 outline-none font-normal text-[15px] leading-[22px] " +
    "tracking-[-0.375px] text-[#687685] placeholder:text-[#687685] resize-none " +
    "font-[var(--font-family-pretendard)]";

  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <label
        htmlFor={inputId}
        className="font-normal text-[14px] leading-[20px] tracking-[-0.35px] text-[#313c4c] whitespace-nowrap"
        style={{ fontFamily: "var(--font-family-pretendard)" }}
      >
        {label}
      </label>
      <div
        className={wrapperCls}
        style={multiline ? undefined : { height: 48 }}
      >
        {multiline ? (
          <textarea
            id={inputId}
            name={name}
            placeholder={placeholder}
            rows={rows}
            required={required}
            className={fieldCls}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className={fieldCls}
          />
        )}
      </div>
    </div>
  );
}
