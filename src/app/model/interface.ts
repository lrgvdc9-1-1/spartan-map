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
    time_track_int?: string;
    user_id?: number;
    bwtime?: number;
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

export interface BOOKMARK {
    bookmarks_id?: number;
    bookmark_name?: string;
    bookmark_comments?: string;
    user_id?: number;
    extent?: any;
}

export interface LAYER {
    name?: string;
    url?: string;
    type?: string;
    base?: boolean;
    visible?: boolean;
    editing?: boolean;
}

export class CUSER {
    properties: USER;

    constructor() {
        this.properties = {
            user_id: 0,
            first_name: "JUAN",
            middle_name: "ENTER MIDDLE",
            last_name: "ARRENDEDONDO",
            initials: "ENTER INIT",
            email: "ENTER EMAIL",
            icon: "default",
            organization: {
                organization_id: 0,
                name: "LRGVDC",
                address: "ENTER ADDRESS"
            }
        }
    }

    setFName(fname: string) {
        this.properties.first_name = fname;
    }
    setLName(lname: string) {
        this.properties.last_name = lname;
    }

    setMName(mname: string) {
        this.properties.middle_name = mname;
    }

    setEmail(email: string) {
        this.properties.email = email;
    }

    getFName():string {
        return this.properties.first_name
    }
    getFullName(): string {
        return this.properties.first_name + " " + this.properties.last_name;
    }
    getOrga(): string {
        return this.properties.organization.name;
    }
}
