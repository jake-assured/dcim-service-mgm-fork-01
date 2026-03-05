import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Box, Card, CardContent, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

type SR = {
  id: string;
  reference: string;
  subject: string;
  status: string;
  priority: string;
  updatedAt: string;
};

export default function ServiceRequestsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["service-requests"],
    queryFn: async () => (await api.get<SR[]>("/service-requests")).data
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Service Requests
      </Typography>
      <Card>
        <CardContent>
          {isLoading ? <Typography>Loading…</Typography> : null}
          {error ? <Typography color="error">Failed to load</Typography> : null}

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticket</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data ?? []).map((sr) => (
                <TableRow key={sr.id}>
                  <TableCell>{sr.reference}</TableCell>
                  <TableCell>{sr.subject}</TableCell>
                  <TableCell><Chip size="small" label={sr.status.toLowerCase().replaceAll("_"," ")} /></TableCell>
                  <TableCell><Chip size="small" label={sr.priority} /></TableCell>
                  <TableCell>{new Date(sr.updatedAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
