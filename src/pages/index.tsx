import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@/components/Table";
import {GetListPerusahaanBei} from "@/service/example/items.service";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {format} from "date-fns";

export default function Home() {
    const queryClient = new QueryClient();
    const query = GetListPerusahaanBei;

    const columns = [
        {field: 'id', headerName: 'ID', width: 150, editable: false, flex: 1, searchable: false},
        {field: 'kode_saham', headerName: 'Kode Saham', width: 150, editable: false, flex: 1, searchable: true},
        {field: 'nama', headerName: 'Nama', width: 150, editable: false, flex: 1, searchable: true},
        {field: `sektor_id.nama`, headerName: 'Sektor', width: 150, editable: false, flex: 1, valueGetter: ({ row }) => row.sektor_id.nama, searchable: false},
        {field: 'tanggal_listing', headerName: 'Tanggal Listing', width: 150, editable: false, flex: 1, valueGetter: ({ row }) => format(row.tanggal_listing, "dd MMMM yyyy"), searchable: false}
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
                    dataFetchService={query}
                    columns={columns}
                    title={"BEI List"}
                    limit={5}
                    filters={[
                        {
                            type: 'dropdown-multiple',
                            name: "ID",
                            labelKey: "id",
                            field: "id",
                            dataFetchService: query
                        }
                    ]}
                />
            </QueryClientProvider>
        </Box>
    );
}
