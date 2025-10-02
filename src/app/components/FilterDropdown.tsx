"use client";

import { useState, useRef, useEffect } from "react";

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
  theme?: 'wedding' | 'studio';
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onChange,
  multiple = true,
  theme = 'wedding',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = (value: string) => {
    if (multiple) {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    } else {
      onChange([value]);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return `${label} 선택`;
    }
    if (selectedValues.length === 1) {
      const selected = options.find((opt) => opt.value === selectedValues[0]);
      return selected?.label || label;
    }
    return `${label} (${selectedValues.length}개)`;
  };

  const hasSelection = selectedValues.length > 0;
  
  // Theme-based colors
  const colors = {
    wedding: {
      border: '#FB6541',
      ring: '#FB6541',
      bg: '#FB6541',
      text: '#FB6541'
    },
    studio: {
      border: 'rgb(147 51 234)', // purple-600
      ring: 'rgb(147 51 234)',
      bg: 'rgb(147 51 234)',
      text: 'rgb(147 51 234)'
    }
  };
  
  const themeColors = colors[theme];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 text-left bg-white border rounded-lg transition-all duration-200 flex items-center justify-between ${
          isOpen
            ? theme === 'wedding' 
              ? "border-[#FB6541] ring-2 ring-[#FB6541]/20"
              : "border-purple-600 ring-2 ring-purple-600/20"
            : hasSelection
            ? theme === 'wedding'
              ? "border-[#FB6541]/50 bg-[#FB6541]/5"
              : "border-purple-600/50 bg-purple-600/5"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <span className={`text-sm ${hasSelection ? "text-gray-900 font-medium" : "text-gray-500"}`}>
          {getDisplayText()}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } ${hasSelection ? (theme === 'wedding' ? "text-[#FB6541]" : "text-purple-600") : "text-gray-400"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          <div className="py-1">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {multiple ? (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle(option.value)}
                      className={`mr-3 rounded ${
                        theme === 'wedding' 
                          ? "text-[#FB6541] focus:ring-[#FB6541]"
                          : "text-purple-600 focus:ring-purple-600"
                      }`}
                    />
                  ) : (
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => handleToggle(option.value)}
                      className={`mr-3 ${
                        theme === 'wedding'
                          ? "text-[#FB6541] focus:ring-[#FB6541]"
                          : "text-purple-600 focus:ring-purple-600"
                      }`}
                    />
                  )}
                  <span className={`text-sm ${isSelected ? "font-medium text-gray-900" : "text-gray-700"}`}>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}