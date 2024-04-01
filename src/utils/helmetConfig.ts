// import helmet from 'helmet';
import * as helmet from 'helmet';

const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", 'api.github.com'],
      scriptSrc: ["'self'", "'unsafe-inline'", 'api.github.com'],
      styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com', 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'gravatar.com', 'api.github.com'],
      connectSrc: ["'self'", 'api.github.com']
    }
  },
  expectCt: {
    enforce: true,
    maxAge: 30
  },
  referrerPolicy: {
    policy: 'no-referrer'
  },
  xssFilter: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true
  },
  noSniff: true,
  frameguard: {
    action: 'deny'
  },
  featurePolicy: {
    features: {
      fullscreen: ["'self'", 'github.com'],
      payment: [],
      vibrate: [],
      syncXhr: [],
      autoplay: [],
      displayCapture: [],
      interestCohort: []
    }
  }
};

export default helmetConfig;