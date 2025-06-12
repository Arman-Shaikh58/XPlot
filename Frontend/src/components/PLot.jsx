import React, { useEffect, useRef } from 'react';

export default function PLot(props) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const figdata = props.figdata;
    if (!figdata) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://d3js.org/d3.v5.min.js"></script>
          <script src="https://mpld3.github.io/js/mpld3.v0.5.10.js"></script>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            #fig-cont {
              width: 90%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <div id="fig-cont"></div>
          <script>
            function render() {
              if (window.d3 && window.mpld3) {
                mpld3.draw_figure("fig-cont", ${JSON.stringify(figdata)});
              } else {
                setTimeout(render, 100);
              }
            }
            render();
          </script>
        </body>
      </html>
    `;

    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [props.figdata]); // ✅ Only update when figdata changes

  return props.success ? (
    <iframe
      ref={iframeRef}
      title="mpld3-plot"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        background: 'white',
        borderRadius: '8px',
      }}
    />
  ) : (
    <div className="flex items-center justify-center text-center w-full h-full">
      <h1 className="text-xl font-semibold">Unable to Load the Plot</h1>
    </div>
  );
}
