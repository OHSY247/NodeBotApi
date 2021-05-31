import { Controller, Get, Provide } from '@midwayjs/decorator';

@Provide()
@Controller('/')
export class HomeController {
  @Get('/')
  async home() {
    return 'Hello Midwayjs!';
  }
  @Get('/tmp/*')
  async render() {
    // 这个函数的作用是为了让 static 全局中间件被执行。
  }
}
