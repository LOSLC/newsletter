import * as React from "react";

type Props = {
  verificationUrl: string;
  firstName?: string | null;
};

export default function EmailVerification({
  verificationUrl,
  firstName,
}: Props) {
  const greeting =
    firstName && firstName.trim().length > 0 ? `Hi ${firstName},` : "Hi,";

  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#f7f7f8",
          color: "#0a0a0a",
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          style={{ backgroundColor: "#f7f7f8", padding: "24px 0" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  width={560}
                  cellPadding={0}
                  cellSpacing={0}
                  role="presentation"
                  style={{
                    width: "100%",
                    maxWidth: 560,
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: 24,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <div style={{ fontSize: 18, fontWeight: 700 }}>
                          LOSL‑C Newsletter
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: 24 }}>
                        <p
                          style={{
                            margin: "0 0 12px",
                            fontSize: 14,
                            lineHeight: "22px",
                          }}
                        >
                          {greeting}
                        </p>
                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: 14,
                            lineHeight: "22px",
                          }}
                        >
                          Thanks for subscribing! Please confirm your email
                          address to start receiving updates tailored to your
                          interests.
                        </p>
                        <div style={{ textAlign: "center", margin: "24px 0" }}>
                          <a
                            href={verificationUrl}
                            style={{
                              display: "inline-block",
                              backgroundColor: "#111827",
                              color: "#ffffff",
                              padding: "12px 18px",
                              borderRadius: 8,
                              fontSize: 14,
                              fontWeight: 600,
                              textDecoration: "none",
                            }}
                          >
                            Verify email
                          </a>
                        </div>
                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: 12,
                            lineHeight: "20px",
                            color: "#6b7280",
                          }}
                        >
                          If the button doesn&apos;t work, copy and paste this URL
                          into your browser:
                        </p>
                        <p
                          style={{
                            margin: 0,
                            wordBreak: "break-all",
                            fontSize: 12,
                            lineHeight: "20px",
                          }}
                        >
                          <a
                            href={verificationUrl}
                            style={{
                              color: "#111827",
                              textDecoration: "underline",
                            }}
                          >
                            {verificationUrl}
                          </a>
                        </p>
                        <hr
                          style={{
                            border: 0,
                            borderTop: "1px solid #f3f4f6",
                            margin: "24px 0",
                          }}
                        />
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12,
                            lineHeight: "20px",
                            color: "#6b7280",
                          }}
                        >
                          If you didn&apos;t request this, you can safely ignore this
                          email.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style={{ margin: 16, fontSize: 12, color: "#6b7280" }}>
                  © {new Date().getFullYear()} LOSL‑C. All rights reserved.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
