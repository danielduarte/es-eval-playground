import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import Split from 'react-split'
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import esEval from  'es-eval';
import './App.css';

function App() {

  const [code, setCode] = useState("2 + [3, true, 'a'].length + ((x, y) => { const z = 10; return x + y + z; })(100, 1000)");
  const [result, setResult] = useState('1115');

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  });

  function onChange(code) {
    let evalResult = '';
    try {
      evalResult = JSON.stringify(esEval(code), null, 2);
    } catch (err) {
      evalResult = err.message;
    }
    setCode(code);
    setResult(evalResult);
  }

  return (
    <div className="App">
      <Split
        className="exp-editor"
        sizes={[70, 30]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={0}
        direction="horizontal"
        style={{height: "100vh"}}
      >
        <div id="left_pane" className="code_pane">
          <AceEditor
            name="left_pane_editor"
            mode="javascript"
            theme="xcode"
            fontSize={20}
            highlightActiveLine={false}
            value={code}
            height="100%"
            width="100%"
            tabSize={2}
            placeholder="Enter a JS/ES expression"
            editorProps={{ $blockScrolling: true }}
            setOptions={{ useWorker: false, dragEnabled: false }}
            onChange={onChange}
          />
        </div>
        <div id="right_pane" className="code_pane">
          <AceEditor
            name="right_pane_editor"
            mode="json"
            theme="xcode"
            fontSize={20}
            highlightActiveLine={false}
            value={result}
            height="100%"
            width="100%"
            editorProps={{ $blockScrolling: true }}
            setOptions={{ useWorker: false, dragEnabled: false }}
            readOnly={true}
          />
        </div>
      </Split>
    </div>
  );
}

export default App;
