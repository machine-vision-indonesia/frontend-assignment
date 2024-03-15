import {useQuery} from '@tanstack/react-query'
import {type PropsTable} from '@/components/Table/Table.type'
import {PREFIX_KEY} from '@/constant/common'
import client from '@/client/index'

type Sektor_Id = {
    nama: string
}

type PerusahaanBei = {
    id: string
    kode_saham: string
    nama: string
    sektor_id?: Sektor_Id;
    tanggal_listing: string
}

type GetListPerusahaanBeiResponse = {
    data: PerusahaanBei[]
}

export const GetListPerusahaanBei: PropsTable['dataFetchService'] = params => {
    const queryParams = {
        ...params,
        fields: ['id', 'kode_saham', 'nama', 'sektor_id.nama', 'tanggal_listing']
    }

    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'ITEMS', queryParams],
        async queryFn() {
            const response = await client.api.get<GetListPerusahaanBeiResponse>('/items/perusahaan_bei', {
                params: queryParams
            })
            return response.data
        }
    })
}
