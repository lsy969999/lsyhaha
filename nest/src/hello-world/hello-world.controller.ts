import { Controller, Get } from '@nestjs/common';

@Controller('helloworld')
export class HelloWorldController {
    @Get()
    hello() {
        return {
            hello: 'World',
            lsy: 'haha2'
        }
    }
}
