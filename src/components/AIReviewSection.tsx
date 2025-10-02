"use client";

import { useState } from "react";
import { HexagonChart } from "./HexagonChart";

interface AIReview {
  id?: number; // id is optional as API doesn't always provide it
  review_type?: string;
  title?: string; // title is also optional based on API
  content: string;
  rating?: number;
  created_at?: string;
}

interface ScoreComparison {
  score_type: string;
  hall_score?: number | null;
  studio_score?: number | null;
  average: number;
  difference: number;
}

interface AIScoreSummary {
  overall_score: number;
  overall_average?: number;
  score_comparisons?: ScoreComparison[];
  // Legacy fields for backward compatibility
  atmosphere_score?: number;
  service_score?: number;
  price_score?: number;
  location_score?: number;
  facility_score?: number;
  summary_text?: string;
  pros?: string[];
  cons?: string[];
}

interface AIReviewSectionProps {
  aiReviews?: AIReview[];
  aiScoreSummary?: AIScoreSummary;
}

export function AIReviewSection({
  aiReviews,
  aiScoreSummary,
}: AIReviewSectionProps) {
  // Group reviews by review_type
  const reviewTypes = aiReviews
    ? Array.from(new Set(aiReviews.map((r) => r.review_type || "전체"))).filter(
        Boolean,
      )
    : [];

  const [activeReviewType, setActiveReviewType] = useState(
    reviewTypes[0] || "전체",
  );

  // Filter reviews by active type
  const filteredReviews =
    aiReviews?.filter(
      (review) => (review.review_type || "전체") === activeReviewType,
    ) || [];

  // Parse content with | separator
  const parseContent = (content: string) => {
    return content
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // Prepare scores for hexagon chart
  const hexagonScores = aiScoreSummary?.score_comparisons
    ? aiScoreSummary.score_comparisons
        .filter(sc => {
          // Get the actual score (hall_score or studio_score depending on context)
          const score = sc.hall_score !== null && sc.hall_score !== undefined 
            ? sc.hall_score 
            : sc.studio_score;
          // Only include scores that are valid and greater than 0
          return score !== null && score !== undefined && score > 0;
        })
        .map(sc => ({
          label: sc.score_type,
          value: sc.hall_score !== null && sc.hall_score !== undefined 
            ? sc.hall_score 
            : sc.studio_score || 0,
          average: sc.average,
          difference: sc.difference
        }))
        .slice(0, 6) // Limit to 6 items for hexagon
    : // Fallback to legacy fields if score_comparisons doesn't exist
      aiScoreSummary
      ? [
          { label: "분위기", value: aiScoreSummary.atmosphere_score || 0 },
          { label: "서비스", value: aiScoreSummary.service_score || 0 },
          { label: "가격", value: aiScoreSummary.price_score || 0 },
          { label: "위치", value: aiScoreSummary.location_score || 0 },
          { label: "시설", value: aiScoreSummary.facility_score || 0 },
          { label: "종합", value: aiScoreSummary.overall_score || 0 },
        ].filter((score) => score.value > 0)
      : [];

  if (!aiReviews?.length && !aiScoreSummary) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">AI 리뷰 & 평가</h2>
      </div>

      <div className="p-6">
        {/* AI Score Summary with Hexagon Chart */}
        {aiScoreSummary && hexagonScores.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-col items-center">
              {/* Hexagon Chart - Centered */}
              <div className="flex flex-col items-center w-full max-w-md">
                <HexagonChart scores={hexagonScores} />
                <div className="mt-4 text-center">
                  <p className="text-2xl font-bold text-[#FB6541]">
                    {aiScoreSummary.overall_score.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-500">종합 평점</p>
                </div>
              </div>

              {/* Pros and Cons - Centered below hexagon */}
              <div className="mt-6 space-y-4 w-full max-w-2xl mx-auto">
                {aiScoreSummary.summary_text && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed text-center">
                      {aiScoreSummary.summary_text}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiScoreSummary.pros && aiScoreSummary.pros.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        장점
                      </h4>
                      <ul className="space-y-1">
                        {aiScoreSummary.pros.map((pro, index) => (
                          <li
                            key={index}
                            className="text-sm text-green-700 flex items-start gap-1"
                          >
                            <span className="text-green-600 mt-1">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {aiScoreSummary.cons && aiScoreSummary.cons.length > 0 && (
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        개선점
                      </h4>
                      <ul className="space-y-1">
                        {aiScoreSummary.cons.map((con, index) => (
                          <li
                            key={index}
                            className="text-sm text-amber-700 flex items-start gap-1"
                          >
                            <span className="text-amber-600 mt-1">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Reviews with Type Tabs */}
        {aiReviews && aiReviews.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            {/* Review Type Tabs */}
            {reviewTypes.length > 1 && (
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                {reviewTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveReviewType(type)}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                      activeReviewType === type
                        ? "text-[#FB6541]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {type}
                    {activeReviewType === type && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FB6541]" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.map((review, reviewIndex) => {
                const contentItems = parseContent(review.content);

                return (
                  <div
                    key={review.id || `review-${reviewIndex}`}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="mb-3">
                      <div className="flex items-start justify-between">
                        {review.title && (
                          <h4 className="font-semibold text-gray-900">
                            {review.title}
                          </h4>
                        )}
                        {review.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-[#FB6541]">
                              {review.rating.toFixed(1)}
                            </span>
                            <svg
                              className="w-4 h-4 text-[#FB6541] fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {review.review_type && (
                        <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {review.review_type}
                        </span>
                      )}
                    </div>

                    {/* Content with separator handling */}
                    {contentItems.length > 1 ? (
                      <ul className="space-y-2">
                        {contentItems.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#FB6541] mt-0.5">•</span>
                            <span className="text-gray-600 text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.content}
                      </p>
                    )}

                    {review.created_at && (
                      <p className="text-xs text-gray-400 mt-3">
                        {new Date(review.created_at).toLocaleDateString(
                          "ko-KR",
                        )}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
