import { useQuery } from "@tanstack/react-query";
import { type PropsTable } from "@/components/Table/Table.type";
import { PREFIX_KEY } from "@/constant/common";
import client from "@/client/index";

type BEI = {
  id: string;
  kode_saham: string;
  nama: string;
  tanggal_listing: string;
  sektor_id?: {
    nama: string
  }
  sektor_nama?: string;
};

type GetListBEIResponse = {
  data: BEI[];
  meta: {
    filter_count: number
  }
};

export const GetListBEI: PropsTable["dataFetchService"] = (params) => {
  const queryParams = {
    ...params,
    fields: ["id", "kode_saham", "nama", "sektor_id.nama", "tanggal_listing"],
  };

  return useQuery({
    queryKey: [PREFIX_KEY.GET, "BEI", queryParams],
    async queryFn() {
      const response = await client.api.get<GetListBEIResponse>(
        "/items/perusahaan_bei",
        {
          params: queryParams,
        },
      );
      return response.data;
    },
    select(data) {
        const res = {
          meta : data.meta,
          data : data.data?.map((item): BEI => ({
            ...item,
            sektor_nama: item?.sektor_id?.nama
          }))
        }
        return res
    },
  });
};
