import { ContactForm } from "@/components/sections/ContactForm";

/**
 * __preview/contact-form — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/contact-form.png (938×695).
 * preview wrapper 938×695 (baseline과 동일 해상도).
 */
export function ContactFormPreview() {
  return (
    <div className="w-[938px] h-[695px] mx-auto bg-white">
      <ContactForm />
    </div>
  );
}
