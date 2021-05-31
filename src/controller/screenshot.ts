import { Inject, Controller, Get, Provide, Query } from '@midwayjs/decorator';
import { ScreenshotResponse } from '../dto/screenshotDTO';
import { ScreenshotService } from '../service/screenshotService';

@Provide()
@Controller('/screenshot')
export class ScreenshotController {
  @Inject()
  screenshotService: ScreenshotService;

  @Get('/shot')
  async getUser(@Query() url: string): Promise<ScreenshotResponse> {
    const test = await this.screenshotService.getUser({ url });
    return { success: true, message: 'OK', data: test };
  }
}
