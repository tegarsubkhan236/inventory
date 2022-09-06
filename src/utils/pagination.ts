import {TablePaginationConfig} from "antd/es/table";

export interface ApiPagination {
    pagination?: TablePaginationConfig;
    total?: number;
}