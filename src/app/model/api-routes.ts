export class ROUTES {
    api: API_ROUTES
 
    constructor() {
      this.api = {
            inbox: "addressticket/getInbox3"

      }

    }

}

interface API_ROUTES {
    inbox?: string;
  }
