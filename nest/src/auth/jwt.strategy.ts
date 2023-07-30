import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as config from 'config'

const jwtConfig = config.get('jwt') 
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            secretOrKey: jwtConfig.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        // const 
    }
}