"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconChecks, IconCopy } from "@tabler/icons-react";
import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div className="relative w-full max-w-full rounded-lg bg-slate-900 overflow-hidden">
      {/* Header with tabs or filename */}
      <div className="flex flex-col">
        {tabsExist && (
          <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-700 bg-slate-800">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors border-b-2 font-sans ${
                  activeTab === index
                    ? "text-white border-blue-500 bg-slate-900"
                    : "text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-700"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        
        {!tabsExist && filename && (
          <div className="flex justify-between items-center px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="text-sm text-slate-400 font-sans truncate">{filename}</div>
           <CopyButton content={code ?? ""} variant="glass" size="md" />
          </div>
        )}

        {tabsExist && (
          <div className="flex justify-end px-4 py-2 bg-slate-800 border-b border-slate-700">
            <CopyButton content={tabs[activeTab].code} variant="glass" size="md" />
          </div>
        )}
      </div>

      {/* Code content */}
      <div className="relative overflow-auto max-h-96 no-scrollbar">
        <SyntaxHighlighter
          language={activeLanguage}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            overflow: "visible",
            width: "100%",
            minWidth: "max-content",
          }}
          wrapLines={false}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "2.5rem",
            paddingRight: "1rem",
            color: "#64748b",
            fontSize: "0.75rem",
            textAlign: "right",
            userSelect: "none",
          }}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? "rgba(59, 130, 246, 0.15)" // blue-500 with opacity
                : "transparent",
              display: "block",
              width: "100%",
              paddingLeft: "0.5rem",
              paddingRight: "1rem",
              borderLeft: activeHighlightLines.includes(lineNumber)
                ? "3px solid #3b82f6"
                : "3px solid transparent",
            },
          })}
          PreTag="div"
          CodeTag="code"
        >
          {String(activeCode)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};