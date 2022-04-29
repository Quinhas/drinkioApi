/* eslint-disable no-console */
import chalk from 'chalk';

export default function log(
  message: string,
  type: 'log' | 'error' | 'warning' | 'success' = 'log'
) {
  const color = {
    log: '#1ad7ff',
    error: '#D9262A',
    warning: '#FCA903',
    success: '#31CE56',
  };
  console.log(chalk.hex(color[type])(`[drink.io] ${message}`));
}
