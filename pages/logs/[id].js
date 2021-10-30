import { Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import AppLayout from "layouts/AppLayout";

const ATTRIBUTES = [
  {
    field: "id",
    name: "ID",
  },
  {
    field: "name",
    name: "Name",
  },
  {
    field: "created_at",
    name: "Created At",
  },
  {
    field: "levelname",
    name: "Level",
  },
  {
    field: "levelno",
    name: "Level (#)",
  },
  {
    field: "is_completed",
    name: "Done?",
  },
];

const LogPage = ({ log }) => (
  <AppLayout>
    <Typography variant="h1" gutterBottom>
      Log #{log.id}
    </Typography>
    <Box marginBottom={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colspan={2}>Properties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ATTRIBUTES.map((attribute) => (
              <TableRow key={attribute.field}>
                <TableCell style={{ width: 150, fontWeight: 500 }}>
                  {attribute.name}
                </TableCell>
                <TableCell>{log[attribute.field]?.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    <Card>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          Messages
        </Typography>
        {log.messages.length === 0 && (
          <Typography variant="body1">No messages were logged.</Typography>
        )}
        {log.messages.map((message) => (
          <Fragment key={message.id}>
            <Divider />
            <Box paddingY={2}>
              <Typography variant="body1" gutterBottom>
                <Box fontWeight={500} component="span">
                  {message.created_at} [{message.logger}] {message.levelname}
                </Box>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Box fontFamily="monospace" component="span">
                  {message.content}
                </Box>
              </Typography>
            </Box>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  </AppLayout>
);

import { fetchLog } from "helpers/api";

LogPage.getInitialProps = async ({ query }) => {
  const log = await fetchLog({ id: query.id });

  return { log };
};

export default LogPage;
