export class ROUTES {
    api: API_ROUTES
 
    constructor() {
      this.api = {
            MAIN: "https://gis.lrgvdc911.org/DOCS/",
            OFFICE: "https://view.officeapps.live.com/op/view.aspx?src=",
            inbox: "addressticket/getInbox3",
            gComments: "addressticket/getComments/?id=",
            iComment: "addressticket/insertComm",
            dBookmark: "gis/deleteBookmark/",
            sBookmark: "gis/saveBookmark",
            gBookmark: "gis/getBookmarkUser/?id=",
            sAttachDoc: "gis/addAttach/",
            gAttachDoc: "gis/getAttachDOCS/"
      }
    }
}

interface API_ROUTES {
    inbox?: string;
    gComments?: string;
    iComment?: string;
    dBookmark?: string;
    sBookmark?: string;
    gBookmark?: string;
    sAttachDoc?: string;
    gAttachDoc?: string;
    MAIN?: string;
    OFFICE?: string;
  }
