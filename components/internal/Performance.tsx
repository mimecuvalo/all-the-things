import { useEffect, useState } from 'react';

import { Button, Popover } from '@mui/material';
import classNames from 'classnames';
import {styled} from '@mui/material/styles';

const Table = styled('div')`
  white-space: nowrap;
  display: inline-block;
`

const EntryType = styled('td')`
  font-weight: bold;
  padding: 5px 20px 5px 5px;
`

const EntryValue = styled('td')`
  text-align: right;
  padding: 5px;
`

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

  function renderPerfInfo() {
    if (!navigationEntry || !paintEntries || !anchorEl) {
      return null;
    }

    const entries = { ...navigationEntry.toJSON() };
    paintEntries.forEach((entry) => {
      entries[entry.name] = entry.startTime;
    });

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
      <Table>
        {relevantTimingKeys
          .filter((timing) => !!entries[timing])
          .sort((a, b) => entries[a] - entries[b])
          .map((timing) => (
            <tr key={timing}>
              <EntryType>
                {WEB_VITALS_NAME_TO_READABLE[timing] ? WEB_VITALS_NAME_TO_READABLE[timing] : timing}
              </EntryType>
              <EntryValue>{entries[timing].toFixed(1)}</EntryValue>
            </tr>
          ))}
      </Table>
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
        className="notranslate"
        color={duration > 5000 ? 'error' : undefined}
      >
        {duration ? duration.toFixed(1) + 'ms' : '…'}
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
