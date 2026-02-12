import "@mui/material/styles";

declare module "@mui/material/styles" {
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
                color: string;
                fontSize: string;
            }
        };
        
    }
}
