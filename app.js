const axios = require('axios');
const admin = require('firebase-admin');
const moment = require('moment');

// Supabase configuration
const supabaseUrl = 'https://bfsvgfvanqjnhjxqfoju.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmc3ZnZnZhbnFqbmhqeHFmb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NjY4OTUsImV4cCI6MjA0MTE0Mjg5NX0.ZB9rx3ysebCgfc4h4KzGxJpCOoyXPrRgSGSoh9xJU8Y';

// Firebase configuration
const firebaseServiceAccount = {
  "type": "service_account",
  "project_id": "app-20e7b",
  "private_key_id": "4fbcb198906e511a9e29defebe1d0dea7eb7516b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7y5IbYZaOslxv\nFSUYG04yQ8RpkwH4jHYWHvJrKSXPYqJsQDx0kM6os8eQovprAOb1LSF1Lv1WKg1Z\nEcy3uVPj/IZ/2fRR++3p3X3PStfVaQmsbDafgZ+NmMZKe6uVCm58P1tA+ZbQeuCe\nLyjqDfYfQGnvK7FqbHNsADA/ooMMTVDwxJxMHhX4L7ZK+XsVrIq9+TNfs/XRhlev\nB+xygR8R/BsjOP8rdI+4DbnZImBP64tyba4LGou5yjv6MDbXbGoaE/Gb09a47fCD\nAWBANMMT/hU1okqYDfH/xqIKM1RrbL1GQ+Ym1uOAnRyRPXMGH7JoQ97WuhjoI5d4\n0Dd/s2spAgMBAAECggEAEoeXHomGBAV4VmOVOegz0oTaQ/qD5sThP/SEwesY9noK\ngbji3jONmJrIla5nHBjGMSnnU7sztwVGNOQrOXOZYfUARmw4jcBYbMt0hvghDMck\n87TnvNxa5GtPIXlLaFTTqwHLXMFjzqVZNXJ8zH9dKh8+dKFwi4ow51arbBP6b0Oj\n97+ojIENRjVDYSD0DAfBacA40nwf8BIqm+994awn30ciwTiim1eD47217AeN208S\n+rC2+hjB9TVXhAko5tDJMH3rw9DJalM30V3C+yXzw9KaJZes4+ZZN3M3B8U0jVKe\nW6s46uct8xbodb0D/fMzUaQdx+WT7XLGIVSaSnw76QKBgQD+t5Wmkf+1FJbysNMS\nvK2C9d2Mt+jL9cc9NepQV//wP+Uernra87JAYxjeWP0RcZyajyAUlw3OjP/cGhDh\nlnlxvFxORbS4qxhveRH85Q4qEBAU0mO10JvuM3TFC1XE3GXl71rsnFO+ZvyYXAeo\nmn1/ldx5k+wh0fALXg1N15dXfQKBgQC8vbOR7/mcASDdy1h14zpRD1y7WiR/lHF2\ngz8RxjgKhT922Zlj5aW3vJ2Jx7QChvBfQCaO8zL/zdNF6QDK+LZR9shQgfGzODpo\n7Q1Su34Nb0eScTnuILBDbNCbauTAzk1rqrI9c0868UCSRpw8rLWvbvWzNeJrb81i\nuvKXqkQqHQKBgQDu9Pd1vr3u+RPrNauuhkcY9uMTYm0I+tghOnVJTmUS1D50HCex\nRLHS6aSo4z72oGjULrVf253eSjS2HdX8bBgedSD7ZTV3kTtpSGFxqMky+MK9ZeqY\n5M2EF83SFSIvfrwxi+z20GlX1HHf1WZx7A0UJlkhzX3W9IaHg4Jjpn+aWQKBgEfw\ntsVlhurjszdXDrzAg7Xp+RqgXVETr7vQgvWvbCT2bR5MCp99JRFHn3So3gAolu53\ncTsDj+jY9zKqgVbcPgI34lptbUc2o2zjDjT+qilMxScYaVBOvWC11T2oHNEw0Wm8\ngnvRu91nn4khyOOHoSjhTl2kqEzzLIH5aAZPK/QxAoGBAJ56YyyqreyIlAtA0ATm\nY1bBknC6HzueagpQD2UWfD6UYap5jwWMFipWXcNzYPEQDeT9M5ikQqOmf89pbJm/\nR63jflyqhrQrawCjt7CCbGtnHdnzRZVMcx0ldU7KyRHqfV5nVZCNig1BgyzgxvMs\nbHhClOR5RhggamwwkNfcwnCP\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-4qpdq@app-20e7b.iam.gserviceaccount.com",
  "client_id": "102831481045736576657",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4qpdq%40app-20e7b.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount)
});

// Function to make Supabase API request
async function supabaseRequest(url, method = 'GET', data = null) {
  try {
    const response = await axios({
      url,
      method,
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      data: data ? JSON.stringify(data) : null
    });
    return { code: response.status, body: response.data };
  } catch (error) {
    return { code: error.response ? error.response.status : 500, body: null };
  }
}

// Function to send FCM notification
async function sendFCMNotification(token, title, body) {
  try {
    await admin.messaging().send({
      token: token,
      notification: {
        title: title,
        body: body
      }
    });
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
}

async function main() {
  const today = moment().format('YYYY-MM-DD');
  const sevenDaysLater = moment().add(30, 'days').format('YYYY-MM-DD');

  const result = { success: false, message: '', notifications_sent: 0 };

  // Fetch expiring cars
  const carsUrl = `${supabaseUrl}/rest/v1/cars?select=*,created_by&expiration_date=gte.${today}&expiration_date=lte.${sevenDaysLater}`;
  const carsResponse = await supabaseRequest(carsUrl);

  if (carsResponse.code !== 200) {
    result.message = `Failed to fetch cars. HTTP Error: ${carsResponse.code}`;
  } else {
    const cars = carsResponse.body;
    const userFcmTokens = {};

    // Fetch FCM tokens for users who created the expiring cars
    for (const car of cars) {
      const username = car.created_by;
      if (!userFcmTokens[username]) {
        const userUrl = `${supabaseUrl}/rest/v1/users?select=FCM&username=eq.${encodeURIComponent(username)}`;
        const userResponse = await supabaseRequest(userUrl);
        if (userResponse.code === 200 && userResponse.body.length > 0) {
          userFcmTokens[username] = userResponse.body[0].FCM;
        }
      }
    }

    // Send notifications for expiring cars
    for (const car of cars) {
      const fcmToken = userFcmTokens[car.created_by];
      if (fcmToken) {
        const expirationDate = moment(car.expiration_date);
        const daysUntilExpiration = expirationDate.diff(moment(), 'days');

        const notificationTitle = 'Car Service Expiring Soon';
        const notificationBody = `Your car ${car.name} (License: ${car.license_plate}) service is expiring in ${daysUntilExpiration} days.`;

        if (await sendFCMNotification(fcmToken, notificationTitle, notificationBody)) {
          result.notifications_sent++;
        }
      }
    }

    result.success = true;
    result.message = 'Notifications sent successfully';
  }

  console.log(JSON.stringify(result));
}

main().catch(error => {
  console.error('An error occurred:', error);
  process.exit(1);
});