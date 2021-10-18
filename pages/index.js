import { Box, Button, Paper, Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import AppLayout from "layouts/AppLayout";

const COLUMNS = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "host", headerName: "Host", flex: 5 },
  { field: "display_title", headerName: "Title", flex: 10 },
  {
    field: "Actions",
    headerName: "",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: function ActionCell() {
      return (
        // TODO: Enable viewing of events
        //   <Link href=`/events/${row.id}` passHref>
        <Button variant="contained" color="primary" size="small" disabled>
          View
        </Button>
        //   </Link>
      );
    },
  },
];

const Index = ({ events }) => (
  <AppLayout>
    <Typography variant="h1" gutterBottom>
      Events
    </Typography>
    <Box display="flex" flexGrow={1} clone>
      <Paper>
        <DataGrid
          rows={events}
          columns={COLUMNS}
          disableSelectionOnClick
          disableColumnSelector={true}
        />
      </Paper>
    </Box>
  </AppLayout>
);

import { fetchEvents } from "helpers/api";

Index.getInitialProps = async () => {
  const events = await fetchEvents();

  return { events };
};

export default Index;
