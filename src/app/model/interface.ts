export interface TICKETiNBOX {
    id_ticket?:number;
    objectid?: string;
    cfirst_name?: string;
    clast_name?: string;
    created_date?: Date;
    icon?: string;
    tax_account_num?: string;
    subdivision?: string;
    system_assign?: TICKETROUTE;
    view?: boolean;
    walk_in?: string;
    x?: number;
    y?: number;
    lat?: number;
    longy?: number


}

export interface TICKETROUTE {
   a?:Array<number>;
   index: number;
}