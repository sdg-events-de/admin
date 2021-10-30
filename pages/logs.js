import Link from "next/link";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import TimeAgo from "react-timeago";
import { Check, TimerSand } from "mdi-material-ui";
import AppLayout from "layouts/AppLayout";
import { logUrl } from "helpers/routing";

const COLUMNS = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", flex: 2 },
  {
    field: "created_at",
    headerName: "Date",
    width: 150,
    renderCell: function TimeAgoCell({ value }) {
      return <TimeAgo date={value} />;
    },
  },
  { field: "levelname", headerName: "Status", width: 120 },
  {
    field: "is_completed",
    headerName: "Done?",
    width: 120,
    type: "boolean",
    renderCell: function IsDoneCell({ value }) {
      return value === true ? <Check /> : <TimerSand />;
    },
  },
  {
    field: "Actions",
    headerName: "",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: function ActionCell({ row }) {
      return (
        <Link href={logUrl({ id: row.id })} passHref>
          <Button variant="contained" color="primary" size="small">
            View
          </Button>
        </Link>
      );
    },
  },
];

const LogsPage = ({ logs }) => (
  <AppLayout>
    <Typography variant="h1" gutterBottom>
      Logs
    </Typography>
    <Box display="flex" flexGrow={1} clone>
      <Paper>
        <DataGrid
          rows={logs}
          columns={COLUMNS}
          disableSelectionOnClick
          disableColumnSelector
        />
      </Paper>
    </Box>
  </AppLayout>
);

import { fetchLogs } from "helpers/api";

LogsPage.getInitialProps = async () => {
  const logs = await fetchLogs();

  return { logs };
};

export default LogsPage;
