import { Children } from 'react';
import useExperiment from 'data/useExperiment';

export function Experiment({ children, name }) {
  const isExperimentOn = useExperiment(name);

  const filteredChildren = [];
  Children.map(children, (child) => {
    if (
      (isExperimentOn && (child.type.name !== 'Variant' || child.props.name.toLowerCase() !== 'off')) ||
      (!isExperimentOn && child.type.name === 'Variant' && child.props.name.toLowerCase() === 'off')
    ) {
      filteredChildren.push(child);
    }
  });

  return <>{filteredChildren}</>;
}

export function Variant({ children }) {
  return <>{children}</>;
}
