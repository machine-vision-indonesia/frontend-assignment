import { useQuery } from "@tanstack/react-query";
import { type PropsTable } from "@/components/Table/Table.type";
import { PREFIX_KEY } from "@/constant/common";
import client from "@/client/index";

type SektorId = {
  nama: string;
};

export type BEICompany = {
  id: string;
  kode_saham: string;
  nama: string;
  sektor_id?: SektorId;
  tanggal_listing: string;
};

export type GetListBEICompanyResponse = {
  data: BEICompany[];
};

export const GetListBEICompany: PropsTable["dataFetchService"] = (params) => {
  const queryParams = {
    ...params,
    fields: ["id", "kode_saham", "nama", "sektor_id.nama", "tanggal_listing"],
  };

  return useQuery({
    queryKey: [PREFIX_KEY.GET, "BEI", queryParams],
    async queryFn() {
      const response = await client.api.get<GetListBEICompanyResponse>(
        "/items/perusahaan_bei",
        {
          params: queryParams,
        }
      );
      return response.data;
    },
  });
};
