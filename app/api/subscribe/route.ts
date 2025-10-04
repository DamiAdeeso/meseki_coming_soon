import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    // Get Zoho credentials from environment variables (server-side)
    const clientId = process.env.ZOHO_CLIENT_ID
    const clientSecret = process.env.ZOHO_CLIENT_SECRET
    const sheetId = process.env.ZOHO_SHEET_ID

    if (!clientId || !clientSecret || !sheetId) {
      console.error('Missing Zoho credentials in environment variables')
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 })
    }

    // Get access token from Zoho
    console.log('Attempting Zoho authentication with:', {
      clientId: clientId ? 'Found' : 'Missing',
      clientSecret: clientSecret ? 'Found' : 'Missing',
      scope: 'ZohoSheet.sheet.ALL'
    })

    const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'ZohoSheet.sheet.READ',
      }),
    })

    const tokenData = await tokenResponse.json()
    console.log('Zoho token response:', tokenData)

    if (!tokenData.access_token) {
      console.error('Failed to get Zoho access token:', tokenData)
      return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 })
    }

    // Add data to Zoho Sheet
    const sheetResponse = await fetch(`https://sheet.zoho.com/api/v2/sheets/${sheetId}/rows`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            'Email Address': email,
            'source': 'Website',
            'Added Time': new Date().toISOString(),
          }
        ]
      }),
    })

    if (sheetResponse.ok) {
      return NextResponse.json({ success: true })
    } else {
      const errorData = await sheetResponse.text()
      console.error('Zoho Sheet API error:', errorData)
      return NextResponse.json({ success: false, error: 'Failed to save email' }, { status: 500 })
    }

  } catch (error) {
    console.error('Subscribe API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}