import { ContactForm } from "@/components/sections/ContactForm";

/**
 * Isolated preview route for visual regression testing (contact-form).
 * No Header/Footer — matches baseline PNG (pure section only).
 * Wrapper 938×695로 baseline과 해상도 일치 (1px 차이는 Framelink 여백, research §7).
 * bg-white wrapper ensures alpha=0 areas match Framelink baseline.
 */
export function ContactFormPreview() {
  return (
    <div className="w-[938px] mx-auto bg-white">
      <ContactForm />
    </div>
  );
}
