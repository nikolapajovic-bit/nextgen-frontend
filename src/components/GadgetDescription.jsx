"use client";

import { useState } from "react";

export function GadgetDescription({ text }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <p
                className={`text-gray-600 mt-1 ${expanded ? 'max-h-40 overflow-y-auto' : ''}`}
                style={
                    !expanded
                        ? {
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }
                        : {}
                }
            >
                {text}
            </p>
            {text.length > 100 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-indigo-600 mt-1 text-sm font-semibold"
                >
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}
        </div>
    );
}
