"use client";

import { useState, useEffect } from "react";
import { magazineService, curationService, newsService } from "@/services/api";
import Image from "next/image";
import Link from "next/link";

interface ContentItem {
  id: number;
  title: string;
  thumbnail_url?: string;
  content_image_urls?: string[];
  description?: string;
  summary?: string;
  content?: string;
  link_url?: string; // 실제 API의 뉴스 링크
  news_category?: {
    id: number;
    display_name: string;
  };
  created_datetime: string;
  updated_datetime?: string;
  post_date?: string | null;
  type: "curation" | "news" | "magazine";
}

export function IntegratedMagazineSections() {
  const [curations, setCurations] = useState<ContentItem[]>([]);
  const [news, setNews] = useState<ContentItem[]>([]);
  const [magazines, setMagazines] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 뉴스 카테고리 필터
  const [selectedNewsCategory, setSelectedNewsCategory] =
    useState<string>("전체");

  // 각 섹션별 표시 개수 관리
  const [curationDisplayCount, setCurationDisplayCount] = useState(3);
  const [newsDisplayCount, setNewsDisplayCount] = useState(6);
  const [magazineDisplayCount, setMagazineDisplayCount] = useState(3);

  // 데이터 로드
  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        offset: 0,
        limit: 50,
      };

      // 병렬로 모든 데이터 가져오기
      const [curationsRes, newsRes, magazinesRes] = await Promise.all([
        curationService.getList(params).catch((err) => {
          console.log("Curation API error:", err);
          return null;
        }),
        newsService.getList(params).catch((err) => {
          console.log("News API error:", err);
          return null;
        }),
        magazineService.getList(params).catch((err) => {
          console.log("Magazine API error:", err);
          return null;
        }),
      ]);

      // Curations 데이터 처리
      let curationsData = [];
      if (curationsRes) {
        if (Array.isArray(curationsRes)) {
          curationsData = curationsRes.map((item: any) => ({
            ...item,
            type: "curation" as const,
          }));
        } else if ((curationsRes as any).items && Array.isArray((curationsRes as any).items)) {
          curationsData = (curationsRes as any).items.map((item: any) => ({
            ...item,
            type: "curation" as const,
          }));
        } else if ((curationsRes as any).data && Array.isArray((curationsRes as any).data)) {
          curationsData = (curationsRes as any).data.map((item: any) => ({
            ...item,
            type: "curation" as const,
          }));
        } else if (
          (curationsRes as any).results &&
          Array.isArray((curationsRes as any).results)
        ) {
          curationsData = (curationsRes as any).results.map((item: any) => ({
            ...item,
            type: "curation" as const,
          }));
        }
      }

      // News 데이터 처리 - API는 배열로 직접 반환
      let newsData = [];
      if (newsRes) {
        if (Array.isArray(newsRes)) {
          // 실제 API는 배열로 직접 반환함
          newsData = newsRes.map((item: any) => ({
            ...item,
            type: "news" as const,
            // link_url이 있으면 그대로 사용 (실제 API 필드명)
            link_url: item.link_url,
          }));
        } else if ((newsRes as any).items && Array.isArray((newsRes as any).items)) {
          newsData = (newsRes as any).items.map((item: any) => ({
            ...item,
            type: "news" as const,
          }));
        } else if ((newsRes as any).data && Array.isArray((newsRes as any).data)) {
          newsData = (newsRes as any).data.map((item: any) => ({
            ...item,
            type: "news" as const,
          }));
        } else if ((newsRes as any).results && Array.isArray((newsRes as any).results)) {
          newsData = (newsRes as any).results.map((item: any) => ({
            ...item,
            type: "news" as const,
          }));
        }
      }

      // Magazines 데이터 처리
      let magazinesData = [];
      if (magazinesRes) {
        if (Array.isArray(magazinesRes)) {
          magazinesData = magazinesRes.map((item: any) => ({
            ...item,
            type: "magazine" as const,
          }));
        } else if ((magazinesRes as any).items && Array.isArray((magazinesRes as any).items)) {
          magazinesData = (magazinesRes as any).items.map((item: any) => ({
            ...item,
            type: "magazine" as const,
          }));
        } else if ((magazinesRes as any).data && Array.isArray((magazinesRes as any).data)) {
          magazinesData = (magazinesRes as any).data.map((item: any) => ({
            ...item,
            type: "magazine" as const,
          }));
        } else if (
          (magazinesRes as any).results &&
          Array.isArray((magazinesRes as any).results)
        ) {
          magazinesData = (magazinesRes as any).results.map((item: any) => ({
            ...item,
            type: "magazine" as const,
          }));
        }
      }

      // 최신순 정렬
      curationsData.sort(
        (a: any, b: any) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime(),
      );
      newsData.sort(
        (a: any, b: any) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime(),
      );
      magazinesData.sort(
        (a: any, b: any) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime(),
      );

      setCurations(curationsData);
      setNews(newsData);
      setMagazines(magazinesData);
    } catch (err) {
      setError("콘텐츠 정보를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 큐레이션 카드 렌더링
  const renderCurationCard = (content: ContentItem) => (
    <Link
      key={content.id}
      href={`/curation-detail?id=${content.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer flex flex-col"
    >
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {content.thumbnail_url ? (
          <Image
            src={content.thumbnail_url}
            alt={content.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
            <div className="text-center">
              <div className="text-4xl mb-2">💡</div>
              <span className="text-gray-600 text-sm">큐레이션</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FB6541] transition-colors text-center">
            {content.title}
          </h3>
          {content.description && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2 text-center">
              {content.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );

  // 뉴스 카드 렌더링
  const renderNewsCard = (content: ContentItem) => {
    // 실제 API의 link_url
    const newsLink = content.link_url;

    // 링크가 없는 경우 카드는 표시하되 클릭 불가
    if (!newsLink) {
      return (
        <div
          key={content.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 opacity-90"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                {content.news_category
                  ? content.news_category.display_name
                  : "뉴스"}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(content.created_datetime)}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {content.title}
            </h3>
            {(content.description || content.summary || content.content) && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {content.description || content.summary || content.content}
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <a
        key={content.id}
        href={newsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer block"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
              {content.news_category
                ? content.news_category.display_name
                : "뉴스"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {formatDate(content.created_datetime)}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FB6541] transition-colors mb-3">
            {content.title}
          </h3>
          {(content.description || content.summary || content.content) && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {content.description || content.summary || content.content}
            </p>
          )}
          <div className="flex items-center text-blue-500 font-medium text-sm">
            <span>원문 보기</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </a>
    );
  };

  // 매거진 카드 렌더링
  const renderMagazineCard = (content: ContentItem) => (
    <Link
      key={content.id}
      href={`/magazine-detail?id=${content.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer flex flex-col"
    >
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {content.thumbnail_url ? (
          <Image
            src={content.thumbnail_url}
            alt={content.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
            <div className="text-center">
              <div className="text-4xl mb-2">📖</div>
              <span className="text-gray-600 text-sm">매거진</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FB6541] transition-colors text-center min-h-[60px] flex items-center justify-center">
            <span className="line-clamp-2">
              {content.title.replace(/\\n/g, "\n")}
            </span>
          </h3>
        </div>
        <div className="text-xs text-gray-500 text-center pt-3 border-t border-gray-100">
          <span>{formatDate(content.created_datetime)}</span>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            웨딩 매거진
          </h2>
          <p className="text-lg text-gray-600">
            웨딩 준비에 도움이 되는 다양한 정보와 콘텐츠를 만나보세요
          </p>
        </div>

        {/* 로딩 상태 */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FB6541]"></div>
            <p className="mt-4 text-gray-600">콘텐츠를 불러오는 중...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadAllContent}
              className="mt-4 px-6 py-2 bg-[#FB6541] text-white rounded-lg hover:bg-[#e54e2e] transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* 매거진 섹션 */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">매거진</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    웨딩 트렌드와 인사이트
                  </p>
                </div>
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {magazines.length}개
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {magazines
                  .slice(0, magazineDisplayCount)
                  .map(renderMagazineCard)}
              </div>

              {magazines.length > magazineDisplayCount && (
                <div className="text-center mt-8">
                  <button
                    onClick={() =>
                      setMagazineDisplayCount(magazineDisplayCount + 3)
                    }
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    매거진 더보기
                  </button>
                </div>
              )}

              {magazines.length === 0 && (
                <div className="text-center py-8 bg-white rounded-lg">
                  <p className="text-gray-500">매거진이 없습니다.</p>
                </div>
              )}
            </div>

            {/* 큐레이션 섹션 */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">큐레이션</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    엄선된 웨딩 정보와 팁
                  </p>
                </div>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {curations.length}개
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {curations
                  .slice(0, curationDisplayCount)
                  .map(renderCurationCard)}
              </div>

              {curations.length > curationDisplayCount && (
                <div className="text-center mt-8">
                  <button
                    onClick={() =>
                      setCurationDisplayCount(curationDisplayCount + 3)
                    }
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    큐레이션 더보기
                  </button>
                </div>
              )}

              {curations.length === 0 && (
                <div className="text-center py-8 bg-white rounded-lg">
                  <p className="text-gray-500">큐레이션이 없습니다.</p>
                </div>
              )}
            </div>

            {/* 뉴스 섹션 */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">뉴스</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    최신 웨딩 업계 소식
                  </p>
                </div>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {news.length}개
                </span>
              </div>

              {/* 카테고리 필터 버튼들 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(() => {
                  // 뉴스에서 유니크한 카테고리 추출
                  const categories = Array.from(
                    new Set(
                      news.map(
                        (item) => item.news_category?.display_name || "기타",
                      ),
                    ),
                  ).sort();
                  const allCategories = ["전체", ...categories];

                  return allCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedNewsCategory(category);
                        setNewsDisplayCount(6); // 카테고리 변경시 표시 개수 초기화
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedNewsCategory === category
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                      {category !== "전체" && (
                        <span className="ml-1 text-xs opacity-80">
                          (
                          {
                            news.filter(
                              (item) =>
                                (item.news_category?.display_name || "기타") ===
                                category,
                            ).length
                          }
                          )
                        </span>
                      )}
                    </button>
                  ));
                })()}
              </div>

              {/* 필터링된 뉴스 표시 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(() => {
                  const filteredNews =
                    selectedNewsCategory === "전체"
                      ? news
                      : news.filter(
                          (item) =>
                            (item.news_category?.display_name || "기타") ===
                            selectedNewsCategory,
                        );

                  return filteredNews
                    .slice(0, newsDisplayCount)
                    .map(renderNewsCard);
                })()}
              </div>

              {/* 더보기 버튼 */}
              {(() => {
                const filteredNews =
                  selectedNewsCategory === "전체"
                    ? news
                    : news.filter(
                        (item) =>
                          (item.news_category?.display_name || "기타") ===
                          selectedNewsCategory,
                      );

                return (
                  filteredNews.length > newsDisplayCount && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() =>
                          setNewsDisplayCount(newsDisplayCount + 4)
                        }
                        className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        뉴스 더보기
                      </button>
                    </div>
                  )
                );
              })()}

              {/* 빈 상태 */}
              {(() => {
                const filteredNews =
                  selectedNewsCategory === "전체"
                    ? news
                    : news.filter(
                        (item) =>
                          (item.news_category?.display_name || "기타") ===
                          selectedNewsCategory,
                      );

                return (
                  filteredNews.length === 0 && (
                    <div className="text-center py-8 bg-white rounded-lg">
                      <p className="text-gray-500">
                        {selectedNewsCategory === "전체"
                          ? "뉴스가 없습니다."
                          : `${selectedNewsCategory} 카테고리의 뉴스가 없습니다.`}
                      </p>
                    </div>
                  )
                );
              })()}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
