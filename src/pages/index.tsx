import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@/components/Table/Index";
import { GetListBEI } from "@/service/bei/index.service";

export default function Home() {

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "kode_saham",
            headerName: "Kode",
            flex: 1
        },
        {
            field: "nama",
            headerName: "Nama",
            flex: 1
        },
        {
            field: "tanggal_listing",
            headerName: "Tanggal Listing",
            flex: 1
        },
        {
            field: "sektor_nama",
            headerName: "Sektor",
            flex: 1
        },
    ]
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
            <Table
                columns={columns}
                dataFetchService={GetListBEI}
            />
        </Box>
    );
}
