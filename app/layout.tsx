"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import store from "../store/store";
import theme from "../theme/theme";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <html>
    <body>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="xs">{children}</Container>
        </ThemeProvider>
      </Provider>
    </body>
  </html>
);

export default Layout;
