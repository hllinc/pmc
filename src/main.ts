import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { hmrBootstrap } from './hmr';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// 判断是否生产环境
if (environment.production) {
  enableProdMode();
}

// 判断是否启用模块热更新
const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
};
if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('webpack-dev-server没有启用HMR！');
    console.log('你确定在ng serve中设置了--hmr属性？');
  }
} else {
  bootstrap();
}
