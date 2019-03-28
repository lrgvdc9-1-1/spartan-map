export class ROUTES {
    api: API_ROUTES
 
    constructor() {
      this.api = {
            inbox: "addressticket/getInbox3",
            gComments: "addressticket/getComments/?id=",
            iComment: "addressticket/insertComm",
            dBookmark: "gis/deleteBookmark/",
            sBookmark: "gis/saveBookmark",
            gBookmark: "gis/getBookmarkUser/?id=",
            sAttachDoc: "gis/addAttach/"
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
  }
