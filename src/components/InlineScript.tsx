/**
 * Inline <script> that runs before React hydrates (Next's "Preventing flash
 * before hydration" pattern). The type switch avoids React's dev warning
 * about rendering <script> tags on the client.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
