import * as React from "react";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Table from "@/components/Table/Index";
import {
  GetListBEICompany,
  BEICompany,
} from "@/service/example/bei-company.service";
import { GridColDef } from "@mui/x-data-grid";
import { id } from "date-fns/locale";

export default function Home() {
  const queryClient: QueryClient = new QueryClient();
  const columns: (GridColDef<BEICompany> & {
    searchable?: boolean;
  })[] = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      editable: false,
      flex: 1,
      searchable: false,
    },
    {
      field: "kode_saham",
      headerName: "Kode Saham",
      width: 150,
      editable: false,
      flex: 1,
      searchable: true,
    },
    {
      field: "nama",
      headerName: "Nama",
      width: 150,
      editable: false,
      flex: 1,
      searchable: true,
    },
    {
      field: `sektor_id.nama`,
      headerName: "Sektor",
      width: 150,
      editable: false,
      flex: 1,
      valueGetter: ({ row }) => row.sektor_id?.nama,
      searchable: false,
    },
    {
      field: "tanggal_listing",
      headerName: "Tanggal Listing",
      width: 150,
      editable: false,
      flex: 1,
      valueGetter: ({ row }) =>
        format(new Date(row.tanggal_listing), "dd MMMM yyyy", { locale: id }),
      searchable: false,
    },
  ];

  return (
    <Box
      sx={{
        my: 4,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Table
          dataFetchService={GetListBEICompany}
          columns={columns}
          title={"BEI Company List"}
        />
      </QueryClientProvider>
    </Box>
  );
}

