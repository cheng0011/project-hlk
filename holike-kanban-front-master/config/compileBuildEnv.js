/**
 * 打包编译时的环境变量配置
 * compileBuildEnv
 * @author WY <yang.wang06@hand-china.com>
 * @date 2019-06-17
 * @copyright 2019-06-17 © HAND
 */

module.exports = {
  BASE_PATH: '/',
  PLATFORM_VERSION: 'BUILD_PLATFORM_VERSION',
  WEBSOCKET_HOST: 'BUILD_WEBSOCKET_HOST',
  CLIENT_ID: 'BUILD_CLIENT_ID',
  API_HOST: 'http://172.19.22.105:15015',
  GENERATE_SOURCEMAP: false,
  IM_ENABLE: 'BUILD_IM_ENABLE', // im是否启用，true/false
  IM_WEBSOCKET_HOST: 'BUILD_IM_WEBSOCKET_HOST', // im websocket 地址
  // BKT_PUBLIC: 'BUILD_BKT_PUBLIC', // 公共桶名
  // BKT_PLATFORM: 'BUILD_BKT_PLATFORM',
  // BKT_MSG: 'BUILD_BKT_MSG',
  // BKT_SDR: 'BUILD_BKT_SDR',
  // BKT_RPT: 'BUILD_BKT_RPT',
  // BKT_OCR: 'BUILD_BKT_OCR',
  // BKT_ADM: 'BUILD_BKT_ADM',
  // BKT_HWFP: 'BUILD_BKT_HWFP',
  // BKT_HITF: 'BUILD_BKT_HITF',
};
