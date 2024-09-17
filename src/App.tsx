import  { useState, useEffect } from 'react';
import { DataTable, DataTableSelectionCellChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
        

interface Product {
  id: string;
  title: string;
  place_of_origin: string;
  medium_display: string;
  artwork_type_title: string;
}

export default function CheckboxRowSelectionDemo() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[] | null>(null);
    const [rowClick, setRowClick] = useState<boolean>(true);
    const [load, setLoad] = useState<boolean>(true);
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
        setPage(event.page+1);
    };
    const dataGet = async () => {
        setLoad(false)
        const res = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}`);
        setProducts(res.data.data);
        setLoad(true)
    };

    useEffect(() => {
        dataGet();
    }, [page]);

    return (
        <div className="card">
           {load?( 
            <DataTable value={products}   selectionMode={rowClick ? setRowClick(false) : 'single'} selection={selectedProducts}
                onSelectionChange={(e: DataTableSelectionCellChangeEvent<Product[]>) => setSelectedProducts(e.value as unknown as Product[] | P)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="id" header="ID"></Column>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place of Origin"></Column>
                <Column field="medium_display" header="Medium"></Column>
                <Column field="artwork_type_title" header="Type"></Column>
            </DataTable>):<div  className='w-full flex items-center justify-center h-[100vh]'><ProgressSpinner/></div>}
            <Paginator first={first} rows={rows} totalRecords={1200} rowsPerPageOptions={[12]} onPageChange={onPageChange} />
        </div>
    );
}
