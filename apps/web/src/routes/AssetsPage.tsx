import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Box, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

type Asset = {
  id: string;
  assetTag: string;
  name: string;
  assetType: string;
  ownerType: string;
  location?: string | null;
};

export default function AssetsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => (await api.get<Asset[]>("/assets")).data
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Assets
      </Typography>
      <Card>
        <CardContent>
          {isLoading ? <Typography>Loading…</Typography> : null}
          {error ? <Typography color="error">Failed to load</Typography> : null}

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset Tag</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data ?? []).map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.assetTag}</TableCell>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.assetType}</TableCell>
                  <TableCell>{a.ownerType}</TableCell>
                  <TableCell>{a.location ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
