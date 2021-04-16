import request from 'umi-request';

export async function fakeChartData() {
  return request('/mock/fake_chart_data');
}
