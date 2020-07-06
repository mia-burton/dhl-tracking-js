# dhl-tracking-js

A Node.js module for tracking DHL by tracking number 

## Usage
First of all you need to register to [DHL Develop portal](https://developer.dhl.com) and register an App in order to get the **DHL-API-Key**.

The tracking method accept optional fields `SERVICE`, `ORIGIN_COUNTRY_CODE` and `REQUESTER_COUNTRY_CODE`, refer to [DHL documentation](https://developer.dhl.com/api-reference/shipment-tracking#get-started-section/overview) to see allowed values.

### Javascript
```
var dhlTracking = require('@mia-burton/dhl-tracking-js')
var dhl = new dhlTracking(API_KEY, BASE_URL)

// Get tracking order information
dhl.tracking({
  trackingNumber: TRACKING_NUMBER,
  service: SERVICE?,
  originCountryCode: ORIGIN_COUNTRY_CODE?,
  requesterCountryCode: REQUESTER_COUNTRY_CODE?
})
```

### Typescript

```
import dhlTracking from '@mia-burton/dhl-tracking-js'
const dhl = new dhlTracking(API_KEY, BASE_URL)

// Get tracking order information
dhl.tracking({
  trackingNumber: TRACKING_NUMBER,
  service: SERVICE?,
  originCountryCode: ORIGIN_COUNTRY_CODE?,
  requesterCountryCode: REQUESTER_COUNTRY_CODE?
})
```

## Test
call `npm run test`