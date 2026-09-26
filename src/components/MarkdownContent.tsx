import React from 'react';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const paragraphs = content.split('\n\n');

  return (
    <div className="space-y-4 text-slate-300 leading-relaxed">
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();

        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={i} className="text-lg font-bold text-cyan-300 mt-6 mb-2">
              {trimmed.replace('### ', '')}
            </h4>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3 border-b border-slate-800 pb-2">
              {trimmed.replace('## ', '')}
            </h3>
          );
        }

        if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
          const listItems = trimmed.split('\n');
          return (
            <ul key={i} className="space-y-2 my-3 pl-4 border-l-2 border-cyan-500/30">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>{renderFormattedText(item.replace(/^[0-9]+\.\s+|^-\s+/, ''))}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-sm md:text-base text-slate-300">
            {renderFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

function renderFormattedText(text: string) {
  // Bold & Code parsing
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 text-xs font-mono font-medium"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
