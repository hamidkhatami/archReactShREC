import React from 'react';
import { Typography, Alert, List, ListItem, Paper, Box, Tooltip } from '@mui/material';
import StatusIcon from '@/components/StatusImage';
import { t } from "i18next";

import { useDashboardsQuery } from '@/hooks/useDashboardsQuery';


const index: React.FC = () => {

  const { data } = useDashboardsQuery();

  if (!data || data.length === 0) {
    return (
      <Alert severity="warning" dir="rtl">
        {t("alert.noData")}
      </Alert>
    );
  }

  return (
    <Paper elevation={1} sx={{ mt: 1, p: 1 }}>
      <List >
        {data.map((result) => (
          <ListItem key={result.processDate} divider>
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
                <Tooltip title={result.enFileName} arrow>

                  <Typography variant="grifTypo">
                    {result.faFileName}
                  </Typography>
                </Tooltip>

                <Typography variant="grifTypo">
                  {t('labels.status')} : 
                  <StatusIcon status={result.processStatus} />
                </Typography>
                <Typography variant="grifTypo">
                  {t('labels.user')} :
                   {result.user}
                </Typography>

                <Typography variant="grifTypo">
                  {t("labels.selectedDate")} :
                  <Box component="span" sx={{ ml: 1 }}>
                    {result.processDate}
                  </Box>
                </Typography>

                <Typography variant="grifTypo">
                  {t("labels.error")} :
                  <Box component="span" sx={{ ml: 1 }}>
                    {result.processDate}
                  </Box>
                </Typography>

              </Box>
            </Box>
          </ListItem>

        ))}
      </List>
    </Paper>
  );
};

export default index;