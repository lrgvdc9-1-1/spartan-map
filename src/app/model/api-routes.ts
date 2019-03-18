export class ROUTES {
    api: API_ROUTES
 
    constructor() {
      this.api = {
            inbox: "addressticket/getInbox3",
            gComments: "addressticket/getComments/?id=",
            iComment: "addressticket/insertComm",
            sBookmark: "gis/saveBookmark"
      }
    }
}

interface API_ROUTES {
    inbox?: string;
    gComments?: string;
    iComment?: string;
    sBookmark?: string;
  }
