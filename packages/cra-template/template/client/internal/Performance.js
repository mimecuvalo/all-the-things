import { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import reportWebVitals from 'client/app/reportWebVitals';

const useStyles = createUseStyles({
  performanceList: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
  },

  performanceButton: {
    textTransform: 'lowercase',
  },

  slowPerformanceButton: {
    textTransform: 'lowercase',
    color: 'red',
  },

  entryType: {
    fontWeight: 'bold',
    padding: '5px 20px 5px 5px',
  },

  entryData: {
    textAlign: 'right',
    padding: '5px',
  },
});

const WEB_VITALS_NAME_TO_READABLE = {
  CLS: 'cumulative-layout-shift (Web Vital)',
  FID: 'first-input-delay (Web Vital)',
  FCP: 'first-contentful-paint (Web Vital)',
  LCP: 'largest-contentful-paint (Web Vital)',
  TTFB: 'time-to-first-byte (Web Vital)',
};

// Provides insight into how long the initial render took.
// Relies heavily on window['performance'] for now.
// Could be improved with some more server-side stats and with some metrics on
// ajax navigations.
export default function Performance() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [navigationEntry, setNavigationEntry] = useState(null);
  const [paintEntries, setPaintEntries] = useState(null);
  const [webVitalEntries, setWebVitalEntries] = useState({});

  const styles = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!window['performance']) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const perfNavigationEntry = window['performance'].getEntriesByType('navigation')[0];
      const perfPaintEntries = window['performance'].getEntriesByType('paint');
      setDuration(perfNavigationEntry.duration);
      setNavigationEntry(perfNavigationEntry);
      setPaintEntries(perfPaintEntries);
    });

    observer.observe({
      entryTypes: ['navigation', 'paint'],
    });
  }, []);

  useEffect(() => {
    reportWebVitals(({ name, value }) =>
      setWebVitalEntries((currentEntries) => ({
        ...currentEntries,
        [name]: value,
      }))
    );
  }, []);

  function renderPerfInfo() {
    if (!navigationEntry || !paintEntries || !anchorEl) {
      return null;
    }

    const entries = { ...navigationEntry.toJSON() };
    paintEntries.forEach((entry) => {
      entries[entry.name] = entry.startTime;
    });
    for (const key in webVitalEntries) {
      entries[key] = webVitalEntries[key];
    }

    const relevantTimingKeys = [
      'redirectStart',
      'redirectEnd',
      'fetchStart',
      'domainLookupStart',
      'domainLookupEnd',
      'connectStart',
      'secureConnectionStart',
      'connectEnd',
      'requestStart',
      'responseStart',
      'responseEnd',
      'first-paint',
      'domInteractive',
      'domContentLoadedEventStart',
      'domContentLoadedEventEnd',
      'domComplete',
      'loadEventStart',
      'loadEventEnd',

      // Web Vitals: https://web.dev/vitals/
      'CLS',
      'FID',
      'FCP',
      'LCP',
      'TTFB',
    ];

    return (
      <table className={styles.performanceList}>
        {relevantTimingKeys
          .filter((timing) => !!entries[timing])
          .sort((a, b) => entries[a] - entries[b])
          .map((timing) => (
            <tr key={timing}>
              <td className={styles.entryType}>
                {WEB_VITALS_NAME_TO_READABLE[timing] ? WEB_VITALS_NAME_TO_READABLE[timing] : timing}
              </td>
              <td className={styles.entryData}>{entries[timing].toFixed(1)}</td>
            </tr>
          ))}
      </table>
    );
  }

  const open = Boolean(anchorEl);

  return (
    <span>
      <Button
        aria-owns={open ? 'perf-info-popover' : undefined}
        aria-haspopup="true"
        variant="outlined"
        onClick={handleClick}
        className={classNames(duration > 5000 ? styles.slowPerformanceButton : styles.performanceButton, 'i18n-msg')}
      >
        {duration ? duration.toFixed(1) + 'ms' : '???'}
      </Button>
      <Popover
        id="perf-info-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {renderPerfInfo()}
      </Popover>
    </span>
  );
}
