'use client';

import { useEffect, useState } from 'react';
import { Typography } from 'components';
import { F } from 'i18n';

export function ExperimentsClient() {
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    async function fetchExperiments() {
      try {
        const response = await fetch('/api/admin/experiments');
        const data = await response.json();
        setExperiments(data.experiments || []);
      } catch (error) {
        console.error('Failed to fetch experiments:', error);
      }
    }

    fetchExperiments();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h1">
        <F defaultMessage="Experiments" />
      </Typography>
      <div>
        <F defaultMessage="Registered experiments:" />
        <ul>
          {experiments.map((exp: any) => (
            <li key={exp.name}>
              <strong>{exp.name}</strong>: {exp.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
