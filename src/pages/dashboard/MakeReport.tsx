import JalaliDatePicker from "@/components/JalaliDatePicker";
import Alert from "@mui/material/Alert";
import { useRepResult } from "@/hooks/useRepResualt";
import { useRepParamStore } from "@/store/repDateParamStore";
import { JalaliDateObject } from "@/utilities/date/JalaliDateObject";
import { toEnglishDigits } from "@/utilities/date/utility";
import { Box, Button, Grid } from "@mui/material";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";


const MakeReport: React.FC = () => {
  const { setProcessDate } = useRepParamStore();
  const [errorCode, setErrorCode] = useState<string>()
  const mutation = useRepResult();
  const [valid, setValid] = useState<boolean>(true);
  const DASHBOARD_PATH = "/dashboard";


  const defaultDate = useMemo(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new DateObject({
      date: yesterday,
      format: "YYYY/MM/DD",
      calendar: persian,
      locale: persian_fa,
    });
  }, []);


  const [alert, setAlert] = useState<
    { severity: "success" | "error" } | null
  >(null);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    if (!valid) return;
    mutation.mutate(
      { processDate: toEnglishDigits(useRepParamStore.getState().processDate) },
      {
        onSuccess: () => {
          setAlert({ severity: "success" });
        },
        onError: (error) => {
          setAlert({ severity: "error" });

          setErrorCode(error?.response?.data.SERVER_ERROR)
        },
      }
    );
  };

  const handleChange = (jdate: JalaliDateObject) => {

    mutation.reset();
    setProcessDate(jdate.formatted);
    setAlert(null);
  };

  const onError = (err: boolean) => {
    setValid(err);
  };

  const renderAlert = () => {
    if (!alert) return null;

    if (alert.severity === "success") {
      return (
        <Alert severity="success" sx={{ mt: 2 }}>
          <Trans
            i18nKey="success.makeReport"
            values={{ address: t("menus.dashboard") }}
            components={[
              <span key="0" />,
              <Link
                key="address"
                to={DASHBOARD_PATH}
                style={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  textDecoration: "underline",
                }}
              />,
            ]}
          />
        </Alert>
      );
    }

    if (alert.severity === "error") {
      return (
        <Alert severity="error" sx={{ mt: 2 }}>
          {t(`errors.${errorCode}`)}
        </Alert>
      );
    }

    return null;
  };


  return (
    <Box component="form" onSubmit={handleSubmit} dir="rtl">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <JalaliDatePicker
            label={t("labels.reportDate")}
            onChange={handleChange}
            onError={onError}
            defaultValue={defaultDate}
          />
        </Grid>

        <Grid item xs={2}>
          <Button
            type="submit"
            disabled={mutation.isPending || !valid}

          >
            {mutation.isPending
              ? t("buttons.processing")
              : t("buttons.process")}
          </Button>
        </Grid>
      </Grid>

      {renderAlert()}

    </Box>
  );
};

export default MakeReport;
