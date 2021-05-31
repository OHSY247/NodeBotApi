import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from '@midwayjs/faas';
import { join } from 'path';

import * as staticCache from 'koa-static-cache';
@Configuration({
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.use(
      staticCache({
        prefix: '/tmp/',
        dir: join(__dirname, '../tmp'),
        dynamic: true,
        preload: false,
        buffer: true, // 注意，这里是 true
        maxFiles: 1000,
      })
    );
  }
}
