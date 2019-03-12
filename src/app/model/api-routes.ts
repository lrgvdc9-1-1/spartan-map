export class ROUTES {
    api: API_ROUTES
 
    constructor() {
      this.api = {
            inbox: "addressticket/getInbox3",
            gComments: "addressticket/getComments/?id="

      }

    }

}

interface API_ROUTES {
    inbox?: string;
    gComments?: string;
  }
