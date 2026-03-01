'use client';

import Header from "@/app/layout/Header";
import GlobalStyles from "@/app/styles/globalStyles";
import {ThemeProvider} from "styled-components";
import {theme} from "@/app/styles/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '250px 1fr',
              maxWidth: '100%',
              background: theme.colors.background
            }}
          >
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
