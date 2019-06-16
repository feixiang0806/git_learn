import dynamic from 'dva/dynamic';
// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

export const getNavData = app => [
    {
        component: dynamicWrapper(app, [], () => import('../routes/index')),
        path: '/',
        children: [
          {
            path: 'login',
            name: '登录主页',
            component: dynamicWrapper(app, [], () => import('../routes/Login')),
            auth: false,
            exact: true,       
          },
          {
            path: 'home',
            name: '大厅',
            component: dynamicWrapper(app, ['home'], () => import('../routes/Home')),
            auth: true,
            exact: true,
          },
        ]
    }
]