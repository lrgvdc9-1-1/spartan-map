export interface TICKETiNBOX {
    id_ticket?:number;
    objectid?: string;
    full_name?: string;
    cfirst_name?: string;
    clast_name?: string;
    created_date?: string;
    comment?: boolean;
    icon?: string;
    tax_account_num?: string;
    subdivision?: string;
    
    lot_num?: string;
    system_assign?: TICKETROUTE;
    view?: boolean;
    zoomIn?: boolean;
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


export interface COMMENT {
    id_com?: number;
    first_name?: string;
    last_name?: string;
    ticket_comments?: string;
    ticket_number?: number;
    time_track?: string;
    time_stamp?: string;
    time_track_int?: number;
    user_id?: number;
}


export interface USER {
    user_id?: number;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    initials?: string;
    email?: string;
    icon?: string;
    organization?: ORGANIZATION;
}

export interface ORGANIZATION {
    organization_id?: number;
    name?: string;
    address?: string;
}
