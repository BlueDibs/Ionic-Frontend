import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIHmVDK4T0CqUwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjMw\nNDIwMDkzOTI3WhcNMjMwNTA2MjE1NDI3WjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALp4nIgmJ4tyCfCfTS+ZfR8xW/FWs+MHOdmOYS0f9efPhuio\nXnRYRAqawXnYMqK6abCUM/JE0FQF+pCvi2r3Ncl9iyDn/w3qEq3YeTcWAmYxltTl\nn3+Vnq/WPiFshhX+Qr/tOXdmANqB4Er5hA/oAwL0csNqUpJYwqkCqj1xSizAgsJI\nEPQpnnOXJ3cJMGDWxqsk5s1IexS5qWr8Hvpq8Yy6RdMCgILp+bD0DBqFPPC3g5mX\nTfh5Q+GIu0nuD2jdQaUjxYS842j3RUk4B3un6OlVj0xr4+JfV0S5lxmTsgtLINFT\naey3pe9++lkjDrymOCg0EG0HriP3+s90Lsgh/e0CAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAJQDBPSGB1n9t3O0D/6Yq3Ggch5Q9kONs/tFg1XiMoGH\n8kKG6i8RAs63hoq6raP4FOTeaTm+LcBRnvXCte4yCE8+CrCPkXRS3ot4uIcxZMQh\nPajOk39iDn/6yXSY+KPVkPJUOdP/MbhY+RlFWWABuq5X62PjpzK/CmbwnYYx/rT7\noo9axlrAPTs9jSMgNVGg9hS8/3URv1RQ0cBxbMV/5ogV7x76TteeqClCOlE2mAaR\nsvZoQN+hFHhuwOcDET7ULswVNJfP0UGIXU2vkYCw8kuQxYCGvLBR6Ip/wjgzWREa\nAI3eP/t5U6wYsofIUUs/9QyC26l3ohUo5pM/Wo32rOQ=\n-----END CERTIFICATE-----\n"
        })
    }


    validate(payload) {
        console.log(payload)
        return payload
    }
}