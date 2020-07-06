import { DHL } from '../dhl'

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time)) // sleep time to avoid reaching DHL maximum requests frequency
const maxTimeout = 10 * 1000 // test max timeout in ms
const timeout = 2 * 1000 // sleep timeout

describe('DHL tracking testing', function() {
  it('track with existing trackingNumber and valid API-Key', async function() {
    await sleep(timeout)
    const dhl = new DHL('demo-key','https://api-eu.dhl.com/track/shipments')
    const response = await dhl.tracking({trackingNumber: '00340434292135100100'})
    expect(response).not.toBeNull()
    expect(response.status).toBe(200)
    expect(response.data).not.toBeNull()
    expect(Array.isArray(response.data.shipments)).toBe(true)
    expect(response.data.shipments.length).toBeGreaterThanOrEqual(1)
    expect(response.data.shipments[0]).toHaveProperty('id')
    expect(response.data.shipments[0]).toHaveProperty('status')
    expect(response.data.shipments[0]).toHaveProperty('details')
  }, maxTimeout)

  it('track with existing trackingNumber and valid API-Key, changing language', async function() {
    await sleep(timeout)
    const dhl = new DHL('demo-key','https://api-eu.dhl.com/track/shipments')
    const response = await dhl.tracking({trackingNumber: '00340434292135100100', language: 'DE'})
    expect(response).not.toBeNull()
    expect(response.status).toBe(200)
    expect(response.data).not.toBeNull()
    expect(Array.isArray(response.data.shipments)).toBe(true)
    expect(response.data.shipments.length).toBeGreaterThanOrEqual(1)
    expect(response.data.shipments[0]).toHaveProperty('id')
    expect(response.data.shipments[0]).toHaveProperty('status')
    expect(response.data.shipments[0]).toHaveProperty('details')
    expect(response.data.shipments[0].status.status.indexOf('Die Sendung wurde elektronisch angekündigt')).toBe(0)
  }, maxTimeout)

  it('track with not existing trackingNumber and valid API-Key', async function() {
    await sleep(timeout)
    const dhl = new DHL('demo-key','https://api-eu.dhl.com/track/shipments')
    const response = await dhl.tracking({trackingNumber: 'wrongTrackingNumber'})
    expect(response).not.toBeNull()
    expect(response.status).toBe(404)
  }, maxTimeout)

  it('track with existing trackingNumber and not valid API-Key', async function() {
    await sleep(timeout)
    const dhl = new DHL('wrong-demo-key','https://api-eu.dhl.com/track/shipments')
    const response = await dhl.tracking({trackingNumber: '00340434292135100100'})
    expect(response).not.toBeNull()
    expect(response.status).toBe(401)
  }, maxTimeout)

  it('track with existing trackingNumber and valid API-Key, but too quickly', async function() {
    await sleep(timeout)
    const dhl = new DHL('demo-key','https://api-eu.dhl.com/track/shipments')
    await dhl.tracking({trackingNumber: '00340434292135100100'})
    await dhl.tracking({trackingNumber: '00340434292135100100'})
    await dhl.tracking({trackingNumber: '00340434292135100100'})
    const response = await dhl.tracking({trackingNumber: '00340434292135100100'})
    expect(response).not.toBeNull()
    expect(response.status).toBe(429)
  }, maxTimeout*10)
})