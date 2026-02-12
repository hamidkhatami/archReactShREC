import { createTheme } from "@mui/material/styles";
import "@/assets/fonts/fonts.css";

/* =======================
   Typography variants
======================= */
declare module "@mui/material/styles" {
  interface TypographyVariants {
    headerTitle: React.CSSProperties;
    grifTypo: React.CSSProperties;
    menuItem: React.CSSProperties;
    login: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    headerTitle?: React.CSSProperties;
    grifTypo?: React.CSSProperties;
    menuItem?: React.CSSProperties;
    login?: React.CSSProperties;
  }

  /* =======================
     Custom layout (FIX)
  ======================= */
  interface Theme {
    layout: {
      infoContainer: {
        width: string;
      };
      infoRow: {
        gap: number;
        marginTop: number;
        wrap: boolean;
      };
      successStatus: {
        color: string;
        fontSize: string;
      };
    };
  }

  interface ThemeOptions {
    layout?: {
      infoContainer?: {
        width?: string;
      };
      infoRow?: {
        gap?: number;
        marginTop?: number;
        wrap?: boolean;
      };
      successStatus?: {
        color?: string;
        fontSize?: string;
      };
    };
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    headerTitle: true;
    grifTypo: true;
    menuItem: true;
    login: true;
  }
}

/* =======================
   Theme
======================= */
const theme = createTheme({
  direction: "rtl",

  typography: {
    fontFamily: "'IranSans', sans-serif",

    headerTitle: {
      fontSize: "1.5rem",
      color: "white",
      textAlign: "center",
      fontFamily: "'IranSans', sans-serif",
      flex: 1,
    },

    grifTypo: {
      fontSize: "0.95rem",
      fontWeight: 600,
      color: "#1a1a1a",
      whiteSpace: "nowrap",
      display: "inline-flex",
      alignItems: "center",
      marginLeft: 10,
      marginRight: 10,
    },

    menuItem: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "#1a1a1a",
      whiteSpace: "nowrap",
    },

    login: {
      fontWeight: "bold",
      textAlign: "center",
      alignItems: "center",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          height: "100%",
          fontFamily: "'Shabnam', sans-serif",
          fontSize: "0.95rem",
          fontWeight: 550,
          borderRadius: 8,
        },
      },
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "'Shabnam', sans-serif",
        },
        shrink: {
          fontSize: "1rem",
          fontWeight: 800,
        },
      },
    },
  },

  /* =======================
     Layout (SAFE)
  ======================= */
  layout: {
    infoContainer: {
      width: "100%",
    },
    infoRow: {
      gap: 2,
      marginTop: 0.5,
      wrap: true,
    },
    successStatus: {
      color: "warning",
      fontSize: "small",
    },
  },
});

export default theme;
