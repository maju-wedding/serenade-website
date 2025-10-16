"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface KakaoMapProps {
  address: string;
  name: string;
  className?: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export function KakaoMap({ address, name, className = "" }: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!mapLoaded || !mapContainer.current) return;

    const initializeMap = () => {
      const { kakao } = window;
      
      if (!kakao || !kakao.maps) {
        setErrorMessage("카카오맵을 불러올 수 없습니다.");
        return;
      }

      // 지도 옵션 설정
      const mapOption = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심좌표 (서울시청)
        level: 3 // 지도 확대 레벨
      };

      // 지도 생성
      const map = new kakao.maps.Map(mapContainer.current, mapOption);

      // 주소로 좌표 검색
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 마커 생성
          const marker = new kakao.maps.Marker({
            position: coords,
            map: map
          });

          // 인포윈도우 생성
          const infowindow = new kakao.maps.InfoWindow({
            content: `
              <div style="padding: 10px; min-width: 200px;">
                <h4 style="margin: 0 0 5px 0; font-size: 14px; font-weight: bold;">${name}</h4>
                <p style="margin: 0; font-size: 12px; color: #666;">${address}</p>
              </div>
            `
          });

          // 마커에 마우스오버 이벤트 등록
          kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트 등록
          kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
          });

          // 지도 중심을 마커 위치로 이동
          map.setCenter(coords);

          // 지도 컨트롤 추가
          const mapTypeControl = new kakao.maps.MapTypeControl();
          const zoomControl = new kakao.maps.ZoomControl();
          map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        } else {
          setErrorMessage("주소를 찾을 수 없습니다.");
        }
      });
    };

    // 카카오맵 API가 로드된 후 지도 초기화
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      initializeMap();
    } else {
      // API가 아직 로드되지 않았다면 잠시 대기 후 재시도
      const timer = setTimeout(() => {
        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
          initializeMap();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mapLoaded, address, name]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          window.kakao.maps.load(() => {
            setMapLoaded(true);
          });
        }}
        onError={() => {
          setErrorMessage("카카오맵 스크립트를 불러오는데 실패했습니다.");
        }}
      />
      
      <div className={`${className} relative`}>
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
        
        {errorMessage && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-gray-500 text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* 카카오맵 길찾기 버튼 */}
        <div className="absolute bottom-4 right-4 z-10">
          <a
            href={`https://map.kakao.com/link/to/${name},${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-[#FB6541] group"
          >
            <svg
              className="w-4 h-4 text-gray-600 group-hover:text-[#FB6541] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#FB6541] transition-colors">
              길찾기
            </span>
          </a>
        </div>
      </div>
    </>
  );
}