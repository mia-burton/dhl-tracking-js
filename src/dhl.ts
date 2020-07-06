import axios, { AxiosResponse } from 'axios'

/**
 * Params interface
 * @param trackingNumber string - Mandatory, the tracking number to check
 * @param language string - Optional, preferred details info language
 * @param service string - Optional, preferred service ( see DHL API )
 * @param originCountryCode string - Optional, origin country code ( see DHL API )
 * @param requesterCountryCode string - Optional, requester country code ( see DHL API )
 */
interface Params { 
  trackingNumber: string,
  language?: string,
  service? : string,
  originCountryCode?: string,
  requesterCountryCode? : string
}

export class DHL {
  private readonly baseUrl: string
  private readonly headers: Object
  
  /**
   * Create a DHL object
   * @param APIKey string - Api key from DHL Api Developer panel
   * @param baseUrl string - Base url for requests (See DHL API)
   */
  constructor(APIKey: string, baseUrl: string) { 
    this.headers = { 'DHL-API-Key': APIKey }
    this.baseUrl = baseUrl
  }

  /**
   * Track using tracking number, return a Response
   * @param params Params - Interface of parameters
   */
  public async tracking(params : Params) :Promise<AxiosResponse> {
    try {
      const resp = await axios.get(this.baseUrl, { params: params, headers: this.headers })
      return resp
    } catch (error) {
      return new Promise((resolve) => resolve(error.response))
    }
  }
}
