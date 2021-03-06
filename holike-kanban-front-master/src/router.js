import React from 'react';
import { Route, routerRedux, Switch } from 'dva/router';
import ModalContainer, { registerContainer } from 'components/Modal/ModalContainer';
import { ModalContainer as C7nModalContainer } from 'choerodon-ui/pro';
import { withRouter } from 'react-router';
import Authorized from 'components/Authorized/WrapAuthorized';
import PermissionProvider from 'components/Permission/PermissionProvider';

import LocalProviderAsync from 'utils/intl/LocaleProviderAsync';

import { dynamicWrapper } from 'utils/router';
// import LoadingBar from 'components/LoadingBar';
import './index.less';
// import dynamic from 'dva/dynamic';

const WithRouterC7nModalContainer = withRouter(C7nModalContainer);
const { ConnectedRouter } = routerRedux;
const { DefaultAuthorizedRoute, PubAuthorizedRoute } = Authorized;
// TODO 将默认进度条放在BasicLayout中设置
// dynamic.setDefaultLoadingComponent(() => {
//   return <LoadingBar />;
// });

function RouterConfig({ history, app }) {
  const Layout = dynamicWrapper(app, ['user', 'login'], () =>
    import('hzero-front/lib/layouts/Layout')
  );
  const PubLayout = dynamicWrapper(app, ['user', 'login'], () =>
    import('hzero-front/lib/layouts/PubLayout')
  );
  // 免登陆无权限路由
  const PublicLayout = dynamicWrapper(app, [], () =>
    import('hzero-front/lib/layouts/PublicLayout')
  );

  return (
    <LocalProviderAsync>
      <PermissionProvider>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <ModalContainer ref={registerContainer} />
            <WithRouterC7nModalContainer />
            <Switch>
              <Route path="/public" render={props => <PublicLayout {...props} />} />
              <PubAuthorizedRoute path="/pub" render={props => <PubLayout {...props} />} />
              {/* <AuthorizedRoute path="/" render={props => <BasicLayout {...props} />} /> */}
              <DefaultAuthorizedRoute path="/" render={props => <Layout {...props} />} />
            </Switch>
          </React.Fragment>
        </ConnectedRouter>
      </PermissionProvider>
    </LocalProviderAsync>
  );
}

export default RouterConfig;
