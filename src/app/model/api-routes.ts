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
            gAttachDoc: "gis/getAttachDOCS/",
            dAllAttachDocs: "gis/delAllDOCS/",
            rAttachDocs: "gis/removeAttachDOCS/",
            gisTickets: "gis/getTICKETS",
            uploadPics: "qprocess/uploadPic2/",
            gQuickPick: "qprocess/getBoxPics/"
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
    dAllAttachDocs?: string;
    gisTickets?: string;
    rAttachDocs?: string;
    MAIN?: string;
    OFFICE?: string;
    uploadPics?: string;
    gQuickPick?: string;
  }
