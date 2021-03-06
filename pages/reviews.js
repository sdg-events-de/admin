import Link from "next/link";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import AppLayout from "layouts/AppLayout";
import { reviewEventUrl } from "helpers/routing";

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
    renderCell: function ActionCell({ row }) {
      return (
        <Link href={reviewEventUrl({ id: row.id })} passHref>
          <Button variant="contained" color="primary" size="small">
            Review
          </Button>
        </Link>
      );
    },
  },
];

const ReviewPage = ({ events }) => (
  <AppLayout>
    <Typography variant="h1" gutterBottom>
      Review
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

import { fetchEventsNeedingReview } from "helpers/api";

ReviewPage.getInitialProps = async () => {
  const events = await fetchEventsNeedingReview();

  return { events };
};

export default ReviewPage;
