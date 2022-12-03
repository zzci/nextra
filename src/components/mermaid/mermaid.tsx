import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import styles from './mermaid.module.css';
import cn from 'classnames';
import { useTheme } from 'next-themes';

const Mermaid = ({ chart }) => {
  const { theme } = useTheme();
  const [zoomed, setZoomed] = useState(false);
  const [svg, setSvg] = useState(undefined);
  const [id] = useState(`mermaid-${Math.random().toString(36).substr(2, -1)}`);

  const toggle = () => {

    setZoomed(!zoomed)
  };

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      logLevel: 5,
      securityLevel: 'strict',
      arrowMarkerAbsolute: false,
      theme,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        rankSpacing: 65,
        nodeSpacing: 30,
        curve: 'basis',
      },
      sequence: {
        useMaxWidth: true,
      },
      gantt: {
        useMaxWidth: true,
      },
    });

    mermaid.render(id, chart, (svg) => {
      setSvg(svg);
    });
  }, []);
console.log(theme);
  return (
    <>
      <div onClick={toggle} dangerouslySetInnerHTML={{ __html: svg }} />
      <div
        onClick={toggle}
        className={cn(styles.overlay, styles.pointer, styles.graph, {
          [styles.visible]: zoomed,
        })}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(styles.backdrop, styles.graph)}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </>
  );
};

export { Mermaid };
