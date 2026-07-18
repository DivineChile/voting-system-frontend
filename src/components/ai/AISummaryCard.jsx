import { Sparkles } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import AICard from "./AICard";

export default function AISummary({ summary }) {
  if (!summary) {
    return null;
  }

  return (
    <AICard title="Executive Summary" subtitle="AI-generated election overview">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-600" />

        <div className="prose prose-slate max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{summary}</Markdown>
        </div>
      </div>
    </AICard>
  );
}
