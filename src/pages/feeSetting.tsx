import { Box, Button, List, ListItem, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { FeeSetting as Setting } from "@/types/inteface";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';



const FeeSetting: React.FC = () => {
    const [issuerer, setIsuerer] = useState<number>(0);
    const [acquirer, setAcquirer] = useState<number>(0);
    const [shetab, setShetab] = useState<number>(0);
    const[bankDestinition,setBankDesination]=useState<number>(0);


    const click = (e: Setting) => {
        debugger
        setIsuerer(e.issuer);
        alert("a")



    }

alert("1")
    const data: Setting[] = [
        { id: 1, transactionType: "اعلام مانه کارت", terminalType: "خودپرداز کیوسک", acquirer: 950, shetab: 600, issuer: 1000, bankDes: 200 },
        { id: 2, transactionType: "اعلام مانده کارت و صورتحساب 10 گردش آخر", terminalType: "پایانه شعب PINPAD", acquirer: 2450, shetab: 500, issuer: 0, bankDes: 300 },
        { id: 3, transactionType: "انتقال وجه شتابی کارت به کارت/انتقال وجه کارت به شبا(سحاب)", terminalType: "غیر پرداخت سازی", acquirer: 5500, shetab: 1600, issuer: 100, bankDes: 1200 },
        { id: 4, transactionType: "اعلام 10 گردش آخر کارت(شتابی)", terminalType: "خودپرداز کیوسک و درگاه های ارائه خدمات مدرن", acquirer: 1240, shetab: 60, issuer: 300, bankDes: 1200 },
        { id: 5, transactionType: "دریافت وجه نقد", terminalType: "پایانه شعب", acquirer: 15100, shetab: 6000, issuer: 1300, bankDes: 2000 },
        { id: 6, transactionType: "دریافت وجه نقد خئدپرداز(بین بانکی)", terminalType: "پایانه شعب", acquirer: 950, shetab: 99, issuer: 1300, bankDes: 300 },
    ]

    return (
        <>
            <Paper elevation={1} sx={{ mt: 1 }}>
                <List >
                    {data.map((result) => (
                        <ListItem key={result.id} divider >
                            <Box
                                sx={(theme) => ({
                                    width: theme.layout.infoContainer.width,
                                })}
                            >
                                <Box
                                    sx={(theme) => ({
                                        display: "flex",
                                        gap: theme.spacing(theme.layout.infoRow.gap),
                                        mt: theme.layout.infoRow.marginTop,
                                        flexWrap: theme.layout.infoRow.wrap ? "wrap" : "nowrap",
                                    })}
                                >
                                    <Tooltip title={result.transactionType} arrow>
                                        <Typography >
                                            {t("labels.transactionType") + " : "}
                                            {result.transactionType} {result.terminalType + " | "}
                                        </Typography>
                                    </Tooltip>
                                    <Tooltip title={result.acquirer} arrow>
                                        <Typography variant="body1">
                                            {t("labels.acquirer") + " : "}
                                            {result.acquirer + " | "}
                                        </Typography>
                                    </Tooltip>

                                    <Tooltip title={result.shetab} arrow>
                                        <Typography variant="caption">
                                            {t("labels.shetab") + " : "}
                                            {result.shetab + " | "}
                                        </Typography>
                                    </Tooltip>

                                    <Tooltip title={result.issuer} arrow>
                                        <Typography variant="caption">
                                            {t("labels.issuer") + " : "}
                                            {result.issuer + " | "}
                                        </Typography>
                                    </Tooltip>

                                    <Tooltip title={result.bankDes} arrow>
                                        <Typography variant="grifTypo">
                                            {t("labels.bankDes") + " : "}
                                            {result.bankDes}
                                        </Typography>
                                    </Tooltip>
                                    {/* <Button onClick={() => click(result)} size="small">
                                        <EditIcon > </EditIcon>
                                    </Button> */}
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box sx={{ mt: 3, p: 1, display: "flex", alignItems: "center", gap: 2 }} >

                <TextField
                    size="small"
                    label={t("labels.acquirer")}
                    value={issuerer?? 0}
                    // defaultValue={"defaultValue"} 
                    disabled={!issuerer}
                    required />

                <TextField
                    size="small"
                    label={t("labels.shetab")}
                    value={shetab}
                    // defaultValue={"defaultValue"} 
                    required />

                <TextField
                    size="small"
                    label={t("labels.issuer")}
                    value={issuerer}
                    // defaultValue={"defaultValue"}  
                    required/>

                <TextField
                    size="small"
                    label={t("labels.bankDes")}
                    value={bankDestinition}
                    // defaultValue={"defaultValue"}  
                    required/>
                <Button size="small" >
                    <SaveIcon />
                </Button>

            </Box>
        </>
    );

}
export default FeeSetting;